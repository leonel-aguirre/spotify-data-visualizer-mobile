import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Alert, Text, View } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faBolt, faUser, faMusic } from "@fortawesome/free-solid-svg-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import ProfileScreen from "../ProfileScreen/ProfileScreen"
import DashboardNavigator from "../DashboardNavigator/DashboardNavigator"
import AffinityNavigator from "../AffinityNavigator/AffinityNavigator"

import { userActions } from "@State"
import { Color } from "@Styles"
import { Header } from "@Components"

const Tab = createBottomTabNavigator()

const { fetchUserData } = userActions

const RootNavigator = () => {
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
        tabBarLabel: ({ children, color, focused }) => {
          let tabBarStyle = { fontSize: 10, fontFamily: "Poppins-Bold" }
          let label = children

          switch (route.name) {
            case "DashboardNavigator":
              tabBarStyle.color = focused ? Color.SPRING_GREEN : color
              label = "Dashboard"
              break
            case "AffinityNavigator":
              tabBarStyle.color = focused ? Color.AZURE_BLUE : color
              label = "Affinity"
              break
            case "Profile":
              tabBarStyle.color = focused ? Color.FOLLY_RED : color
              break
          }

          return <Text style={tabBarStyle}>{label.toUpperCase()}</Text>
        },
        tabBarIcon: ({ color, focused }) => {
          switch (route.name) {
            case "DashboardNavigator":
              return (
                <FontAwesomeIcon
                  color={focused ? Color.SPRING_GREEN : color}
                  icon={faMusic}
                />
              )
            case "AffinityNavigator":
              return (
                <FontAwesomeIcon
                  color={focused ? Color.AZURE_BLUE : color}
                  icon={faBolt}
                />
              )
            case "Profile":
              return (
                <FontAwesomeIcon
                  color={focused ? Color.FOLLY_RED : color}
                  icon={faUser}
                />
              )
          }
        },
        tabBarActiveTintColor: Color.GHOST_WHITE,
        tabBarInactiveTintColor: Color.GHOST_WHITE,
      })}
    >
      <Tab.Screen
        name="DashboardNavigator"
        component={DashboardNavigator}
        options={{ header: () => <Header /> }}
      />
      <Tab.Screen
        name="AffinityNavigator"
        component={AffinityNavigator}
        options={{ header: () => <Header /> }}
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

export default RootNavigator
