import { combineReducers } from "@reduxjs/toolkit"

import testReducerA from "./reducers/testReducerA"
import testReducerB from "./reducers/testReducerB"

export default combineReducers({
  testReducerA,
  testReducerB,
})
