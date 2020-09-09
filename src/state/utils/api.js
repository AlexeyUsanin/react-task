import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

type Handler = (url: String, config: AxiosRequestConfig) => Promise<any>

type Handlers = {
  get: Handler,
  post: Handler,
  put: Handler,
  patch: Handler,
  del: Handler,
}

class Api {
  #config

  #instance

  constructor(config: AxiosRequestConfig) {
    this.#config = config
    this.#instance = axios.create(config)
  }

  makeRequest(method: string, url: string, options: AxiosRequestConfig = {}) {
    const headers = { ...this.#instance.defaults.headers, ...options.headers }

    return this.#instance({
      ...options,
      method,
      url,
      headers,
    })
      .then((resp: AxiosResponse) => resp)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  setAuthToken(auth_token: string) {
    if (auth_token) {
      this.#instance.defaults.headers.common.Authorization = `Bearer ${auth_token}`
    } else delete this.#instance.defaults.headers.common.Authorization
  }

  get: Handler = (url, config) => this.makeRequest('get', url, config)

  post: Handler = (url, config) => this.makeRequest('post', url, config)

  put: Handler = (url, config) => this.makeRequest('put', url, config)

  patch: Handler = (url, config) => this.makeRequest('patch', url, config)

  del: Handler = (url, config) => this.makeRequest('delete', url, config)

  requestHandlers: Handlers = {
    get: this.get,
    post: this.post,
    put: this.put,
    patch: this.patch,
    del: this.del,
  }

  /**
   * Redux API helper for request -> success/fail flow
   * @param {ApiAction} apiAction - can be created using `createApiAction`
   * @param {Callback} cb - callback which executes requests
   *
   * @returns {ThunkAction} thunk, which executes provided promise and binds three dispatches for request, success and fail phase
   */
  thunk = (apiAction, cb, meta) => (dispatch, getState) => {
    dispatch({ type: apiAction.REQUEST, meta })

    return cb(this.requestHandlers, dispatch, getState)
      .then(({ data, status, headers }) => {
        const newData = data?.data ? data : { data }
        dispatch({
          type: apiAction.SUCCESS,
          payload: {
            ...newData,
            status,
            headers,
          },
        })
        return data
      })
      .catch(error => {
        dispatch({
          type: apiAction.FAIL,
          meta: {
            ...meta,
            message: error && {
              type: 'error',
              title: error.response
                ? error?.response?.data?.error
                : error?.response?.statusText,
            },
          },
        })
      })
  }
}

export default Api
