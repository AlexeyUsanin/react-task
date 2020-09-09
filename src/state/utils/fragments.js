export const failApiAction = (FAIL_API_ACTION, entity) => ({
  [FAIL_API_ACTION]: (state, { payload }) => ({
    ...state,
    ...(entity ? { [entity]: { ...payload } } : payload),
    loading: false,
    loaded: false,
  }),
})

export const successApiAction = (SUCCESS_API_ACTION, entity) => ({
  [SUCCESS_API_ACTION]: (state, { payload }) => ({
    ...state,
    ...(entity ? { [entity]: { ...payload } } : payload),
    loading: false,
    loaded: true,
  }),
})

export const requestApiAction = REQUEST_API_ACTION => ({
  [REQUEST_API_ACTION]: state => ({
    ...state,
    loading: true,
    loaded: false,
  }),
})

export const fetchAndSetApiAction = (FETCH_API_ACTION, entity = '') => ({
  ...requestApiAction(FETCH_API_ACTION.REQUEST),
  ...successApiAction(FETCH_API_ACTION.SUCCESS, entity),
  ...failApiAction(FETCH_API_ACTION.FAIL, entity),
})
