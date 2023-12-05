export const SET_IS_TOKEN_AVAILABLE = "SET_IS_TOKEN_AVAILABLE"
export const SET_TOKEN_EXPIRATION_TIME = "SET_TOKEN_EXPIRATION_TIME"

export const defaultState = {
  isTokenAvailable: false,
  tokenExpirationTime: 0,
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_IS_TOKEN_AVAILABLE:
      return {
        ...state,
        isTokenAvailable: action.payload.data,
      }
    case SET_TOKEN_EXPIRATION_TIME:
      return {
        ...state,
        tokenExpirationTime: action.payload.data,
      }
    default:
      return state
  }
}

const selectIsTokenAvailable = (state) =>
  state.authenticationReducer.isTokenAvailable
const selectTokenExpirationTime = (state) =>
  state.authenticationReducer.tokenExpirationTime

export const selectors = {
  selectIsTokenAvailable,
  selectTokenExpirationTime,
}

export default reducer
