import { createSelector } from 'reselect'

const programsDataSelector = state => state.programs.data

export const getProgramOptions = createSelector(programsDataSelector, data =>
  data.map(({ name, id }) => ({ label: name, value: id }))
)
