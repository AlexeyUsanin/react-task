import React from 'react'
import loadable from '@loadable/component'

const Moment = loadable.lib(() => import('moment'))

export const FormatDate = (date = {}, format = 'DD.MM.YYYY') => (
  <Moment fallback={new Date(date).toLocaleDateString()}>
    {({ default: moment }) => moment(date).format(format)}
  </Moment>
)
