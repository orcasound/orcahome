import { Avatar, Box, Stack, Typography } from '@mui/material'

import { formatDate } from './PostBody'

// Read-only archive of the WordPress comment threads (#428), shared by blog
// posts and project pages. `source` names where they came from ("blog",
// "website"). New comments aren't accepted.
const ArchivedComments = ({ comments, source = 'blog' }) => {
  if (!Array.isArray(comments) || comments.length === 0) return null
  return (
    <Box
      component="section"
      sx={{
        clear: 'both',
        mt: 8,
        pt: 4,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="h5" component="h2">
        Comments
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Archived from the original {source}. New comments aren&apos;t accepted
        here.
      </Typography>
      <Stack spacing={3}>
        {comments.map((comment, index) => {
          const depth = Math.max(1, comment.depth || 1)
          return (
            // Indent with padding on a wrapper: the parent Stack resets
            // its children's margins, so `ml` here would be ignored.
            <Box
              key={index}
              sx={{
                pl: { xs: depth > 1 ? 2 : 0, sm: (depth - 1) * 4 },
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                sx={{
                  ...(depth > 1 && {
                    pl: 2,
                    borderLeft: '2px solid',
                    borderColor: 'divider',
                  }),
                }}
              >
                <Avatar
                  src={comment.avatar || undefined}
                  alt={comment.author}
                  sx={{ width: 40, height: 40, mt: 0.5 }}
                >
                  {(comment.author || '?').charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="baseline"
                    flexWrap="wrap"
                  >
                    <Typography variant="subtitle2" fontWeight={600}>
                      {comment.author}
                    </Typography>
                    {comment.date && (
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(comment.date)}
                      </Typography>
                    )}
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: 0.5,
                      whiteSpace: 'pre-wrap',
                      // Old comments contain long bare URLs; let them wrap
                      // instead of widening the page on phones.
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {comment.body}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          )
        })}
      </Stack>
    </Box>
  )
}

export default ArchivedComments
