import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { Button } from "@Components"

const Home = () => {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const loadToken = async () => {
      const fetchedToken = await AsyncStorage.getItem("token")

      setToken(fetchedToken)
    }

    loadToken()
  }, [])

  console.log("Home Screen", token)

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Test Screen</Text>
      <Button onPress={() => dispatch(setValueA(valueA + 1))}>Press me</Button>
    </View>
  )
}

export default Home
