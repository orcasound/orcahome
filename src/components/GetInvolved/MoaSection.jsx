import { Box, Button, Link, Typography } from '@mui/material'
import { PortableText } from '@portabletext/react'
import { useRef, useState } from 'react'

import { pushToDataLayer } from '../../utils/gtm'
import MoaChangeRequestForm from './MoaChangeRequestForm'
import MoaDisclosure from './MoaDisclosure'
import MoaFormDialog from './MoaFormDialog'
import MoaJoinForm from './MoaJoinForm'
import MoaMemberList from './MoaMemberList'
import { moaFocusRing, moaFocusScrollMargin } from './moaStyles'
import MoaSubmissionConfirmation from './MoaSubmissionConfirmation'
import { portableTextComponents } from './portableTextComponents'

const EMPTY_JOIN = {
  name: '',
  email: '',
  organization: '',
  is501c3: false,
  nodesAndRoles: '',
  website: '',
  agree: false,
}

const EMPTY_CHANGE = {
  name: '',
  email: '',
  memberOrganization: '',
  changeType: '',
  details: '',
}

// "Join the network" section on /getinvolved: intro, the full MOA as
// expand/collapse panels, the join CTA, the member list, and the
// change-request CTA. Form drafts live here so closing a dialog keeps them.
const MoaSection = ({ content, moa }) => {
  // Preamble (panel 0) starts open.
  const [open, setOpen] = useState(() => new Set([0]))
  const [joinOpen, setJoinOpen] = useState(false)
  const [changeOpen, setChangeOpen] = useState(false)
  const [joinValues, setJoinValues] = useState(EMPTY_JOIN)
  const [changeValues, setChangeValues] = useState(EMPTY_CHANGE)
  const [joinResult, setJoinResult] = useState(null)
  const [changeResult, setChangeResult] = useState(null)
  // Element id to focus after a dialog's close transition. Read and written
  // only in callbacks.
  const pendingFocusRef = useRef(null)

  const panels = [
    ...moa.sections,
    { heading: 'Agreement', paragraphs: [moa.agreementStatement], items: [] },
  ]

  const togglePanel = (index) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })

  // "Read the full MOA" in the join dialog: make sure the Preamble is open,
  // then focus its toggle once the dialog has closed.
  const readFullMoa = () => {
    setOpen((prev) => new Set(prev).add(0))
    pendingFocusRef.current = 'moa-toggle-0'
    setJoinOpen(false)
  }

  const openJoin = () => {
    pushToDataLayer('cta_click', {
      cta_text: 'Apply to join the network',
      section: 'moa',
      page: 'get_involved',
    })
    setJoinOpen(true)
  }

  const openChange = () => {
    pushToDataLayer('cta_click', {
      cta_text: 'Request a change to your listing',
      section: 'moa',
      page: 'get_involved',
    })
    setChangeOpen(true)
  }

  const count = moa.members.length

  // WCAG 2.2 2.4.11 fallback: WebKit does not always scroll a keyboard-focused
  // control into view (or honor scroll-margin-top), so it can land behind the
  // sticky nav. StickyNav renders <Box component="nav"> inside Layout's <main>.
  const handleFocusCapture = (e) => {
    const nav = document.querySelector('main nav')
    const top = e.target.getBoundingClientRect().top
    const bottom = nav?.getBoundingClientRect().bottom ?? 0
    if (top < bottom + 8) window.scrollBy({ top: top - bottom - 16 })
  }

  return (
    <Box
      sx={{ ...moaFocusRing, ...moaFocusScrollMargin }}
      onFocusCapture={handleFocusCapture}
    >
      <Box sx={{ mb: 6, lineHeight: '28px' }}>
        <Typography
          variant="subtitle1"
          component="h5"
          fontSize={{ xs: '28px', sm: '36px', md: '44px' }}
          align="left"
          fontWeight="600"
          mb="40px"
          sx={(theme) => ({
            [theme.breakpoints.down('sm')]: {
              mx: 'auto',
              fontSize: 'x-large',
            },
          })}
        >
          {content.moaHeading}
        </Typography>
        {content.moaBody ? (
          <PortableText
            value={content.moaBody}
            components={portableTextComponents}
          />
        ) : (
          <>
            <Typography
              variant="p"
              fontSize="20px"
              paragraph={true}
              align="left"
            >
              The real-time audio streams, citizen science projects, educational
              materials, and outreach projects of Orcasound are brought to you
              by the current network members, listed below, who have e-signed
              the{' '}
              <Link
                color="#1B2B7B"
                href="https://docs.google.com/document/d/1OdKOICgPNHy7CkaHjzWMztH_zNir4UlbZbOdKtyRwI0/edit?usp=sharing"
                onClick={() =>
                  pushToDataLayer('external_link_click', {
                    link_text: '2016-2020 Memorandum of Agreements (MOA)',
                    destination:
                      'https://docs.google.com/document/d/1OdKOICgPNHy7CkaHjzWMztH_zNir4UlbZbOdKtyRwI0/edit?usp=sharing',
                  })
                }
              >
                2021-2025 Memorandum of Agreement (MOA)
              </Link>
              . Any organization or individual is welcome to join the network
              (for free!), either as the host of a hydrophone node, a researcher
              or citizen scientist, an educator/activist, or a general
              volunteer.
            </Typography>
            <Typography
              variant="p"
              fontSize="20px"
              paragraph={true}
              align="left"
            >
              If you&apos;re an individual wanting to volunteer, collaborate, or
              donate, check out the many ways you can support Orcasound.
              Everyone can listen for whales, and learn the diverse sounds of
              the Salish Sea.
            </Typography>
            <Typography
              variant="p"
              fontSize="20px"
              paragraph={true}
              align="left"
            >
              If you&apos;re an organization wanting to join the network as the
              host of a new hydrophone node, an educational/outreach node, or
              both — just read the history, mission, and vision of the network,
              e-sign the MOA, and then email{' '}
              <Link
                href="mailto:info@orcasound.net"
                style={{ textDecoration: 'none', color: '#1B2B7B' }}
                onClick={() =>
                  pushToDataLayer('external_link_click', {
                    link_text: 'info@orcasound.net',
                    destination: 'mailto:info@orcasound.net',
                  })
                }
              >
                info@orcasound.net
              </Link>{' '}
              to begin collaborating. There are no membership fees — just
              benefits, roles, and responsibilities.
            </Typography>
          </>
        )}
      </Box>

      <Typography component="p" fontWeight={600} fontSize="20px">
        {moa.title}
      </Typography>
      {moa.subtitle ? (
        <Typography component="p" sx={{ mb: 2 }}>
          {moa.subtitle}
        </Typography>
      ) : null}

      <Box sx={{ mb: 2 }}>
        {panels.map((panel, index) => (
          <MoaDisclosure
            key={index}
            index={index}
            heading={panel.heading}
            paragraphs={panel.paragraphs}
            items={panel.items}
            isOpen={open.has(index)}
            onToggle={() => togglePanel(index)}
          />
        ))}
      </Box>

      {moa.sourceDocUrl ? (
        <Typography component="p" sx={{ mb: 3 }}>
          <Link
            href={moa.sourceDocUrl}
            sx={{ textDecoration: 'underline', color: '#1B2B7B' }}
            onClick={() =>
              pushToDataLayer('external_link_click', {
                link_text: 'View the original MOA document (Google Doc)',
                destination: moa.sourceDocUrl,
              })
            }
          >
            View the original MOA document (Google Doc)
          </Link>
        </Typography>
      ) : null}

      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={openJoin}
      >
        Apply to join the network
      </Button>

      <Typography
        component="h5"
        sx={{ fontSize: '28px', fontWeight: 600, mt: 8, mb: 1 }}
      >
        Current members
      </Typography>
      <Typography component="p" sx={{ mb: 3 }}>
        {`${count} ${
          count === 1 ? 'organization has' : 'organizations have'
        } agreed to the MOA.`}
      </Typography>
      <MoaMemberList members={moa.members} />

      <Typography component="p" sx={{ mt: 4, mb: 2 }}>
        Already a member? You can ask us to update, add, or remove a listing.
      </Typography>
      <Button variant="outlined" type="button" onClick={openChange}>
        Request a change to your listing
      </Button>

      <MoaFormDialog
        open={joinOpen}
        onClose={() => setJoinOpen(false)}
        title="Apply to join the network"
        titleId="moa-join-title"
        pendingFocusRef={pendingFocusRef}
        onExited={() => setJoinResult(null)}
        confirmation={
          joinResult ? (
            <MoaSubmissionConfirmation
              result={joinResult}
              type="join"
              onDone={() => setJoinOpen(false)}
            />
          ) : null
        }
      >
        <MoaJoinForm
          values={joinValues}
          onChange={(key, value) =>
            setJoinValues((prev) => ({ ...prev, [key]: value }))
          }
          onSubmitted={(result) => {
            setJoinResult(result)
            setJoinValues(EMPTY_JOIN)
          }}
          moa={moa}
          onReadFullMoa={readFullMoa}
        />
      </MoaFormDialog>

      <MoaFormDialog
        open={changeOpen}
        onClose={() => setChangeOpen(false)}
        title="Request a change to your listing"
        titleId="moa-change-title"
        pendingFocusRef={pendingFocusRef}
        onExited={() => setChangeResult(null)}
        confirmation={
          changeResult ? (
            <MoaSubmissionConfirmation
              result={changeResult}
              type="change"
              onDone={() => setChangeOpen(false)}
            />
          ) : null
        }
      >
        <MoaChangeRequestForm
          values={changeValues}
          onChange={(key, value) =>
            setChangeValues((prev) => ({ ...prev, [key]: value }))
          }
          onSubmitted={(result) => {
            setChangeResult(result)
            setChangeValues(EMPTY_CHANGE)
          }}
          moa={moa}
        />
      </MoaFormDialog>
    </Box>
  )
}

export default MoaSection
