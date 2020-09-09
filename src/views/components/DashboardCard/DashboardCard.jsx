import React, { memo } from 'react'
import pluralize from 'pluralize'
import PropTypes from 'prop-types'

import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Chip,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'

import ClientList from '../ClientList'

import { useToggle } from '~/views/utils/hooks'

const useStyles = makeStyles(theme => ({
  title: {
    marginRight: theme.spacing(2),
  },
  box: {
    '&::-webkit-scrollbar': {
      width: 5,
      background: '#F2F2F2',
      borderRadius: 10,
    },
    '&::-webkit-scrollbar-track': {
      height: '80%',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#BDBDBD',
      borderRadius: 10,
    },
  },
}))

const DashboardCard = ({ title, data }) => {
  const [scroll, scrollState] = useToggle(false)
  const styles = useStyles()

  return (
    <Card>
      <CardHeader
        title={
          <Box display="flex" alignItems="center">
            <Typography className={styles.title} variant="subtitle2">
              {title}
            </Typography>
            <Chip
              color="secondary"
              size="small"
              label={pluralize('user', data?.length, true)}
            />
          </Box>
        }
      />
      <CardContent>
        {data.length ? (
          <>
            <Box
              maxHeight="285px"
              overflow={scroll ? 'auto' : 'hidden'}
              className={styles.box}
            >
              <ClientList listData={data} />
            </Box>
            {data.length > 5 && (
              <Box mt={2} display="flex" justifyContent="center">
                <Button
                  color="secondary"
                  onClick={scrollState.toggle}
                  endIcon={!scroll ? <ArrowDownward /> : <ArrowUpward />}
                >
                  {!scroll ? 'See all' : 'See less'}
                </Button>
              </Box>
            )}
          </>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80px"
          >
            <Typography variant="subtitle2" color="textSecondary">
              You have not clients yet
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.shape(PropTypes.array).isRequired,
}

export default memo(DashboardCard)
