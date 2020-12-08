import axios from 'axios'
import {getDatabaseError} from './error'

/**
 * ACTION TYPES
 */
const GET_RESULT = 'GET_RESULT'

/**
 * INITIAL STATE
 */
const defaultResult = {}

/**
 * ACTION CREATORS
 */
const getResult = result => ({type: GET_RESULT, result})

/**
 * THUNK CREATORS
 */

export const fetchResult = queryStr => async dispatch => {
  try {
    const {data} = await axios.post('./api/query/result', {query: queryStr})
    dispatch(getResult(data))
    // add a comment to explain or change this to resetError or do this through GET_RESULT
    dispatch(getDatabaseError({}))
  } catch (err) {
    if (err.response.status === 422) {
      dispatch(getDatabaseError(err.response.data)) //FINISH HERE
    } else {
      console.error(err)
      dispatch(
        getDatabaseError({
          error: 'Sorry, there was an error in your query. Try again.'
        })
      )
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultResult, action) {
  switch (action.type) {
    case GET_RESULT:
      return action.result
    default:
      return state
  }
}
