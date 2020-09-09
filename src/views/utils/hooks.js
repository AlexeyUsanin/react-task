import { useState, useCallback, useEffect } from 'react'

export const useToggle = (value = false) => {
  const [state, setState] = useState(value)

  const show = useCallback(() => {
    setState(true)
  }, [])

  const hide = useCallback(() => {
    setState(false)
  }, [])

  const toggle = useCallback(() => setState(v => !v), [])

  return [state, { show, hide, toggle, set: setState }]
}

export const useNetwork = () => {
  const [isOffline, setNetworkStatus] = useState(false)

  const handleNetworkChange = useCallback(() => {
    if (!navigator.onLine) {
      setNetworkStatus(true)
    } else {
      setNetworkStatus(false)
    }
  }, [])

  useEffect(() => {
    handleNetworkChange()
    window.addEventListener('offline', handleNetworkChange)
    window.addEventListener('online', handleNetworkChange)

    return () => {
      window.removeEventListener('offline', handleNetworkChange)
      window.removeEventListener('online', handleNetworkChange)
    }
  }, [handleNetworkChange])

  return isOffline
}
