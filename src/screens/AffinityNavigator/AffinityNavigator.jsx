import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import AffinityScreen from "../AffinityScreen/AffinityScreen"
import FriendAffinityScreen from "../FriendAffinityScreen/FriendAffinityScreen"

const Stack = createNativeStackNavigator()

const AffinityNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Affinity"
        component={AffinityScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="FriendAffinity"
        component={FriendAffinityScreen}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  )
}

export default AffinityNavigator
