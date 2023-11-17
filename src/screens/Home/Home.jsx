import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useSelector, useDispatch } from "react-redux"

import { Button } from "@Components"
import { testActionsA, selectorsA, selectorsB } from "@State"

const { setValueA } = testActionsA
const { selectValueA } = selectorsA
const { selectUser } = selectorsB

const Home = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const valueA = useSelector(selectValueA)
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
      <Text>{JSON.stringify(user, null, 2)}</Text>
      <Text>{valueA}</Text>
      <Button onPress={() => dispatch(setValueA(valueA + 1))}>Press me</Button>
    </View>
  )
}

export default Home
