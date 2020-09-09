import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getLocalLoggedStatus } from '~/state/modules/user/utils'
import { ADMIN, CLIENT } from '~/utilities/constants'

const DefaultRoute = () => {
  const { role } = useSelector(state => state.user)
  const userPath = role === ADMIN ? ADMIN : CLIENT
  const logged = getLocalLoggedStatus()
  let path

  if (logged) {
    path = `${userPath}/dashboard`

    return <Redirect to={path} />
  }

  return <Redirect to="/login" />
}

export default DefaultRoute
