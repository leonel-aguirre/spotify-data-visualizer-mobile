import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import DashboardScreen from "../DashboardScreen/DashboardScreen"
import TopScreen from "../TopScreen/TopScreen"

const Stack = createNativeStackNavigator()

const DashboardNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Top"
        component={TopScreen}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  )
}

export default DashboardNavigator
