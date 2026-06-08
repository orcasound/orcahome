/*
 * Author: Stephen Aranda
 * File  : ContributorCard.jsx
 * Desc  : Component that renders all the contributors and their respective roles.
 *  */
import { Box, Grid, Link, Typography } from '@mui/material'

import { pushToDataLayer } from '../../utils/gtm'

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
              width: {
                phone: '100%',
                tablet: '100%',
                lg: '60%',
              },
              mx: 'auto',

              [theme.breakpoints.between('phone', 'sm')]: {
                textAlign: 'center',
              },

              [theme.breakpoints.between('tablet', 'lg')]: {
                display: 'flex',
                flexDirection: 'row',
                textAlign: 'left',
              },
            })}
          >
            <Grid
              size={{ xs: 12, sm: 5 }}
              sx={(theme) => ({
                textAlign: 'left',
                flexDirection: 'row',

                width: {
                  phone: '100%',
                  tablet: '50%',
                  lg: '50%',
                },

                [theme.breakpoints.between('phone', 'sm')]: {
                  gridGap: '0px',
                  whiteSpace: 'nowrap',
                  justifyContent: 'center',
                },

                [theme.breakpoints.between('tablet', 'lg')]: {
                  textAlign: 'left',
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
                {person.link === '' ? (
                  <Typography
                    variant="fontStyling"
                    sx={(theme) => ({
                      textAlign: 'left',
                      flexDirection: 'row',

                      width: {
                        phone: '50%',
                        lg: '80%',
                      },
                      [theme.breakpoints.between('phone', 'sm')]: {
                        textAlign: !person.country?.trim() ? 'center' : 'right',
                        fontSize: 'small',
                        mx: 'auto',
                      },
                    })}
                  >
                    {person.name}
                  </Typography>
                ) : (
                  <Typography
                    variant="fontStyling"
                    sx={(theme) => ({
                      width: {
                        phone: '50%',
                        lg: '80%',
                      },
                      [theme.breakpoints.between('phone', 'sm')]: {
                        mx: 'auto',
                        display: 'flex',
                        fontSize: 'small',
                        flexDirection: 'row',
                        justifyContent: !person.country?.trim()
                          ? 'center'
                          : 'flex-start',
                      },
                    })}
                  >
                    {' '}
                    <Link
                      href={person.link}
                      sx={(theme) => ({
                        fontSize: '16px',
                        fontWeight: '500',
                        lineHeight: '140%',
                        width: '80%',
                        textDecoration: 'underline',
                        backgroundColor: (theme) => theme.palette.primary,
                        [theme.breakpoints.between('phone', 'sm')]: {
                          textAlign: !person.country?.trim()
                            ? 'center'
                            : 'right',
                          width: '100%',
                          fontSize: 'small',
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
                    variant="fontStyling"
                    sx={(theme) => ({
                      width: {
                        phone: '50%',
                        lg: '40%',
                      },
                      [theme.breakpoints.between('phone', 'sm')]: {
                        alignItems: 'center',
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
                width: {
                  phone: '100%',
                  tablet: '40%',
                  lg: '50%',
                },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'left',

                [theme.breakpoints.between('phone', 'sm')]: {
                  alignItems: 'center',
                },
              })}
            >
              {person.roles.map((role, idx) => (
                <Typography
                  variant="fontStyling"
                  key={idx}
                  sx={(theme) => ({
                    width: '100%',
                    [theme.breakpoints.between('phone', 'sm')]: {
                      alignItems: 'center',
                    },

                    [theme.breakpoints.between('tablet', 'lg')]: {
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
