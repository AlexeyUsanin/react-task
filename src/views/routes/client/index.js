import { lazy } from 'react'

const Dashboard = lazy(() => import('~/views/pages/client/dashboard'))
const Profile = lazy(() => import('~/views/pages/client/profile'))

export const clientRoutes = [
  {
    path: '/client/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/client/profile',
    name: 'profile',
    component: Profile,
  },
]
