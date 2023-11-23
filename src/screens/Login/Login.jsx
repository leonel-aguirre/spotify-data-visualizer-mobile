import React, { useEffect } from "react"
import { View, StyleSheet, Text } from "react-native"
import { useDispatch } from "react-redux"
import { Image } from "expo-image"
import * as WebBrowser from "expo-web-browser"
import { makeRedirectUri, useAuthRequest } from "expo-auth-session"
import { LinearGradient } from "expo-linear-gradient"

import { Color, Space } from "@Styles"
import { Button } from "@Components"
import { authenticationActions } from "@State"

const { login } = authenticationActions

WebBrowser.maybeCompleteAuthSession()

const authEndpoints = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
}

const Login = ({ navigation }) => {
  const dispatch = useDispatch()

  const [_request, response, promptAsync] = useAuthRequest(
    {
      clientId: "28336657c5194faaa73c9a853e21b536",
      scopes: ["user-read-private", "user-read-email", "user-top-read"],
      usePKCE: false,
      redirectUri: makeRedirectUri({ native: "exp://192.168.100.3:8081" }),
    },
    authEndpoints
  )

  useEffect(() => {
    const performLogin = async () => {
      try {
        await dispatch(login(response?.params?.code))

        navigation.reset({
          index: 0,
          routes: [{ name: "Root" }],
        })
      } catch (error) {
        console.error(error)
      }
    }

    if (response?.type === "success" && response?.params?.code) {
      performLogin()
    }
  }, [response])

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Color.RAISIN_BLACK, Color.AMETHYST_PURPLE_D60]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Image
          style={styles.image}
          source={require("../../../assets/LogoB.png")}
          contentFit="contain"
        />

        <Text style={styles.subtitle}>
          Visualize Your Music, Hear Your Data
        </Text>

        <Button
          style={styles.button}
          type={Button.SUCCESS}
          onPress={() => {
            promptAsync()
          }}
        >
          Log In With Spotify
        </Button>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
  gradient: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: Space.S4,
  },
  image: {
    width: "100%",
    height: Space.S6,
  },
  subtitle: {
    color: Color.GHOST_WHITE,
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    lineHeight: 0,
    marginTop: Space.S1,
  },
  button: {
    marginTop: Space.S7,
  },
})

export default Login
