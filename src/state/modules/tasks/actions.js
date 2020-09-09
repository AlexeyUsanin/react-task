import { Deserializer } from 'jsonapi-serializer'

import TaskService from '~/services/UserService'
import { createApiAction, createAction } from '~/state/utils'

export const FETCH_TASKS = createApiAction('tasks / FETCH_TASKS')

export const getTaskById = id =>
  TaskService.thunk(FETCH_TASKS, async () => {
    const { task } = await TaskService.getTaskById(id)
    const data = await new Deserializer({
      keyForAttribute: 'snake_case',
    }).deserialize(task)

    return { data }
  })

export const createTasks = ({
  tasks,
  program_id,
  deleteTasks,
}) => async dispatch => {
  const dataTasks = tasks.reduce((accumulator, week, idx) => {
    const taskItems = Object.entries(week).reduce(
      (currValue, [day_name, values]) => {
        const items = values.map(option => {
          const activity = {}

          return {
            day_name,
            program_id,
            week_number: `${idx + 1}`,
            id: option?.id,
            ...activity,
          }
        })
        return [...currValue, ...items]
      },
      []
    )
    return [...accumulator, ...taskItems]
  }, [])

  if (deleteTasks?.length > 0) {
    await TaskService.deleteTasks({ task_ids: deleteTasks, program_id })
  }

  if (dataTasks.length > 0) {
    const {
      data: { task },
    } = await TaskService.createTasks({ tasks: dataTasks })

    const payload = await new Deserializer({
      keyForAttribute: 'snake_case',
    }).deserialize(task)

    await dispatch(createAction(FETCH_TASKS)(payload))
  }
}
