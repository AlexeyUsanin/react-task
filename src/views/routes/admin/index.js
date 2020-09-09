import { lazy } from 'react'

const Dashboard = lazy(() => import('../../pages/admin/dashboard'))
const Profile = lazy(() => import('../../pages/admin/profile'))
const Clients = lazy(() => import('../../pages/admin/clients'))
const Programs = lazy(() => import('../../pages/admin/programs'))

export const adminRoutes = [
  {
    path: '/admin/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/admin/clients',
    name: 'clients',
    component: Clients,
  },
  {
    path: '/admin/client/:id',
    name: 'client',
  },
  {
    path: '/admin/programs',
    name: 'programs',
    component: Programs,
  },

  {
    path: '/admin/profile',
    name: 'profile',
    component: Profile,
  },
]
