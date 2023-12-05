import React, { useCallback } from "react"
import { View } from "react-native"
import { Provider } from "react-redux"
import * as SplashScreen from "expo-splash-screen"
import { useFonts } from "expo-font"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { configureStore } from "@reduxjs/toolkit"

import { AuthProvider } from "./src/context/auth"

import { LoginScreen, RootNavigator } from "@Screens"
import reducer from "@State"

const Stack = createNativeStackNavigator()

const store = configureStore({
  reducer,
})

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
    "Poppins-Thin-Italic": require("./assets/fonts/Poppins-ThinItalic.ttf"),
    "Poppins-ExtraLight": require("./assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-ExtraLight-Italic": require("./assets/fonts/Poppins-ExtraLightItalic.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Light-Italic": require("./assets/fonts/Poppins-LightItalic.ttf"),
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Italic": require("./assets/fonts/Poppins-Italic.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Medium-Italic": require("./assets/fonts/Poppins-MediumItalic.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-SemiBold-Italic": require("./assets/fonts/Poppins-SemiBoldItalic.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Bold-Italic": require("./assets/fonts/Poppins-BoldItalic.ttf"),
    "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraBold-Italic": require("./assets/fonts/Poppins-ExtraBoldItalic.ttf"),
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-Black-Italic": require("./assets/fonts/Poppins-BlackItalic.ttf"),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <View
          onLayout={onLayoutRootView}
          style={{
            display: "flex",
            flex: 1,
          }}
        >
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  header: () => null,
                }}
              />
              <Stack.Screen
                name="RootNavigator"
                component={RootNavigator}
                options={{
                  header: () => null,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </AuthProvider>
    </Provider>
  )
}

export default App
