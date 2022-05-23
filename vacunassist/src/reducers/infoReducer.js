import { types } from '../types/types'

const initialState = {
  info: {
    // title: 'new title.',
    // description: 'description ',
  },
}

export default function infoReducer(state = initialState, action) {
  switch (action.type) {
    case types.loadInfo:
      return {
        ...state,
        info: action.payload,
      }
    default:
      return state
  }
}
