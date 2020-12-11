import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_TABLES = 'GET_TABLES'

/**
 * INITIAL STATE
 */
const defaultTables = []

/**
 * ACTION CREATORS
 */
const getTables = tables => ({type: GET_TABLES, tables})

/**
 * THUNK CREATORS
 */

export const fetchTables = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/models')
    dispatch(getTables(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultTables, action) {
  switch (action.type) {
    case GET_TABLES:
      return action.tables
    default:
      return state
  }
}
