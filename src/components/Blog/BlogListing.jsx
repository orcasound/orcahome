import {
  Box,
  Button,
  Container,
  MenuItem,
  Pagination,
  PaginationItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'

import { toSlug } from '../../utils/taxonomySlug'
import ContentCard from '../Post/ContentCard'
import { formatByline, HIDDEN_TAGS, MIN_TAG_COUNT } from './blogFormat'

const POSTS_PER_PAGE = 9

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const formatDate = (value) => {
  if (!value) return ''
  const d = new Date(value)
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
}

// Build the filter options from the full post list: frequently-used tags,
// authors (most posts first), and the years that actually have posts (newest
// first).
function useFilterOptions(posts) {
  return useMemo(() => {
    const tagCounts = new Map()
    const authorCounts = new Map()
    const years = new Set()
    for (const post of posts) {
      if (post.publishedAt) {
        const y = new Date(post.publishedAt).getUTCFullYear()
        if (!Number.isNaN(y)) years.add(y)
      }
      if (Array.isArray(post.tags)) {
        for (const tag of post.tags) {
          tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
        }
      }
      if (Array.isArray(post.authors)) {
        for (const name of post.authors) {
          if (name) authorCounts.set(name, (authorCounts.get(name) || 0) + 1)
        }
      }
    }
    const tags = [...tagCounts.entries()]
      .filter(([tag, n]) => n >= MIN_TAG_COUNT && !HIDDEN_TAGS.has(tag))
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag]) => tag)
    const authors = [...authorCounts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name]) => name)
    return { tags, authors, years: [...years].sort((a, b) => b - a) }
  }, [posts])
}

// Shared blog listing: filters (tag / author / year / month) + post grid +
// numbered pagination. A tag has its own page, /blog/tag/[slug], which passes
// `fixedTag`; that page is built already filtered, so a link to it shows the
// right posts straight away. Author / year / month / page live in the URL query
// (?author=&year=&month=&page=) and are applied client-side. Final visual design
// is pending UX (#397).
export default function BlogListing({ posts, fixedTag = '' }) {
  const router = useRouter()
  const {
    tags: tagOptions,
    authors: authorOptions,
    years: yearOptions,
  } = useFilterOptions(posts)

  // The tag comes from the page (/blog/tag/[slug]); the rest from the URL.
  const tag = fixedTag
  const basePath = tag ? `/blog/tag/${toSlug(tag)}` : '/blog'
  const author =
    typeof router.query.author === 'string' ? router.query.author : ''
  const year = typeof router.query.year === 'string' ? router.query.year : ''
  const month = typeof router.query.month === 'string' ? router.query.month : ''
  const page = Math.max(1, Number.parseInt(router.query.page, 10) || 1)

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      if (tag && !(post.tags || []).includes(tag)) return false
      if (author && !(post.authors || []).includes(author)) return false
      if (year || month) {
        if (!post.publishedAt) return false
        const d = new Date(post.publishedAt)
        if (year && String(d.getUTCFullYear()) !== year) return false
        if (month && String(d.getUTCMonth() + 1) !== month) return false
      }
      return true
    })
  }, [posts, tag, author, year, month])

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const pagePosts = filtered.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE
  )

  const hasFilters = Boolean(tag || author || year || month)

  // The URL query without the route param (`slug` on a tag page) or the old
  // ?tag= filter, which now has its own page.
  const filterQuery = () => {
    const next = { ...router.query }
    delete next.slug
    delete next.tag
    return next
  }

  // Update the URL query, resetting to page 1 whenever a filter changes.
  const setQuery = (patch) => {
    const next = { ...filterQuery(), ...patch }
    delete next.page
    Object.keys(next).forEach((k) => {
      if (next[k] === '' || next[k] == null) delete next[k]
    })
    router.push({ pathname: basePath, query: next }, undefined, {
      shallow: true,
      scroll: false,
    })
  }

  // Picking a topic opens that tag's page, keeping the other filters.
  const setTag = (value) => {
    const next = filterQuery()
    delete next.page
    router.push(
      {
        pathname: value ? `/blog/tag/${toSlug(value)}` : '/blog',
        query: next,
      },
      undefined,
      { scroll: false }
    )
  }

  const clearFilters = () => router.push('/blog', undefined, { scroll: false })

  // Old links used /blog?tag=Name; send them to the tag's own page.
  const legacyTag =
    !fixedTag && typeof router.query.tag === 'string' ? router.query.tag : ''
  useEffect(() => {
    if (!legacyTag) return
    const next = { ...router.query }
    delete next.tag
    router.replace({
      pathname: `/blog/tag/${toSlug(legacyTag)}`,
      query: next,
    })
  }, [legacyTag, router])

  return (
    <>
      <Head>
        <title>
          {`${tag || 'Blog'}${
            safePage > 1 ? ` (page ${safePage})` : ''
          } | Orcasound${tag ? ' Blog' : ''}`}
        </title>
        <meta
          name="description"
          content="News, updates, and stories from the Orcasound community."
        />
      </Head>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {tag || 'Blog'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {tag
            ? `Blog posts tagged “${tag}”.`
            : 'News, updates, and stories from the Orcasound community.'}
        </Typography>

        {/* Filters: topic (tag) / author / year / month */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ mb: 4 }}
          alignItems={{ sm: 'center' }}
          flexWrap="wrap"
          useFlexGap
        >
          <TextField
            select
            size="small"
            label="Topic"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">All topics</MenuItem>
            {/* A tag reached from a post's chip may be below MIN_TAG_COUNT;
                list it too so the dropdown shows what is being filtered. */}
            {(tag && !tagOptions.includes(tag)
              ? [tag, ...tagOptions]
              : tagOptions
            ).map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            size="small"
            label="Author"
            value={author}
            onChange={(e) => setQuery({ author: e.target.value })}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">All authors</MenuItem>
            {authorOptions.map((a) => (
              <MenuItem key={a} value={a}>
                {a}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            size="small"
            label="Year"
            value={year}
            onChange={(e) => setQuery({ year: e.target.value })}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="">All years</MenuItem>
            {yearOptions.map((y) => (
              <MenuItem key={y} value={String(y)}>
                {y}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            size="small"
            label="Month"
            value={month}
            onChange={(e) => setQuery({ month: e.target.value })}
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="">All months</MenuItem>
            {MONTHS.map((m, i) => (
              <MenuItem key={m} value={String(i + 1)}>
                {m}
              </MenuItem>
            ))}
          </TextField>

          {hasFilters && (
            <Button onClick={clearFilters} size="small">
              Clear filters
            </Button>
          )}
        </Stack>

        {filtered.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            {hasFilters
              ? 'No posts match these filters.'
              : 'No posts yet. Check back soon.'}
          </Typography>
        ) : (
          <>
            <Box
              sx={{
                display: 'grid',
                gap: 4,
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
              }}
            >
              {pagePosts.map((post) => (
                <ContentCard
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  imageUrl={post.featuredImageUrl}
                  imageAlt={post.featuredImageAlt}
                  meta={[
                    formatDate(post.publishedAt),
                    formatByline(post.authors) &&
                      `By ${formatByline(post.authors)}`,
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                  title={post.title}
                  excerpt={post.excerpt}
                  chips={(post.tags || []).filter((t) => !HIDDEN_TAGS.has(t))}
                />
              ))}
            </Box>

            {totalPages > 1 && (
              <Stack alignItems="center" sx={{ mt: 6 }}>
                <Pagination
                  count={totalPages}
                  page={safePage}
                  color="primary"
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      href={{
                        pathname: basePath,
                        query:
                          item.page === 1
                            ? { ...filterQuery(), page: undefined }
                            : { ...filterQuery(), page: item.page },
                      }}
                      scroll={false}
                      {...item}
                    />
                  )}
                />
              </Stack>
            )}
          </>
        )}
      </Container>
    </>
  )
}
