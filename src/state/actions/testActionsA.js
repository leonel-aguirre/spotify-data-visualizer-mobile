import { SET_VALUE_A } from "../reducers/testReducerA"

const setValueA = (value) => (dispatch) => {
  dispatch({
    type: SET_VALUE_A,
    payload: {
      data: value,
    },
  })
}

export const actions = {
  setValueA,
}
