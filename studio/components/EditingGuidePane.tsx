import {Box, Card, Heading, Stack, Text} from '@sanity/ui'

/**
 * A small help pane shown from the "📖 Start here" item at the top of the
 * Studio content list. Sidebar list items can't be plain external links, so
 * this renders a one-line intro plus a link that opens the editor-facing guide
 * (the Google Doc) in a new tab.
 */
const GUIDE_URL =
  'https://docs.google.com/document/d/1ESex1obpVYf7skclCcjbJx8g0W4ruv6TG77c7yXCONU/edit'

export function EditingGuidePane() {
  return (
    <Box padding={4}>
      <Card padding={4} radius={3} shadow={1}>
        <Stack space={4}>
          <Heading size={2}>📖 Start here</Heading>
          <Text size={2}>
            New to editing the site? This Studio is where you change page content
            and write blog posts. Nothing goes live until you click Publish.
          </Text>
          <Text size={2}>
            <a href={GUIDE_URL} target="_blank" rel="noreferrer">
              Open the editing guide ↗
            </a>
          </Text>
          <Text size={1} muted>
            Each page also has a guide link at the top of its own form.
          </Text>
        </Stack>
      </Card>
    </Box>
  )
}
