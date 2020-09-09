import React, { memo } from 'react'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import { Box, Container, useMediaQuery } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import PeopleIcon from '@material-ui/icons/People'
import AssignmentIcon from '@material-ui/icons/Assignment'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'

import SubHeader from '~/views/components/SubHeader'

const BottomMenu = loadable(() => import('~/views/components/BottomMenu'))

const bottomLinks = [
  {
    Icon: HomeIcon,
    path: '/trainer/dashboard',
  },
  {
    Icon: PeopleIcon,
    path: '/trainer/clients',
  },
  {
    Icon: AssignmentIcon,
    path: '/trainer/programs',
  },
]

const sidebarLinks = [
  {
    Icon: FitnessCenterIcon,
    path: '/trainer/workouts',
    name: 'Workouts',
  },
]

const MainLayout = ({ children, title, actionButton, titleCard }) => {
  const isTablet = useMediaQuery('(max-width:768px)')

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box flex={1} display="flex" flexDirection="column" mb={6} mt="60px">
        <SubHeader title={title} button={actionButton} titleCard={titleCard} />
        <Container>{children}</Container>
      </Box>
      {isTablet && (
        <BottomMenu bottomLinks={bottomLinks} sidebarLinks={sidebarLinks} />
      )}
    </Box>
  )
}

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  title: PropTypes.string,
  titleCard: PropTypes.element,
  actionButton: PropTypes.element,
}

MainLayout.defaultProps = {
  title: '',
  children: null,
  titleCard: null,
  actionButton: null,
}

export default memo(MainLayout)
