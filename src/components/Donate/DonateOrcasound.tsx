import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  styled,
  Typography,
} from '@mui/material'
import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'

import donateOrcasoundImage from '../../../public/images/donateOrcasound/orcasound.jpg'
import donateVolunteersImage from '../../../public/images/donateOrcasound/volunteers.jpg'
import theme from '../../styles/theme'
import { pushToDataLayer } from '../../utils/gtm'

type ImageSrc = string | StaticImageData

export interface DonateCardData {
  _key?: string
  title?: string
  message?: string
  imageUrl?: string
  imageWidth?: number
  imageHeight?: number
  buttonLabel?: string
  buttonAction?: 'dialog' | 'link'
  buttonHref?: string
}

interface DonationOption {
  title?: string
  description?: string
  href?: string
  imageUrl?: string
}

interface DonateOrcasoundProps {
  cards?: DonateCardData[]
  dialogTitle?: string
  dialogSubtitle?: string
  dialogHeading?: string
  donationOptions?: DonationOption[]
}

// Built-in content, used when Sanity has none (or is unreachable). Only the
// Orcasound card is built in: the Volunteers card was removed in #492.
const DEFAULT_CARDS: DonateCardData[] = [
  {
    _key: 'orcasound',
    title: 'Donate to Orcasound',
    message:
      'Help us build and maintain the technology to listen to orcas in the world.',
    buttonAction: 'dialog',
  },
]
const DEFAULT_BUTTON_LABEL = 'Donate'
const DEFAULT_DIALOG_TITLE = 'Two Ways to Make A Difference'
const DEFAULT_DIALOG_SUBTITLE = 'Select your preferred method'
const DEFAULT_DIALOG_HEADING = 'Ways to Support'
const DEFAULT_DONATION_OPTIONS: (DonationOption & { image: ImageSrc })[] = [
  {
    title: 'Support through Open Collective',
    description: 'Open Collective offers transparent financial contributions.',
    href: 'https://opencollective.com/orcasound',
    image: donateOrcasoundImage,
  },
  {
    title: 'Support through GitHub',
    description:
      'GitHub sponsorship is geared toward supporting our technology resources.',
    href: 'https://github.com/sponsors/orcasound',
    image: donateVolunteersImage,
  },
]

const DonateContainer = styled(Box)(({}) => ({
  margin: '2vw 0',
  flex: 1,
  borderRadius: '15px',
  padding: '2vw',
  border: '1px solid black',
  boxShadow: '0 4px 8px 0 rgba(185, 210, 225, 1)',
  display: 'flex',
  flexDirection: 'column',
}))

const ImageContainer = styled(Box)(({}) => ({
  borderRadius: '1em',
  overflow: 'hidden',
  margin: '0 10px',
}))

const DonateOption = styled('a')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '898px',
  maxWidth: '100%',
  height: '135px',
  padding: '0 16px 0 0',
  gap: '16px',
  backgroundColor: '#F7F8F9',
  borderRadius: '4px',
  overflow: 'hidden',
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    backgroundColor: '#eef0f2',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
    height: 'auto',
    padding: '0 0 16px',
  },
}))

const DonateOptionImage = styled(Box)(({ theme }) => ({
  width: '244px',
  height: '135px',
  flexShrink: 0,
  position: 'relative',
  borderRadius: '4px 0 0 4px',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    borderRadius: '4px 4px 0 0',
  },
}))

const DonateOrcasound = (props: DonateOrcasoundProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const cards =
    props.cards && props.cards.length > 0 ? props.cards : DEFAULT_CARDS
  const dialogTitle = props.dialogTitle || DEFAULT_DIALOG_TITLE
  const dialogSubtitle = props.dialogSubtitle || DEFAULT_DIALOG_SUBTITLE
  const dialogHeading = props.dialogHeading || DEFAULT_DIALOG_HEADING
  // An option without its own thumbnail reuses the first card's image.
  const fallbackOptionImage: ImageSrc =
    cards[0]?.imageUrl || donateOrcasoundImage
  const donationOptions =
    props.donationOptions && props.donationOptions.length > 0
      ? props.donationOptions.map((option) => ({
          ...option,
          image: option.imageUrl || fallbackOptionImage,
        }))
      : DEFAULT_DONATION_OPTIONS

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: '2vw',
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
          },
        }}
      >
        {cards.map((card, index) => {
          const label = card.buttonLabel || DEFAULT_BUTTON_LABEL
          const isLink = card.buttonAction === 'link' && !!card.buttonHref
          const isInternalLink = isLink && card.buttonHref!.startsWith('/')
          const image: ImageSrc = card.imageUrl || donateOrcasoundImage
          return (
            <DonateContainer
              key={card._key || index}
              sx={{
                // A single card keeps the width it has next to a second card.
                maxWidth: cards.length === 1 ? 'calc(50% - 1vw)' : undefined,
                [theme.breakpoints.down('sm')]: { maxWidth: '100%' },
              }}
            >
              <Typography
                fontSize={'1.5rem'}
                textAlign="center"
                sx={{ marginBottom: '2vw' }}
              >
                {card.title}
              </Typography>
              <ImageContainer>
                <Image
                  src={image}
                  width={card.imageUrl ? card.imageWidth : undefined}
                  height={card.imageUrl ? card.imageHeight : undefined}
                  alt={card.title || ''}
                  sizes="100vw"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </ImageContainer>
              <Typography fontSize={'1rem'} sx={{ margin: '10px' }}>
                {card.message}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  marginTop: 'auto',
                }}
              >
                <Button
                  variant="contained"
                  {...(isLink
                    ? {
                        href: card.buttonHref!,
                        target: isInternalLink ? undefined : '_blank',
                        rel: isInternalLink ? undefined : 'noopener noreferrer',
                      }
                    : {})}
                  sx={{
                    backgroundColor: '#1B2B7B',
                    borderRadius: '20px',
                    margin: '10px',
                    width: 'fit-content',
                    fontSize: '16px',
                  }}
                  onClick={() => {
                    pushToDataLayer('cta_click', {
                      cta_text: label,
                      section: 'donate_orcasound',
                      page: 'donate',
                    })
                    if (!isLink) setDialogOpen(true)
                  }}
                >
                  {label}
                </Button>
              </Box>
            </DonateContainer>
          )
        })}
      </Box>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="donate-dialog-title"
        maxWidth={false}
        PaperProps={{
          sx: {
            width: '1018px',
            maxWidth: 'calc(100% - 32px)',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            p: '60px 61px',
            [theme.breakpoints.down('sm')]: {
              p: '32px 24px',
            },
          },
        }}
      >
        <Box component="header" sx={{ m: 0, p: 0 }}>
          <Typography
            id="donate-dialog-title"
            fontFamily="Montserrat"
            fontWeight={500}
            fontSize="32px"
            lineHeight="140%"
            letterSpacing="-0.02em"
            color="#000"
          >
            {dialogTitle}
          </Typography>
          <Typography
            fontFamily="Montserrat"
            fontWeight={500}
            fontSize="18px"
            lineHeight="125%"
            letterSpacing="-0.02em"
            color="#8C8C8C"
            mt={1}
          >
            {dialogSubtitle}
          </Typography>
          <IconButton
            aria-label="Close donate dialog"
            onClick={() => setDialogOpen(false)}
            sx={{
              position: 'absolute',
              right: 32,
              top: 32,
              width: 32,
              height: 32,
              p: 0,
              color: '#404040',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent sx={{ p: 0, mt: '40px', overflow: 'visible' }}>
          <Typography
            fontFamily="Montserrat"
            fontWeight={500}
            fontSize="24px"
            lineHeight="140%"
            letterSpacing="-0.02em"
            color="#000"
            mb={2}
          >
            {dialogHeading}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {donationOptions.map((option, index) => (
              <DonateOption
                key={index}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <DonateOptionImage>
                  <Image
                    src={option.image}
                    alt={option.title || ''}
                    fill
                    sizes="100vw"
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </DonateOptionImage>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    fontFamily="Montserrat"
                    fontWeight={500}
                    fontSize="18px"
                    lineHeight="125%"
                    color="#111"
                    mb={1}
                  >
                    {option.title}
                  </Typography>
                  <Typography
                    fontFamily="Montserrat"
                    fontWeight={500}
                    fontSize="18px"
                    lineHeight="125%"
                    color="#8C8C8C"
                  >
                    {option.description}
                  </Typography>
                </Box>
                <ChevronRightIcon sx={{ color: '#64748B', flexShrink: 0 }} />
              </DonateOption>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DonateOrcasound
