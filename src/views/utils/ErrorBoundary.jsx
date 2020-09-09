import React from 'react'

import ErrorLayout from '~/views/layouts/Error'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch() {
    this.setState({ hasError: true })
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props

    if (hasError) return <ErrorLayout />

    return children
  }
}

export default ErrorBoundary
