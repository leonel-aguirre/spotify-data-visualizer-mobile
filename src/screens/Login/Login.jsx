import * as React from "react"
import * as WebBrowser from "expo-web-browser"
import { View, StyleSheet, Text } from "react-native"
import { Image } from "expo-image"
import { makeRedirectUri, useAuthRequest } from "expo-auth-session"
import { LinearGradient } from "expo-linear-gradient"

import { get, post } from "../../axios/api"

import { Color, Space } from "styles"
import { Button } from "components"

WebBrowser.maybeCompleteAuthSession()

// Endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
}

const Login = ({ navigation }) => {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "28336657c5194faaa73c9a853e21b536",
      scopes: ["user-read-private", "user-read-email", "user-top-read"],
      // To follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: makeRedirectUri({ native: "exp://192.168.100.3:8081" }),
      // clientSecret: "59777af05842484ab682e0436909159c",
      // extraParams: "?show_dialog=true",
      // show_dialog: true,
    },
    discovery
  )

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params

      // console.log({ params: response.params })

      // const tokenResponse = TokenResponse.fromQueryParams(response.params)

      // console.log({ tokenResponse })

      post("/login", {
        code: code,
        redirectURL: makeRedirectUri({ native: "exp://192.168.100.3:8081" }),
      })
        // post("/user-data", {
        //   token: code,
        // })
        // get("/spotify-auth-url", {
        //   // token: code,
        //   redirectURL: "exp://192.168.100.3:8081",
        // })
        .then((response) => {
          // console.log("access_token", response.data)

          post("/user-data", {
            token: response.data.token,
          })
            .then((response) => {
              console.log("response", response.data)

              navigation.reset({
                index: 0,
                routes: [{ name: "Root" }],
              })
            })
            .catch((error) => {
              console.log("error", error.response.data)
              // console.log("error", JSON.stringify(error, null, 2))
            })

          // if (response?.data?.url)
          //   WebBrowser.openBrowserAsync(response?.data?.url)
        })
        .catch((error) => {
          // console.log("error", error.response.data)
          // console.log("error", JSON.stringify(error, null, 2))
        })
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
