/*
 * Author: Stephen Aranda
 * File  : ContributorCard.jsx
 * Desc  : Component that renders all the contributors and their respective roles.
 *  */
import { Box, Container, Grid, Link, styled,Typography } from '@mui/material'

const ContributorCard = ({ contributors }) => {
  return (
    <div className="contributor-card-container">
      <Grid
        container
        sx={(theme) => ({
          width: '100%',
          rowGap: '20px',
          m: 'auto',
        })}
      >
        {contributors.map((person, index) => (
          <Grid
            container
            key={index}
            sx={(theme) => ({
              width: '70%',
              fontSize: '16px',
              fontWeight: '500',
              lineHeight: '140%',
              mx: 'auto',
              [theme.breakpoints.between('phone', 'sm')]: {
                textAlign: 'center',
                width: '100%',
                mx: 'auto',
              },

              [theme.breakpoints.between('tablet', 'md')]: {
                display: 'flex',
                flexDirection: 'row',
                textAlign: 'left',
                width: '100%',
              },
            })}
          >
            <Grid
              size={{ xs: 12, sm: 5 }}
              sx={(theme) => ({
                textAlign: 'left',
                flexDirection: 'row',
                width: '50%',
                [theme.breakpoints.between('phone', 'sm')]: {
                  gridGap: '0px',
                  whiteSpace: 'nowrap',
                  justifyContent: 'center',
                  width: '100%',
                },

                [theme.breakpoints.between('tablet', 'lg')]: {
                  textAlign: 'left',
                  width: '60%',
                },
              })}
            >
              <Box
                sx={(theme) => ({
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  display: 'flex',
                  [theme.breakpoints.between('phone', 'sm')]: {
                    flexDirection: 'row',
                    // If country is missing or empty, center the link. Otherwise, align left/default.

                    justifyContent: !person.country?.trim()
                      ? 'center'
                      : 'flex-start',
                  },
                })}
              >
                {/* 1. (Always renders) */}
                {person.link?.trim() ? (
                  <Typography
                    sx={(theme) => ({
                      textAlign: 'left',
                      flexDirection: 'row',
                      fontSize: '16px',
                      fontWeight: '500',
                      lineHeight: '140%',
                      width: '57%',

                      [theme.breakpoints.between('phone', 'sm')]: {
                        textAlign: !person.country?.trim() ? 'center' : 'right',
                        width: '50%',
                        mx: 'auto',
                      },
                    })}
                  >
                    {person.name}
                  </Typography>
                ) : (
                  <Typography
                    sx={(theme) => ({
                      fontSize: '16px',
                      fontWeight: '500',
                      lineHeight: '140%',
                      width: '80%',
                      [theme.breakpoints.between('phone', 'sm')]: {
                        width: '50%',
                        mx: 'auto',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: !person.country?.trim()
                          ? 'center'
                          : 'flex-start',
                      },
                    })}
                  >
                    {' '}
                    <Link
                      href={person.link || '#'}
                      sx={(theme) => ({
                        fontSize: '16px',
                        fontWeight: '500',
                        lineHeight: '140%',
                        width: '80%',
                        textDecoration: 'underline',
                        color: '#1B2B7B',
                        [theme.breakpoints.between('phone', 'sm')]: {
                          textAlign: !person.country?.trim()
                            ? 'center'
                            : 'right',
                          width: '100%',
                        },
                      })}
                      onClick={() =>
                        pushToDataLayer('external_link_click', {
                          link_text: person.name,
                          destination: person.link,
                        })
                      }
                    >
                      {person.name}
                    </Link>
                  </Typography>
                )}

                {/* 2. Country renders ONLY if it exists and is not empty */}
                {person.country?.trim() && (
                  <Typography
                    sx={(theme) => ({
                      fontSize: '16px',
                      fontWeight: '500',
                      lineHeight: '140%',

                      [theme.breakpoints.between('phone', 'sm')]: {
                        width: '50%',
                        alignItems: 'center',
                      },

                      [theme.breakpoints.between('tablet', 'md')]: {
                        width: '40%',
                      },
                    })}
                  >
                    {person.country}
                  </Typography>
                )}
              </Box>
            </Grid>

            <Grid
              size={{ xs: 12, sm: 7 }}
              sx={(theme) => ({
                [theme.breakpoints.between('phone', 'sm')]: {
                  width: '100%',
                  alignItems: 'center',
                },

                [theme.breakpoints.between('tablet', 'md')]: {
                  width: '40%',
                },
              })}
            >
              {person.roles.map((role, idx) => (
                <Typography
                  key={idx}
                  sx={(theme) => ({
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '140%',

                    [theme.breakpoints.between('phone', 'sm')]: {
                      width: '100%',
                      alignItems: 'center',
                    },

                    [theme.breakpoints.between('tablet', 'md')]: {
                      textAlign: 'left',
                    },
                  })}
                >
                  {role}
                </Typography>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default ContributorCard
