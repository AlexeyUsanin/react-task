import React, { memo } from 'react'
import loadable from '@loadable/component'

import PropTypes from 'prop-types'
import { Box, Container, useMediaQuery } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'

import { ClientHeader } from '~/views/components/Header'

const BottomMenu = loadable(() =>
  import('~/views/components/BottomMenu' /* webpackChunkName: "bottom-menu" */)
)

const bottomLinks = [
  {
    Icon: HomeIcon,
    path: '/client/dashboard',
  },
]

const sidebarLinks = [
  {
    Icon: PersonIcon,
    path: '/client/profile',
    name: 'Profile',
  },
]

const MainLayout = ({ children, title, onBack }) => {
  const isTablet = useMediaQuery('(max-width:768px)')

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <ClientHeader title={title} onBack={onBack} />
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        mb={15}
        mt={isTablet && title ? '120px' : '60px'}
      >
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
  onBack: PropTypes.func,
}

MainLayout.defaultProps = {
  children: null,
  title: '',
  onBack: null,
}

export default memo(MainLayout)
