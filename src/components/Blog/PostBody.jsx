import { Box, Link as MuiLink, Typography } from '@mui/material'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'

import { pushToDataLayer } from '../../utils/gtm'
import DataTable from './DataTable'

// Portable Text body renderer for migrated WordPress content, shared by blog
// posts (/blog/<slug>) and project pages (/projects/<slug>): headings, lists,
// links, tables, images (with position/size/caption), and media links rendered
// as players / embeds. Both pages use ARTICLE_MAX_WIDTH for their column.

// Width of the article column: ARTICLE_MAX_WIDTH minus the Container padding.
// ~700px keeps lines near 75 characters, a comfortable reading measure.
export const ARTICLE_MAX_WIDTH = 748
const CONTENT_WIDTH = 700
// srcset candidates (1x/2x of phone and desktop column widths).
const IMAGE_WIDTHS = [450, 900, 1350, 1800]
const sanityImageUrl = (url, width) => `${url}?w=${width}&fit=max&auto=format`

export const formatDate = (value) => {
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

// Migrated posts reference media as a link to the file/embed URL. Render those
// as visible players (#428): audio -> <audio>, self-hosted video -> <video>,
// YouTube/Vimeo -> an <iframe>. mp3 + ogg of one clip share one <audio>.
const mediaOf = (value) => {
  const hrefs = [
    ...new Set(
      (value?.markDefs || [])
        .filter((d) => d._type === 'link' && d.href)
        .map((d) => d.href)
    ),
  ]
  return {
    audio: hrefs.filter((h) => /\.(mp3|wav|ogg|m4a)$/i.test(h)),
    video: hrefs.filter((h) => /\.(mp4|webm|mov|m4v)$/i.test(h)),
    embeds: hrefs.filter((h) =>
      /(?:youtube(?:-nocookie)?\.com|youtu\.be|vimeo\.com|media\.king5\.com)/i.test(
        h
      )
    ),
  }
}

const hasMedia = (m) => m.audio.length + m.video.length + m.embeds.length > 0

// Plain text of a Portable Text block (the timestamp + `node=.. dB=.. trigger=`
// caption line for detection clips).
const blockText = (b) =>
  (b?.children || [])
    .map((c) => c.text || '')
    .join('')
    .trim()

const isEmptyBlock = (b) =>
  b?._type === 'block' && !blockText(b) && !hasMedia(mediaOf(b))

// A caption paragraph is a text block that carries a media (mp3) link.
const isCaption = (b) => b?._type === 'block' && hasMedia(mediaOf(b))

// A stray metadata fragment: flattening sometimes split `node=.. dB=.. trigger=`
// off its timestamp into its own linkless block. Fold these back into the
// preceding caption instead of letting them break the grid.
const isMeta = (b) =>
  b?._type === 'block' &&
  !isCaption(b) &&
  /node=.*dB=.*trigger=/i.test(blockText(b))

// A migrated detection thumbnail: a small inline image (the 256x170 spectrograms
// the old WordPress table paired with each clip). Full-size content images are
// left to render normally.
const isThumb = (b) => b?._type === 'image' && (b.width || 9999) <= 320

// The original WordPress posts laid these clips out in a 2-column table that
// htmlToBlocks flattened into a linear image/caption sequence. Re-group each
// (thumbnail + caption) into a card, and batch consecutive cards so they can
// render as a grid; everything else stays normal Portable Text.
const isRegionBlock = (b) =>
  isThumb(b) || isCaption(b) || isMeta(b) || isEmptyBlock(b)

function groupBody(blocks) {
  const chunks = []
  let i = 0
  while (i < blocks.length) {
    if (isThumb(blocks[i])) {
      // Consume a maximal run of thumbnails / captions / metadata / blanks, then
      // zip the images and captions by order. Zipping (rather than adjacency
      // pairing) survives the drift where flattening reordered blocks. Stray
      // metadata fragments are folded into the caption they follow.
      let start = i
      while (i < blocks.length && isRegionBlock(blocks[i])) i++
      // Some posts put each caption *before* its thumbnail, so the first
      // caption sits just ahead of the run. Pull it in when the run is one
      // caption short, otherwise every card is paired off by one.
      const countIn = (from) => {
        const r = blocks.slice(from, i)
        return [r.filter(isThumb).length, r.filter(isCaption).length]
      }
      const [imgs, caps] = countIn(start)
      if (caps === imgs - 1 && isCaption(blocks[start - 1])) {
        const prev = chunks[chunks.length - 1]
        if (
          prev?.type === 'normal' &&
          prev.blocks.at(-1) === blocks[start - 1]
        ) {
          prev.blocks = prev.blocks.slice(0, -1)
          if (!prev.blocks.length) chunks.pop()
          start -= 1
        }
      }
      const region = blocks.slice(start, i)
      // Small images with no clip captions are ordinary photos, not a
      // detection table — leave them as normal Portable Text.
      if (!region.some(isCaption)) {
        chunks.push({ type: 'normal', blocks: region })
        continue
      }
      const images = region.filter(isThumb)
      const captions = []
      for (const b of region) {
        if (isCaption(b)) {
          captions.push({ block: b, text: blockText(b) })
        } else if (
          isMeta(b) &&
          captions.length &&
          !/node=/i.test(captions[captions.length - 1].text)
        ) {
          const last = captions[captions.length - 1]
          last.text = [last.text, blockText(b)].filter(Boolean).join('\n')
        }
      }
      const cards = []
      for (let k = 0; k < Math.max(images.length, captions.length); k++) {
        cards.push({ image: images[k] || null, caption: captions[k] || null })
      }
      chunks.push({ type: 'grid', cards })
    } else {
      const start = i
      while (i < blocks.length && !isThumb(blocks[i])) i++
      chunks.push({ type: 'normal', blocks: blocks.slice(start, i) })
    }
  }
  return chunks
}

// Normalize a YouTube/Vimeo URL to its embeddable iframe form.
const embedSrc = (href) => {
  try {
    const u = new URL(href)
    const host = u.hostname.replace(/^www\./, '')
    if (host === 'youtu.be')
      return `https://www.youtube.com/embed/${
        u.pathname.split('/').filter(Boolean)[0]
      }`
    if (host.includes('youtube')) {
      const id =
        u.pathname.match(/\/embed\/([\w-]+)/)?.[1] || u.searchParams.get('v')
      const start = u.searchParams.get('start')
      return id
        ? `https://www.youtube.com/embed/${id}${start ? `?start=${start}` : ''}`
        : href
    }
    if (host.includes('vimeo'))
      return `https://player.vimeo.com/video/${u.pathname
        .split('/')
        .filter(Boolean)
        .pop()}`
  } catch {
    /* fall through to the raw href */
  }
  return href
}

const MediaPlayers = ({ media }) => (
  <>
    {media.audio.length > 0 && (
      <Box
        component="audio"
        controls
        preload="none"
        sx={{ display: 'block', width: '100%', my: 1 }}
      >
        {media.audio.map((u) => (
          <source key={u} src={u} />
        ))}
      </Box>
    )}
    {media.video.map((u) => (
      <Box
        key={u}
        component="video"
        controls
        src={u}
        sx={{
          display: 'block',
          width: '100%',
          maxWidth: 640,
          mx: 'auto',
          my: 1,
          borderRadius: 1,
        }}
      />
    ))}
    {media.embeds.map((u) => (
      <Box key={u} sx={{ maxWidth: 640, mx: 'auto', my: 2 }}>
        {/* 16:9 responsive frame, capped so it doesn't dominate the article. */}
        <Box sx={{ position: 'relative', width: '100%', pt: '56.25%' }}>
          <Box
            component="iframe"
            src={embedSrc(u)}
            title="Embedded video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 0,
              borderRadius: 1,
            }}
          />
        </Box>
      </Box>
    ))}
  </>
)

// Image position/size from Studio. Left/right images float so the following
// paragraphs wrap beside them (like WordPress "align left/right"); below the
// `sm` breakpoint they sit on their own line, centred.
// Sizes are a share of the text column, so they look the same at any width.
const IMAGE_SIZES = { small: '40%', medium: '50%', large: '66%' }
// Tall, narrow images would get very tall at a column share, so floated
// images also stop at this height (their width shrinks to keep the shape).
const FLOAT_MAX_HEIGHT = 420
// Large images never float: the text beside them would be too narrow to read.
const isFloated = (alignment, size) =>
  (alignment === 'left' || alignment === 'right') &&
  Boolean(IMAGE_SIZES[size]) &&
  size !== 'large'
const imageLayoutSx = (alignment, size) => {
  const share = IMAGE_SIZES[size]
  if (!share) return { my: 4 }
  if (isFloated(alignment, size)) {
    // The box shrinks to the image, up to the size's share of the column.
    return {
      width: { xs: '100%', sm: 'auto' },
      maxWidth: { xs: 360, sm: share },
      mx: { xs: 'auto' },
      my: 3,
      float: { sm: alignment },
      mt: { sm: 0.5 },
      mb: { sm: 2 },
      ...(alignment === 'left'
        ? { mr: { sm: 3 }, ml: { sm: 0 } }
        : { ml: { sm: 3 }, mr: { sm: 0 } }),
    }
  }
  return {
    width: { xs: '100%', sm: share },
    maxWidth: { xs: 360, sm: 'none' },
    mx: alignment === 'none' ? 0 : 'auto',
    my: 3,
  }
}

// Render Portable Text with the site's typography, matching the other Sanity
// pages. Supports headings, lists, links, inline images, and audio.
const portableComponents = {
  block: {
    normal: ({ children, value }) => {
      const media = mediaOf(value)
      if (!hasMedia(media)) {
        return (
          <Typography variant="body1" paragraph>
            {children}
          </Typography>
        )
      }
      // A paragraph that is just a bare media URL shows only the player; one
      // that references the clip inline in a sentence keeps the sentence.
      const text = (value.children || [])
        .map((c) => c.text || '')
        .join('')
        .trim()
      const bareOnly = [
        ...media.audio,
        ...media.video,
        ...media.embeds,
      ].includes(text)
      return (
        <Box sx={{ my: 2 }}>
          {!bareOnly && (
            <Typography variant="body1" sx={{ mb: 1 }}>
              {children}
            </Typography>
          )}
          <MediaPlayers media={media} />
        </Box>
      )
    },
    h2: ({ children }) => (
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 5, mb: 2, clear: 'both' }}
      >
        {children}
      </Typography>
    ),
    h3: ({ children }) => (
      <Typography
        variant="h5"
        component="h3"
        sx={{ mt: 4, mb: 2, clear: 'both' }}
      >
        {children}
      </Typography>
    ),
    blockquote: ({ children }) => (
      <Box
        component="blockquote"
        sx={{
          borderLeft: '4px solid',
          borderColor: 'primary.main',
          pl: 2,
          my: 3,
          color: 'text.secondary',
          fontStyle: 'italic',
        }}
      >
        {children}
      </Box>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        {children}
      </Box>
    ),
    number: ({ children }) => (
      <Box component="ol" sx={{ pl: 3, mb: 2 }}>
        {children}
      </Box>
    ),
  },
  listItem: {
    bullet: ({ children, value }) => {
      const media = mediaOf(value)
      return (
        <Typography component="li" variant="body1">
          {children}
          {hasMedia(media) && <MediaPlayers media={media} />}
        </Typography>
      )
    },
    number: ({ children, value }) => {
      const media = mediaOf(value)
      return (
        <Typography component="li" variant="body1">
          {children}
          {hasMedia(media) && <MediaPlayers media={media} />}
        </Typography>
      )
    },
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || '#'
      const external = /^https?:\/\//.test(href)
      return (
        <MuiLink
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {children}
        </MuiLink>
      )
    },
  },
  types: {
    dataTable: DataTable,
    image: ({ value }) => {
      if (!value?.url) return null
      // Use the asset's real dimensions and never upscale past them, so small
      // migrated thumbnails (e.g. 256x170 spectrograms) stay crisp instead of
      // being stretched to the full content column.
      const w = value.width || 1200
      const h = value.height || 800
      // The Sanity CDN serves the original file as-is unless asked to resize,
      // and migrated originals can be 10MB+ PNGs (#449). Request only the widths
      // the column needs, re-encoded to WebP/AVIF; `fit=max` never upscales.
      // (next/image can't build a srcset here: `images.unoptimized` is global.)
      const widths = [...IMAGE_WIDTHS.filter((x) => x < w), w]
      const floated = isFloated(value.alignment, value.size)
      const img = (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={sanityImageUrl(value.url, Math.min(w, CONTENT_WIDTH))}
          srcSet={widths
            .map((x) => `${sanityImageUrl(value.url, x)} ${x}w`)
            .join(', ')}
          sizes={`(max-width: ${CONTENT_WIDTH}px) 100vw, ${Math.min(
            w,
            CONTENT_WIDTH
          )}px`}
          alt={value.alt || ''}
          width={w}
          height={h}
          loading="lazy"
          decoding="async"
          style={
            floated
              ? {
                  display: 'block',
                  width: 'auto',
                  maxWidth: '100%',
                  maxHeight: FLOAT_MAX_HEIGHT,
                  height: 'auto',
                  margin: '0 auto',
                  borderRadius: 8,
                }
              : {
                  display: 'block',
                  width: '100%',
                  maxWidth: w,
                  height: 'auto',
                  // Only images set to Center are centred; others stay left.
                  margin: value.alignment === 'center' ? '0 auto' : 0,
                  borderRadius: 8,
                }
          }
        />
      )
      // Images wider than a phone screen get scaled down somewhere; clicking
      // opens the full-size original in a new tab, as on the old WordPress blog.
      // Small images are always shown at full size, so they aren't linked.
      return (
        <>
          {/* A floated image and the text after it start below any earlier
              floated image, so each image + its text reads as one group. */}
          {floated && <Box sx={{ clear: 'both' }} />}
          <Box
            component="figure"
            sx={{ m: 0, ...imageLayoutSx(value.alignment, value.size) }}
          >
            {w > IMAGE_WIDTHS[0] ? (
              <MuiLink
                href={value.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open full-size image${
                  value.alt ? `: ${value.alt}` : ''
                }`}
                onClick={() =>
                  pushToDataLayer('blog_image_open', { image_url: value.url })
                }
                sx={{ display: 'block', cursor: 'zoom-in' }}
              >
                {img}
              </MuiLink>
            ) : (
              img
            )}
            {value.caption && (
              <Typography
                component="figcaption"
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 1,
                  textAlign: value.alignment === 'center' ? 'center' : 'left',
                }}
              >
                {value.caption}
              </Typography>
            )}
          </Box>
        </>
      )
    },
  },
}

// One detection clip: the spectrogram thumbnail, its caption line, and the
// audio player, boxed as a card. Thumbnails keep their native size so they stay
// crisp; the audio is lazy (preload="none") so a grid of hundreds costs no
// requests until a clip is actually played.
const DetectionCard = ({ image, caption }) => {
  const media = caption?.block
    ? mediaOf(caption.block)
    : { audio: [], video: [], embeds: [] }
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        p: 1.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      {image?.url && (
        <Image
          src={image.url}
          alt={image.alt || ''}
          width={image.width || 256}
          height={image.height || 170}
          loading="lazy"
          style={{
            width: '100%',
            maxWidth: image.width || 256,
            height: 'auto',
            borderRadius: 4,
          }}
        />
      )}
      {caption && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ whiteSpace: 'pre-line' }}
        >
          {caption.text}
        </Typography>
      )}
      {hasMedia(media) && <MediaPlayers media={media} />}
    </Box>
  )
}

// Render the post body, laying runs of detection clips out as a responsive grid
// (2-up on desktop, 1-up on narrow screens) and everything else as normal
// Portable Text.
const PostBody = ({ blocks }) => (
  <>
    {groupBody(blocks).map((chunk, idx) =>
      chunk.type === 'grid' ? (
        <Box
          key={idx}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 2,
            my: 3,
          }}
        >
          {chunk.cards.map((card, i) => (
            <DetectionCard key={i} {...card} />
          ))}
        </Box>
      ) : (
        <PortableText
          key={idx}
          value={chunk.blocks}
          components={portableComponents}
        />
      )
    )}
  </>
)

export default PostBody
