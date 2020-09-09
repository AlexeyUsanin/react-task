import React from 'react'

import {
  Card,
  CardContent,
  makeStyles,
  Box,
  Button,
  Grid,
  Typography,
} from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'

const useStyles = makeStyles(theme => ({
  email: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(0.5),
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  },
  button: {
    padding: '8px 24px',
  },
}))

const ProfileCard = ({
  handleSubmit,
  user: { last_name, first_name, email },
}) => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid component="form" onSubmit={handleSubmit} container spacing={2}>
          <Grid item xs={12} />
          <Grid item xs={12}>
            <Typography variant="subtitle1">{`${first_name} ${last_name}`}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" mb={1}>
              <EmailIcon />
              <Typography className={classes.email}>{email}</Typography>
            </Box>
          </Grid>
          <Grid item sm={2} xs={12}>
            <Button
              className={classes.button}
              variant="contained"
              type="submit"
              fullWidth
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProfileCard
