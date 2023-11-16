import * as React from "react"
import * as WebBrowser from "expo-web-browser"
import {
  makeRedirectUri,
  useAuthRequest,
  TokenResponse,
} from "expo-auth-session"
import { Button, View, StyleSheet, Text, Pressable } from "react-native"
import { get, post } from "../../axios/api"
import { LinearGradient } from "expo-linear-gradient"
import { Image } from "expo-image"

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

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["

  return (
    <View
      style={{
        display: "flex",
        flex: 1,
      }}
    >
      <LinearGradient
        // Background Linear Gradient
        colors={["#16161D", "#023277"]}
        style={{
          // width: "100%",
          // height: "100%",
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* <Button
          disabled={!request}
          title="Login"
          onPress={() => {
            promptAsync()
          }}
          style={{ color: "#FFFFFF" }}
        /> */}

        <Image
          style={styles.image}
          source={require("../../../assets/LogoB.png")}
          contentFit="contain"
        />

        <Text
          style={{
            color: "#ffffff",
            fontSize: 24,
            paddingHorizontal: 24,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 12,
            marginBottom: 192,
          }}
        >
          Visualize Your Music, Hear Your Data
        </Text>

        <Pressable
          onPress={() => {
            promptAsync()
          }}
          style={({ pressed: isPressed }) => [
            styles.button,
            { backgroundColor: isPressed ? "#40f99b" : "#16161d" },
            isPressed ? styles.buttonShadow : {},
          ]}
        >
          {({ pressed: isPressed }) => (
            <Text
              style={[
                styles.text,
                { color: isPressed ? "#16161D" : "#ffffff" },
              ]}
            >
              Log In With Spotify
            </Text>
          )}
        </Pressable>

        {/* <Text
          style={{
            color: "#FFFFFF",
            fontSize: 30,
            fontFamily: "Poppins",
          }}
        >
          TEST
        </Text> */}
      </LinearGradient>
      {/* <Button title="Login 2" onPress={handleLoginButton} /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#40f99b",
  },
  buttonShadow: {
    shadowColor: "#40f99b",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    // fontFamily: "Poppins", // FIXME: Add correct font.
  },
  image: {
    width: "80%",
    height: 60,
  },
})

export default Login