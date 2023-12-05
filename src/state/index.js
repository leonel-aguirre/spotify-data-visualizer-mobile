import { combineReducers } from "@reduxjs/toolkit"

import authenticationReducer from "./reducers/authenticationReducer"
import userReducer from "./reducers/userReducer"

import { actions as authenticationActions } from "./actions/authenticationActions"
import { actions as userActions } from "./actions/userActions"
import { selectors as authenticationSelectors } from "./reducers/authenticationReducer"
import { selectors as userSelectors } from "./reducers/userReducer"

export {
  authenticationActions,
  userActions,
  authenticationSelectors,
  userSelectors,
}

export default combineReducers({
  authenticationReducer,
  userReducer,
})
