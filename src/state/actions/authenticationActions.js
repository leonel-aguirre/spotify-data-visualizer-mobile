import { makeRedirectUri } from "expo-auth-session"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { post } from "@Api"

const redirectURI = process.env.EXPO_PUBLIC_REDIRECT_URI

const login = (code) => async (_dispatch) => {
  try {
    const response = await post("/login", {
      code: code,
      redirectURL: makeRedirectUri({ native: redirectURI }),
    })

    const {
      data: { token },
    } = response

    await AsyncStorage.setItem("token", token)
  } catch (error) {
    throw new Error(error)
  }
}

export const actions = {
  login,
}
