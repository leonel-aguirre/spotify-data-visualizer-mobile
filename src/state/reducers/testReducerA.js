export const SET_VALUE_A = "SET_VALUE_A"
export const SET_VALUE_B = "SET_VALUE_B"
export const SET_VALUE_C = "SET_VALUE_C"
export const SET_VALUE_D = "SET_VALUE_D"

export const defaultState = {
  valueA: 0,
  valueB: {},
  valueC: [],
  valueD: "",
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_VALUE_A:
      return {
        ...state,
        valueA: action.payload.data,
      }
    case SET_VALUE_B:
      return {
        ...state,
        valueB: action.payload.data,
      }
    case SET_VALUE_C:
      return {
        ...state,
        valueC: action.payload.data,
      }
    case SET_VALUE_D:
      return {
        ...state,
        valueD: action.payload.data,
      }
    default:
      return state
  }
}

const selectValueA = (state) => state.testReducerA.valueA
const selectValueB = (state) => state.testReducerA.valueB
const selectValueC = (state) => state.testReducerA.valueC
const selectValueD = (state) => state.testReducerA.valueD

export const selectors = {
  selectValueA,
  selectValueB,
  selectValueC,
  selectValueD,
}

export default reducer