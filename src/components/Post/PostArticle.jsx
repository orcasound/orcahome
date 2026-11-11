import { Container } from '@mui/material'

import { ARTICLE_MAX_WIDTH } from './PostBody'

// The article frame for blog posts and project pages: ~700px text column,
// and flow-root so floated body images stay inside the article.
const PostArticle = ({ children }) => (
  <Container
    component="article"
    maxWidth={false}
    sx={{
      py: { xs: 5, md: 8 },
      display: 'flow-root',
      maxWidth: ARTICLE_MAX_WIDTH,
    }}
  >
    {children}
  </Container>
)

export default PostArticle
