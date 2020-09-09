import React, { useEffect, useState, Suspense, memo } from 'react'
import { useDispatch, connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { toastr } from 'react-redux-toastr'

import PageLoader from '../shared/loaders/PageLoader'
import defaultRoute from './default'
import Login from '../pages/login'

import { refreshToken } from '../../state/modules/user'
import { adminRoutes } from './admin'
import { clientRoutes } from './client'
import LocalStorage from '../../services/LocalStorage'
import { STORAGE, ADMIN } from '../../utilities/constants'
import { useNetwork } from '~/views/utils/hooks'

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

const App = ({ userRole }) => {
  const dispatch = useDispatch()
  const [initialized, setInitialized] = useState(false)
  const isOffline = useNetwork()

  useEffect(() => {
    const token = new LocalStorage().get(STORAGE.authToken)

    async function auth() {
      try {
        await dispatch(refreshToken(token))
      } catch (error) {
        toastr.error('Error', 'Oops something went wrong')
      } finally {
        setInitialized(true)
      }
    }

    if (token) auth()
    else setInitialized(true)
  }, [dispatch, initialized, userRole])

  useEffect(() => {
    if (isOffline) {
      toastr.warning(
        'Whoops! No Internet Connection',
        'Some parts of this app may be unavailable until you come back online.',
        {
          position: 'bottom-center',
          timeOut: 0,
        }
      )
    } else {
      toastr.removeByType('warning')
    }
  }, [isOffline])

  if (initialized) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route exact path="/" component={defaultRoute} />
          <Route exact path="/login" component={Login} />
          {userRole === ADMIN
            ? adminRoutes.map(({ name, component, path }) => (
                <Route exact key={name} path={path} component={component} />
              ))
            : clientRoutes.map(({ name, component, path }) => (
                <Route exact key={name} path={path} component={component} />
              ))}

          <Redirect to={`/${userRole}/dashboard`} />
        </Switch>
      </Suspense>
    )
  }

  return <PageLoader />
}

const mapStateToProps = state => ({
  userRole: state.user.role,
})

export default connect(mapStateToProps)(memo(App))
