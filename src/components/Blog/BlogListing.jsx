import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
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
import { useMemo } from 'react'

const POSTS_PER_PAGE = 9

// A tag needs at least this many posts to appear in the filter dropdown. The
// migrated posts carry ~120 tags with a long tail of one-offs (#410); only the
// frequently-used ones make useful filters.
const MIN_TAG_COUNT = 5

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

// Build the filter options from the full post list: frequently-used tags, and
// the years that actually have posts (newest first).
function useFilterOptions(posts) {
  return useMemo(() => {
    const tagCounts = new Map()
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
    }
    const tags = [...tagCounts.entries()]
      .filter(([, n]) => n >= MIN_TAG_COUNT)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag]) => tag)
    return { tags, years: [...years].sort((a, b) => b - a) }
  }, [posts])
}

// Shared blog listing: filters (tag / year / month) + post grid + numbered
// pagination. Filtering and paging happen client-side against the full post
// list and are reflected in the URL (?tag=&year=&month=&page=), so results are
// shareable and survive refresh. Final visual design is pending UX (#397).
export default function BlogListing({ posts }) {
  const router = useRouter()
  const { tags: tagOptions, years: yearOptions } = useFilterOptions(posts)

  // Read current filters from the URL.
  const tag = typeof router.query.tag === 'string' ? router.query.tag : ''
  const year = typeof router.query.year === 'string' ? router.query.year : ''
  const month = typeof router.query.month === 'string' ? router.query.month : ''
  const page = Math.max(1, Number.parseInt(router.query.page, 10) || 1)

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      if (tag && !(post.tags || []).includes(tag)) return false
      if (year || month) {
        if (!post.publishedAt) return false
        const d = new Date(post.publishedAt)
        if (year && String(d.getUTCFullYear()) !== year) return false
        if (month && String(d.getUTCMonth() + 1) !== month) return false
      }
      return true
    })
  }, [posts, tag, year, month])

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const pagePosts = filtered.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE
  )

  const hasFilters = Boolean(tag || year || month)

  // Update the URL query, resetting to page 1 whenever a filter changes.
  const setQuery = (patch) => {
    const next = { ...router.query, ...patch }
    delete next.page
    Object.keys(next).forEach((k) => {
      if (next[k] === '' || next[k] == null) delete next[k]
    })
    router.push({ pathname: '/blog', query: next }, undefined, {
      shallow: true,
      scroll: false,
    })
  }

  const clearFilters = () =>
    router.push('/blog', undefined, { shallow: true, scroll: false })

  return (
    <>
      <Head>
        <title>
          {safePage > 1
            ? `Blog (page ${safePage}) | Orcasound`
            : 'Blog | Orcasound'}
        </title>
        <meta
          name="description"
          content="News, updates, and stories from the Orcasound community."
        />
      </Head>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Blog
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          News, updates, and stories from the Orcasound community.
        </Typography>

        {/* Filters: topic (tag) / year / month */}
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
            onChange={(e) => setQuery({ tag: e.target.value })}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">All topics</MenuItem>
            {tagOptions.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
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
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'box-shadow 0.2s',
                      '&:hover': { boxShadow: 6 },
                    }}
                  >
                    {post.featuredImageUrl && (
                      <CardMedia
                        component="img"
                        image={post.featuredImageUrl}
                        alt={post.featuredImageAlt || post.title || ''}
                        sx={{ aspectRatio: '16 / 9', objectFit: 'cover' }}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        gutterBottom
                      >
                        {formatDate(post.publishedAt)}
                      </Typography>
                      <Typography variant="h6" component="h2" gutterBottom>
                        {post.title}
                      </Typography>
                      {post.excerpt && (
                        <Typography variant="body2" color="text.secondary">
                          {post.excerpt}
                        </Typography>
                      )}
                      {Array.isArray(post.tags) && post.tags.length > 0 && (
                        <Stack
                          direction="row"
                          spacing={1}
                          useFlexGap
                          flexWrap="wrap"
                          sx={{ mt: 2 }}
                        >
                          {post.tags.map((t) => (
                            <Chip key={t} label={t} size="small" />
                          ))}
                        </Stack>
                      )}
                    </CardContent>
                  </Card>
                </Link>
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
                        pathname: '/blog',
                        query:
                          item.page === 1
                            ? { ...router.query, page: undefined }
                            : { ...router.query, page: item.page },
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
