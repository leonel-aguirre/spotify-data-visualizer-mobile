import { makeRedirectUri } from "expo-auth-session"
import AsyncStorage from "@react-native-async-storage/async-storage"
import dayjs from "dayjs"

import {
  SET_IS_TOKEN_AVAILABLE,
  SET_TOKEN_EXPIRATION_TIME,
} from "../reducers/authenticationReducer"
import { post } from "@Api"

const redirectURI = process.env.EXPO_PUBLIC_REDIRECT_URI
const tokenDuration = process.env.EXPO_PUBLIC_TOKEN_DURATION

const setIsTokenAvailable = (value) => (dispatch) => {
  dispatch({
    type: SET_IS_TOKEN_AVAILABLE,
    payload: {
      data: value,
    },
  })
}

const setTokenExpirationTime = (value) => (dispatch) => {
  dispatch({
    type: SET_TOKEN_EXPIRATION_TIME,
    payload: {
      data: value,
    },
  })
}

const login = (code) => async (dispatch) => {
  try {
    const response = await post("/login", {
      code: code,
      redirectURL: makeRedirectUri({ native: redirectURI }),
    })

    const newTokenExpirationTime = dayjs().unix() + tokenDuration

    const {
      data: { token },
    } = response

    await AsyncStorage.setItem("token", token)
    dispatch(setIsTokenAvailable(true))
    dispatch(setTokenExpirationTime(newTokenExpirationTime))
  } catch (error) {
    throw new Error(error)
  }
}

export const actions = {
  login,
}
