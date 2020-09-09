import React, { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'

import { Box, Button } from '@material-ui/core'

import CardFilter from '~/views/components/CardFilter'
import ItemCard from '~/views/components/ItemCard/ItemCard'
import TrainerLayout from '~/views/layouts/admin'
import CreateProgramModal from '~/views/components/CreateProgramModal'
import Link from '~/views/shared/Link'

import { useToggle } from '~/views/utils/hooks'

import { getAllPrograms, deleteProgramAction } from '~/state/modules/programs'

const Programs = ({ fetchData, programs }) => {
  const [modal, modalState] = useToggle(false)

  const listItemProps = useMemo(
    () => ({
      actionButton: true,
      avatarVariant: 'square',
      path: 'program',
      component: Link,
      handleDelete: deleteProgramAction,
    }),
    []
  )

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <TrainerLayout
      title="Programs"
      actionButton={
        <Button variant="contained" onClick={modalState.show}>
          Create program
        </Button>
      }
    >
      <Box mt={3} mb={4}>
        <CardFilter
          name="search"
          placeholder="Search"
          RenderComponent={ItemCard}
          listItemProps={listItemProps}
          itemsName="programs"
          {...programs}
        />
      </Box>
      <CreateProgramModal open={modal} handleClose={modalState.hide} />
    </TrainerLayout>
  )
}

const mapStateToProps = ({ programs: { data, ...rest } }) => ({
  programs: { options: data, ...rest },
})

export default connect(mapStateToProps, {
  fetchData: getAllPrograms,
})(Programs)
