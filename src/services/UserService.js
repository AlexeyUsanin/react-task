import Api from '../state/utils/api'
import { API_URL } from '../utilities/constants'

class UserService extends Api {
  /**
   * User login
   */
  login = (user, data) => this.post(`/api/v1/${user}/sessions`, { data })

  /**
   * Get all admin's  clients
   */
  adminGetClients = () =>
    this.get('/api/v1/admins/clients/clients').then(({ data }) => data)

  /**
   * Refresh token
   */
  refreshToken = user => this.post(`/api/v1/${user}s/tokens`)

  /**
   * Update admin
   */
  updateAdmin = (data, id) => this.put(`/api/v1/admins/admins/${id}`, { data })

  /**
   * Update client
   */
  updateClient = (data, id) =>
    this.put(`/api/v1/clients/clients/${id}`, { data })

  /**
   * Get admin dashboard
   */
  getAdminDashboard = () =>
    this.get('/api/v1/admins/dashboard').then(({ data }) => data)

  /**
   * Get client dashboard
   */
  getClientDashboard = () =>
    this.get('/api/v1/clients/dashboards').then(({ data }) => data)
}

export default new UserService({
  baseURL: API_URL,
})
