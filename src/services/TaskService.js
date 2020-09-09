import Api from '../state/utils/api'
import { API_URL } from '../utilities/constants'

class TaskService extends Api {
  /*
   * Create tasks
   */
  createTasks = data => this.post('/api/v1/admins/tasks', { data })

  /**
   * Delete tasks
   */
  deleteTasks = data => this.del(`/api/v1/admins/tasks/1`, { data })

  /**
   * Show task by id
   */
  getTaskById = id =>
    this.get(`/api/v1/admins/tasks?program_id=${id}`).then(({ data }) => data)
}

export default new TaskService({
  baseURL: API_URL,
})
