import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'

import { AUDIO_BASE_URL } from '../../data/hydrophoneArchives'
import Link from '../Link'
import ArchiveAudio from './ArchiveAudio'

// A paragraph is a list of plain strings and { text, href } links.
const Paragraph = ({ parts }) => (
  <Typography variant="body1" paragraph>
    {parts.map((part, index) =>
      typeof part === 'string' ? (
        part
      ) : (
        <Link key={index} href={part.href}>
          {part.text}
        </Link>
      )
    )}
  </Typography>
)

// One of the old orcasound.net hydrophone pages (/lk, /nb): the site photo
// and history, the highlighted recordings, and every archived recording in a
// collapsed list (the old page's Flash playlist).
export default function HydrophoneArchivePage({ id, archive }) {
  const section = `hydrophone_archive_${id}`

  return (
    <>
      <Head>
        <title>{`${archive.title} | Orcasound`}</title>
        <meta name="description" content={archive.description} />
      </Head>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {archive.title}
        </Typography>

        <Box
          sx={{
            float: { sm: 'right' },
            width: { xs: '100%', sm: 350 },
            ml: { sm: 3 },
            mb: 2,
          }}
        >
          <Image
            src={archive.image}
            alt={archive.imageAlt}
            width={archive.imageWidth}
            height={archive.imageHeight}
            style={{ display: 'block', width: '100%', height: 'auto' }}
            priority
          />
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontStyle: 'italic', mb: 2 }}
        >
          The live stream from this hydrophone has ended; the recordings below
          still play. To listen live today, visit{' '}
          <Link href="https://live.orcasound.net">live.orcasound.net</Link>.
        </Typography>

        {archive.paragraphs.map((parts, index) => (
          <Paragraph key={index} parts={parts} />
        ))}

        <Box sx={{ clear: 'both' }} />

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
          {archive.archiveHeading}
        </Typography>

        {archive.highlights.length > 0 && (
          <>
            <Typography variant="body1" paragraph>
              Exceptional recordings are described below.
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mb: 4 }}>
              {archive.highlights.map((highlight) => (
                <Box
                  component="li"
                  key={highlight.file}
                  sx={{ py: 2, borderBottom: 1, borderColor: 'divider' }}
                >
                  <Typography variant="subtitle2" component="p" gutterBottom>
                    {highlight.date} · {highlight.time}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {highlight.description}
                  </Typography>
                  <ArchiveAudio
                    src={`${AUDIO_BASE_URL}${highlight.file}`}
                    label={highlight.file.split('/').pop()}
                    section={section}
                  />
                </Box>
              ))}
            </Box>
          </>
        )}

        <Accordion
          disableGutters
          TransitionProps={{ unmountOnExit: true }}
          sx={{ mb: 4 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" component="span">
              All archived recordings ({archive.recordings.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {archive.recordings.map((recording) => (
                <Box
                  component="li"
                  key={recording.file}
                  sx={{ py: 1.5, borderBottom: 1, borderColor: 'divider' }}
                >
                  <Typography
                    variant="body2"
                    sx={{ wordBreak: 'break-all', mb: 0.5 }}
                  >
                    {recording.file}{' '}
                    <Box component="span" sx={{ color: 'text.secondary' }}>
                      ({recording.size})
                    </Box>
                  </Typography>
                  <ArchiveAudio
                    src={`${AUDIO_BASE_URL}${archive.folder}/${recording.file}`}
                    label={recording.file}
                    section={section}
                  />
                </Box>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>

        <Typography variant="h6" component="h2" gutterBottom>
          Other links
        </Typography>
        {archive.otherLinks.map((link) => (
          <Typography key={link.href} variant="body1">
            <Link href={link.href}>{link.text}</Link>
          </Typography>
        ))}
      </Container>
    </>
  )
}
