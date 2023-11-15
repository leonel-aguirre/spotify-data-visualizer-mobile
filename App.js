import * as React from "react"
import * as WebBrowser from "expo-web-browser"
import {
  makeRedirectUri,
  useAuthRequest,
  TokenResponse,
} from "expo-auth-session"
import { Button, View } from "react-native"
import { get, post } from "./src/axios/api"

WebBrowser.maybeCompleteAuthSession()

// Endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
}

export default function App() {
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
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync()
        }}
      />

      {/* <Button title="Login 2" onPress={handleLoginButton} /> */}
    </View>
  )
}
