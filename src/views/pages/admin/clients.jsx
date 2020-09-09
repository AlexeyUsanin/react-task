import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { Box } from '@material-ui/core'

import Link from '~/views/shared/Link'
import CardFilter from '~/views/components/CardFilter'
import ItemCard from '~/views/components/ItemCard/ItemCard'
import AdminLayout from '~/views/layouts/admin'

import { getadminClients } from '~/state/modules/admin/clients'

const Clients = ({ fetchData, clients }) => {
  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <AdminLayout title="Clients">
      <Box mt={3}>
        <CardFilter
          name="search"
          placeholder="Search"
          RenderComponent={ItemCard}
          itemsName="clients"
          listItemProps={{
            actionButton: false,
            path: 'client',
            component: Link,
          }}
          {...clients}
        />
      </Box>
    </AdminLayout>
  )
}

const mapStateToProps = ({ adminClients: { data, ...rest } }) => {
  if (!Array.isArray(data)) {
    return {
      options: [],
    }
  }

  return {
    clients: {
      options: data.map(({ last_name, first_name, id, avatar }) => ({
        name: `${first_name} ${last_name}`,
        imgSrc: avatar?.url,
        id,
      })),
      ...rest,
    },
  }
}

export default connect(mapStateToProps, {
  fetchData: getadminClients,
})(Clients)
