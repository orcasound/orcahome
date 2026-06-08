/*
 * Author: Stephen Aranda
 * File  : Intro.jsx
 * Desc  : This component is for the introduction paragraphs that sit in the top section of the page
 * @param : text: paragraph that will be styled and rendered.
 *  */

import { Box, Typography } from '@mui/material'

const IntroParagraph = ({ text }) => {
  return (
    <div className="intro-paragraph-container">
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'black',
        }}
      >
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: '500',
            lineHeight: '140%',
          }}
        >
          {text}
        </Typography>
      </Box>
    </div>
  )
}

export default IntroParagraph
