import { types } from '../types/types'

const initialState = {
  account: {
    // title: 'new title.',
    // description: 'description ',
  },
}

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case types.loadAccount:
      return {
        ...state,
        account: action.payload,
      }
    default:
      return state
  }
}
