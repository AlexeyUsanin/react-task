import { toastr } from 'react-redux-toastr'

export default () => next => action => {
  const { meta: { message } = {} } = action

  if (message && message.title) {
    const { type, title } = message
    toastr[type](type, title)
  }

  return next(action)
}
