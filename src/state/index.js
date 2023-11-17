import { combineReducers } from "@reduxjs/toolkit"

import testReducerA from "./reducers/testReducerA"
import testReducerB from "./reducers/testReducerB"

import { actions as testActionsA } from "./actions/testActionsA"
import { selectors as selectorsA } from "./reducers/testReducerA"
import { selectors as selectorsB } from "./reducers/testReducerB"

export { testActionsA, selectorsA, selectorsB }

export default combineReducers({
  testReducerA,
  testReducerB,
})
