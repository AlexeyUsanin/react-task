import { AxiosResponse } from 'axios'

/**
 * Handles async errors
 *
 * @param {object} error - catched error
 * @returns {string} error message
 */
export const errorHandler = (error: AxiosResponse) => {
  const errors = error?.response?.data?.errors || error?.response?.statusText

  if (Array.isArray(errors)) {
    return errors[0] || 'Oops! Something went wrong'
  }

  if (typeof errors === 'object') {
    const errorsArray = Object.entries(errors)
      .map(err => `${err[0]} ${err[1] || 'error'}`)
      .join('\n')
    return errorsArray
  }

  return errors || 'Oops! Something went wrong'
}

/**
 * Throw async errors
 *
 * @param {object} error - catched error
 * @returns {string} error message
 */
export const throwError = (error: AxiosResponse) => {
  throw new Error(errorHandler(error))
}
