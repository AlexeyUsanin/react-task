import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { Box, Typography, Container, Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100vw',
    position: 'relative',
    minHeight: 100,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0px 4px 4px rgba(35, 35, 35, 0.15)',
    [theme.breakpoints.down(768)]: {
      minHeight: 60,
    },
  },
  button: {
    width: '100%',
    '& button': {
      width: '100%',
    },
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginLeft: 'auto',
      width: 'fit-content',
    },
  },
}))

const SubHeader = ({ title, button, titleCard }) => {
  const classes = useStyles()

  return (
    <Box className={classes.wrapper}>
      <Container>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={1}
        >
          <Grid item md={9} xs={button ? 6 : 12}>
            <Box display="flex" alignItems="center">
              {title && (
                <Typography variant="subtitle1" component="h1">
                  {title}
                </Typography>
              )}
              {titleCard && titleCard}
            </Box>
          </Grid>

          {button && (
            <Grid item md={3} sm={6} xs={12}>
              <Box className={classes.button}>{button}</Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  )
}

SubHeader.propTypes = {
  title: PropTypes.string,
  button: PropTypes.element,
  titleCard: PropTypes.element,
}

SubHeader.defaultProps = {
  title: '',
  button: null,
  titleCard: null,
}

export default memo(SubHeader)
