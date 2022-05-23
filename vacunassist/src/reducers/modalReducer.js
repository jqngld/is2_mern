import { types } from '../types/types'

const initialState = {
  modal: {
    title: 'new title.',
    description: 'description ',
  },
}

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case types.ShowModal:
      return {
        ...state,
        modal: action.payload,
      }
    case types.HideModal:
      return {
        ...state,
        modal: null,
      }
    default:
      return state
  }
}
