import { SET_VALUE_A } from "../reducers/testReducerA"

export const setValueA = (value) => (dispatch) => {
  dispatch({
    type: SET_VALUE_A,
    payload: {
      data: value,
    },
  })
}
