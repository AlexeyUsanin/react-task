import React from 'react'
import PropTypes from 'prop-types'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { useTheme, Box, Typography } from '@material-ui/core'

const COLORS = { measure: '#fff', goal: '#2196f3', value: '#fff' }

const CustomTooltip = ({ active, payload }) => {
  if (active) {
    const { name, unit, type } = payload[0].payload
    return (
      <Box bgcolor="background.paper" p={2}>
        <Typography variant="subtitle2">{type}</Typography>
        <div>{name}</div>
        <div>{`${payload[0].value} ${unit}`}</div>
      </Box>
    )
  }

  return null
}

const Chart = ({ data, dataKeys, height, hideY, hideX }) => {
  const theme = useTheme()

  return (
    <>
      {data.length > 0 && (
        <ResponsiveContainer height={height}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: -20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            {!hideX && <XAxis dataKey="name" />}
            {!hideY && <YAxis width={70} allowDecimals={false} />}
            <Tooltip
              formatter={(value, name, { payload }) => [payload?.unit, value]}
              labelFormatter={id => data?.[id]?.name}
              separator=" "
              content={<CustomTooltip />}
              labelStyle={{ color: theme.palette.primary.main }}
              itemStyle={{ color: theme.palette.primary.main }}
            />
            {dataKeys.map(dataKey => (
              <Line
                key={dataKey}
                connectNulls
                type="monotone"
                dataKey={dataKey}
                stroke={COLORS[dataKey]}
                dot={{ fill: COLORS[dataKey], r: 5 }}
                activeDot={{ r: 6, stroke: COLORS[dataKey] }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  )
}

Chart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, value: PropTypes.number })
  ).isRequired,
  dataKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  height: PropTypes.number.isRequired,
  hideY: PropTypes.bool,
  hideX: PropTypes.bool,
}

Chart.defaultProps = {
  hideY: false,
  hideX: false,
}

export default Chart
