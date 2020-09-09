import React from 'react'

import { Typography, Box, Avatar, makeStyles, Grid } from '@material-ui/core'

import AssignedProgramCard from '~/views/components/AssignedProgramCard'

import Loader from '~/views/shared/loaders/Loader'

import { FormatDate } from '~/views/utils/FormatDate'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(1),
    width: '100%',
  },

  avatar: {
    width: 60,
    height: 60,
    marginRight: theme.spacing(2),
  },

  infoWrapper: {
    display: 'flex',
    '& p': {
      marginRight: theme.spacing(1),
      textTransform: 'capitalize',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      '& p': {
        marginRight: 0,
      },
    },
  },
}))

const SubHeaderClientInfo = ({ client, programs, loaded }) => {
  const classes = useStyles()

  return loaded ? (
    <Box className={classes.wrapper}>
      <Avatar
        className={classes.avatar}
        alt="avatar"
        src={client?.avatar?.url}
      />
      <Box width="100%">
        <Typography variant="subtitle2">{`${client.first_name} ${client.last_name}`}</Typography>
        <Grid container spacing={1}>
          {programs.map(({ id, start_date, end_date, ...rest }) => (
            <Grid item xs={12} md={6} key={id}>
              <AssignedProgramCard
                id={id}
                start_date={FormatDate(start_date, 'DD.MM.YYYY')}
                end_date={FormatDate(end_date, 'DD.MM.YYYY')}
                {...rest}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  ) : (
    <Loader />
  )
}

export default SubHeaderClientInfo
