import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from "@react-navigation/native"

import { useAuth } from "../../context/auth"
import Button from "../Button/Button"

import { userSelectors, userActions } from "@State"
import { Color, Space } from "@Styles"

const getLabel = (timeRange) => {
  switch (timeRange) {
    case "short_term":
      return "Short Term"
    case "medium_term":
      return "Mid Term"
    case "long_term":
      return "Long Term"
    case "full_activity":
      return "Full Activity"
  }
}

const { selectUser } = userSelectors
const { createTop } = userActions

const UserTopInformation = ({ data }) => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const userData = useSelector(selectUser)
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const { type, isCreated, timeRange } = data

  const handleViewButton = () => {
    navigate("Top", { type, timeRange })
  }

  const handleCreateUpdateButton = async () => {
    setIsLoading(true)
    await dispatch(createTop(user, userData.userID, type, timeRange))
    setIsLoading(false)
  }

  const renderActionButtons = () => {
    if (isCreated) {
      return (
        <>
          <Button
            style={styles.actionButton}
            type={Button.DEFAULT}
            onPress={handleViewButton}
          >
            View
          </Button>
          <Button
            style={styles.actionButton}
            type={Button.WARNING}
            onPress={handleCreateUpdateButton}
          >
            Update
          </Button>
        </>
      )
    } else {
      return (
        <Button
          style={styles.actionButton}
          type={Button.SUCCESS}
          onPress={handleCreateUpdateButton}
        >
          Create
        </Button>
      )
    }
  }

  const renderStatus = () => {
    if (!isLoading) {
      return (
        <LinearGradient
          colors={
            isCreated
              ? [Color.SPRING_GREEN, Color.SPRING_GREEN_L40]
              : [Color.FOLLY_RED, Color.FOLLY_RED_L40]
          }
          style={styles.status}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.statusText}>
            {isCreated ? "CREATED" : "NOT CREATED"}
          </Text>
        </LinearGradient>
      )
    }

    return <ActivityIndicator size={"small"} color={Color.GHOST_WHITE} />
  }

  return (
    <View style={styles.userTopInformation}>
      <View style={styles.typeAndStatusWrapper}>
        <Text style={styles.timeRange}>{getLabel(timeRange)}</Text>
        <View style={styles.spacer} />
        {renderStatus()}
      </View>
      <View style={styles.buttonGroup}>
        <Text style={styles.actionsText}>Actions:</Text>
        {renderActionButtons()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  userTopInformation: {
    padding: Space.S2,
  },
  typeAndStatusWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeRange: {
    color: Color.GHOST_WHITE,
    fontFamily: "Poppins-Bold",
    fontSize: 20,
  },
  spacer: {
    flex: 1,
  },
  status: {
    paddingVertical: Space.S1,
    paddingHorizontal: Space.S2,
    borderRadius: 20,
    alignItems: "center",
  },
  statusText: {
    color: Color.RAISIN_BLACK,
    fontFamily: "Poppins-Bold",
  },
  buttonGroup: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginTop: Space.S2,
  },
  actionsText: {
    color: Color.GHOST_WHITE,
    fontFamily: "Poppins-Bold",
    fontSize: 20,
  },
  actionButton: {
    width: "100%",
    marginTop: Space.S1,
  },
})

export default UserTopInformation
