import React, { useEffect, memo } from 'react'
import { connect } from 'react-redux'
import { Box } from '@material-ui/core'
import AdminLayout from '../../layouts/admin'
import Loader from '~/views/shared/loaders/Loader'
import DashboardCard from '~/views/components/DashboardCard'

import { getadminDashboard } from '~/state/modules/admin/dashboard'

const Dashboard = ({ data, fetchData, loading, loaded }) => {
  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <Loader />
      ) : (
        loaded && (
          <Box mt={3} mb={12}>
            <DashboardCard
              title="New clients are yet to be assigned a program"
              data={data?.newClientsWithoutProgram}
            />
            <DashboardCard
              title="Clients are waiting for new program to be scheduled"
              data={data?.clientsWithoutProgram}
            />

            <DashboardCard
              title="Clients have no programs scheduled after the next 7 days"
              data={data?.lastProgram}
            />
          </Box>
        )
      )}
    </AdminLayout>
  )
}
const mapStateToProps = ({ adminDashboard: { data, ...rest } }) => ({
  data,
  ...rest,
})

export default connect(mapStateToProps, {
  fetchData: getadminDashboard,
})(memo(Dashboard))
