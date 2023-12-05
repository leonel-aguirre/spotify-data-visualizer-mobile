import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Alert, StyleSheet, Text } from "react-native"
import { Image } from "expo-image"
import { useDispatch, useSelector } from "react-redux"

import { Button, ClipboardCopy } from "@Components"
import { Color, Space } from "@Styles"
import { authenticationActions, userSelectors } from "@State"

const { logOut } = authenticationActions
const { selectUser } = userSelectors

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const userData = useSelector(selectUser)

  const { userImageURL, userName, userID } = userData

  const logOutButtonHandler = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          await dispatch(logOut())

          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        },
      },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <Image
        style={styles.userImage}
        source={userImageURL}
        placeholder={require("../../../assets/images/user-image-placeholder.jpg")}
        transition={500}
      />

      <Text style={styles.userNameText}>{userName}</Text>

      <ClipboardCopy
        text={userID}
        labelText="Username:"
        style={styles.clipboardCopy}
        type={ClipboardCopy.SECONDARY}
      />

      <Button
        style={styles.button}
        type={Button.DANGER}
        onPress={logOutButtonHandler}
      >
        Log Out
      </Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.RAISIN_BLACK_L,
    padding: Space.S3,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: "100%",
    borderWidth: 3,
    borderColor: Color.GHOST_WHITE,
  },
  userNameText: {
    color: Color.GHOST_WHITE,
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    marginTop: Space.S2,
  },
  button: {
    marginTop: Space.S5,
  },
  clipboardCopy: {
    width: "100%",
    marginTop: Space.S4,
  },
})

export default ProfileScreen
