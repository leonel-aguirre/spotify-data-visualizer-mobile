import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Alert } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faBolt, faUser, faMusic } from "@fortawesome/free-solid-svg-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { userActions } from "@State"
import { Color } from "@Styles"

import AffinityScreen from "../AffinityScreen/AffinityScreen"
import DashboardScreen from "../DashboardScreen/DashboardScreen"
import ProfileScreen from "../ProfileScreen/ProfileScreen"

const Tab = createBottomTabNavigator()

const { fetchUserData } = userActions

const RootScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchUserData())
      } catch {
        Alert.alert("Oops!", "Something went wrong 😿")
      }
    }

    fetchData()
  }, [])

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: Color.RAISIN_BLACK,
        },
        tabBarIcon: ({ color }) => {
          switch (route.name) {
            case "Dashboard":
              return <FontAwesomeIcon color={color} icon={faMusic} />
            case "Affinity":
              return <FontAwesomeIcon color={color} icon={faBolt} />
            case "Profile":
              return <FontAwesomeIcon color={color} icon={faUser} />
          }
        },
        tabBarActiveTintColor: Color.AMETHYST_PURPLE_L20,
        tabBarInactiveTintColor: Color.GHOST_WHITE,
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          header: () => null,
        }}
      />
      <Tab.Screen
        name="Affinity"
        component={AffinityScreen}
        options={{
          header: () => null,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: () => null,
        }}
      />
    </Tab.Navigator>
  )
}

export default RootScreen
