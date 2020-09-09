import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import ReduxToastr from 'react-redux-toastr'
import { ModalProvider } from 'react-modal-hook'
import { LocalizationProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import store from './state/store'
import history from './history'
import PageLoader from './views/shared/loaders/PageLoader'
import App from './views/routes'

import ErrorBoundary from './views/utils/ErrorBoundary'
import theme from './theme'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={MomentUtils}>
            <ModalProvider>
              <CssBaseline />
              <ErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <App />
                </Suspense>
              </ErrorBoundary>
              <ReduxToastr
                timeOut={4000}
                newestOnTop={false}
                preventDuplicates
                position="top-right"
                transitionIn="bounceIn"
                transitionOut="bounceOut"
                progressBar
                closeOnToastrClick
              />
            </ModalProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
