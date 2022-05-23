import { types } from '../types/types'

const initialState = {
  location: '',
}

export const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE': {
      return { location: `${action.payload.location.pathname}` }
    }
    default:
      return state
  }
}
