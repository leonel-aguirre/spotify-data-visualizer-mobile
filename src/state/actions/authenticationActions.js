import { makeRedirectUri } from "expo-auth-session"
import AsyncStorage from "@react-native-async-storage/async-storage"
import dayjs from "dayjs"

import { post } from "@Api"

const redirectURI = process.env.EXPO_PUBLIC_REDIRECT_URI
const tokenDuration = process.env.EXPO_PUBLIC_TOKEN_DURATION

const setTokenExpirationTime = (value) => async (_dispatch) => {
  await AsyncStorage.setItem("tokenExpirationTime", value)
}

const login = (code) => async (dispatch) => {
  try {
    const response = await post("/login", {
      code: code,
      redirectURL: makeRedirectUri({ native: redirectURI }),
    })

    const newTokenExpirationTime = dayjs().unix() + Number(tokenDuration)

    const {
      data: { token },
    } = response

    await AsyncStorage.setItem("token", token)
    await dispatch(setTokenExpirationTime(newTokenExpirationTime.toString()))
  } catch (error) {
    throw new Error(error)
  }
}

const isSessionActive = () => async (_dispatch) => {
  const tokenExpirationTime = await AsyncStorage.getItem("tokenExpirationTime")
  const token = await AsyncStorage.getItem("token")

  const timeDifference = Number(tokenExpirationTime) - dayjs().unix()

  console.log({ timeDifference })

  return token && timeDifference > 0
}

export const actions = {
  setTokenExpirationTime,
  login,
  isSessionActive,
}
