import { combineReducers } from "@reduxjs/toolkit"

import authenticationReducer from "./reducers/authenticationReducer"

import { actions as authenticationActions } from "./actions/authenticationActions"
import { selectors as authenticationSelectors } from "./reducers/authenticationReducer"

export { authenticationActions, authenticationSelectors }

export default combineReducers({
  authenticationReducer,
})
