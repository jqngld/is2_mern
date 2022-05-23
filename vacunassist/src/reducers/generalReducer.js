import { types } from '../types/types'

const initialState = {
  info: {
    // title: 'new title.',
    // description: 'description ',
  },
}

export default function generalReducer(state = initialState, action) {
  switch (action.type) {
    case types.loadGeneral:
      return {
        ...state,
        info: action.payload,
      }
    default:
      return state
  }
}
