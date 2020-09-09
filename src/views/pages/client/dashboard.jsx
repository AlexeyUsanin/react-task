import React, { useEffect, lazy, memo, Suspense } from 'react'
import { connect } from 'react-redux'

import {
  Grid,
  makeStyles,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
} from '@material-ui/core'

import { FormatDate } from '~/views/utils/FormatDate'

import ClientLayout from '~/views/layouts/client'
import Loader from '~/views/shared/loaders/Loader'

import { getClientDashboard } from '~/state/modules/client/dashboard'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
  },
  title: {
    fontWeight: '700',
    marginRight: theme.spacing(1),
  },
  itemWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}))

const LineChart = lazy(() => import('~/views/components/LineChart'))

const Dashboard = ({ fetchData, loading, loaded, goal }) => {
  const classes = useStyles()

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <ClientLayout>
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={2} className={classes.container}>
          <Card>
            <CardHeader title="Goal" className={classes.cardHeader} />
            {loaded && (
              <CardContent>
                <Grid item xs={12}>
                  <Box width="100%">
                    <Box className={classes.itemWrapper}>
                      <Typography className={classes.title}>
                        Goal date:{' '}
                      </Typography>
                      <Typography>
                        {FormatDate(goal?.goal_date, 'DD.MM.YYYY')}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </CardContent>
            )}
          </Card>

          <Card>
            <CardHeader title="Progress graph" className={classes.cardHeader} />
            {loaded && (
              <CardContent>
                <Grid item xs={12}>
                  <Suspense fallback={<Loader />}>
                    <LineChart
                      dataKeys={['measure', 'goal']}
                      data={goal}
                      height={230}
                      hideX
                    />
                  </Suspense>
                </Grid>
              </CardContent>
            )}
          </Card>
        </Grid>
      )}
    </ClientLayout>
  )
}

const mapStateToProps = ({ clientDashboard: { data, ...loaders } }) => ({
  ...loaders,
  goal: data?.goal,
  measures: data?.measures,
})
export default connect(mapStateToProps, {
  fetchData: getClientDashboard,
})(memo(Dashboard))
