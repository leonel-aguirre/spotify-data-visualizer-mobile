export const SET_USER_NAME = "SET_USER_NAME"
export const SET_USER_AGE = "SET_USER_AGE"

export const defaultState = {
  user: {
    name: "Placeholder Name",
    age: 0,
  },
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER_NAME:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload.data,
        },
      }
    case SET_USER_AGE:
      return {
        ...state,
        user: {
          ...state.user,
          age: action.payload.data,
        },
      }
    default:
      return state
  }
}
const selectUser = (state) => state.testReducerB.user

export const selectors = {
  selectUser,
}

export default reducer
