import React, { useCallback } from 'react'
import { connect } from 'react-redux'

import {
  Card,
  Typography,
  Box,
  IconButton,
  makeStyles,
} from '@material-ui/core'

import { Close } from '@material-ui/icons'

import { useRouteMatch } from 'react-router-dom'
import { unassingClientFromProgram } from '~/state/modules/client/programs'

const useStyles = makeStyles(theme => ({
  card: {
    paddingLeft: theme.spacing(1),
    backgroundColor: theme.palette.grey[800],
    minWidth: 200,
    color: '#fff',
    '& svg': {
      color: '#fff',
      fontSize: 16,
    },
  },
}))

const AssignedProgramCard = ({
  program,
  start_date,
  end_date,
  id,
  deleteCard,
}) => {
  const {
    params: { id: client_id },
  } = useRouteMatch()

  const handleDelete = useCallback(() => {
    deleteCard(client_id, id)
  }, [client_id, deleteCard, id])

  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="caption">
          {program?.name} {start_date} - {end_date}
        </Typography>
        <IconButton onClick={handleDelete}>
          <Close />
        </IconButton>
      </Box>
    </Card>
  )
}

export default connect(null, {
  deleteCard: unassingClientFromProgram,
})(AssignedProgramCard)
