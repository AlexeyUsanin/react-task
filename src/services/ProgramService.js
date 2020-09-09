import Api from '../state/utils/api'
import { API_URL } from '../utilities/constants'

class ProgramService extends Api {
  /*
   * Create program
   */
  createProgram = data => this.post('/api/v1/admins/programs', { data })

  /**
   * Delete program
   */
  deleteProgram = id => this.del(`/api/v1/admins/programs/${id}`)

  /**
   * Update admin
   */
  getClientPrograms = id =>
    this.get(`/api/v1/admins/clients/programs?client_id=${id}`).then(
      ({ data }) => data
    )

  /**
   * Get programs by client id
   */
  getProgramsById = id =>
    this.get(`/api/v1/admins/clients/programs?client_id=${id}`).then(
      ({ data }) => data
    )

  /**
   * Get all programs
   */
  getAllPrograms = () =>
    this.get('/api/v1/admins/programs').then(({ data }) => data)

  /**
   * Show program by id
   */
  getProgramById = id =>
    this.get(`/api/v1/admins/programs/${id}`).then(({ data }) => data)

  /**
   * Assign client to a program
   */
  createClientProgram = data =>
    this.post('/api/v1/admins/clients/programs', { data })

  /**
   * Unassign client to a program
   */
  deleteClientProgram = (id, data) =>
    this.del(`/api/v1/admins/clients/programs/${id}`, { data })

  /**
   * Update program
   */
  updateProgram = (id, data) =>
    this.put(`/api/v1/admins/programs/${id}`, { data })
}

export default new ProgramService({
  baseURL: API_URL,
})
