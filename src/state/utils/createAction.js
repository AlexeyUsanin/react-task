const createAction = type => (payload, meta) =>
  payload !== undefined
    ? {
        type,
        payload,
        meta: {
          message: {
            type: 'success',
            title: meta,
          },
        },
      }
    : { type }

export default createAction
