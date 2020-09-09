import objectPath from 'object-path'

export const asyncValidate = (schema, context) => async values =>
  schema.validate(values, { context, abortEarly: false }).catch(errors => {
    const formErrors = {}

    errors.inner.forEach(error => {
      let { path } = error

      if (path.match(/\[[^\]]*]/g)) {
        path = error.path.replace(/[[\]]/g, '.').replace(/\.\./g, '.')
      }

      objectPath.set(formErrors, path, error.message)
    })

    throw formErrors
  })

export const asyncValidateField = value =>
  value || typeof value === 'number' ? undefined : 'You should type a value'
