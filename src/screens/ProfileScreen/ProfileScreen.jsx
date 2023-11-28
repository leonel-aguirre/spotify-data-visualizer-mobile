import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text } from "react-native"
import { Image } from "expo-image"

import { Button } from "@Components"
import { Color, Space } from "@Styles"

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <Image
        style={styles.userImage}
        // TODO: Use user image when available.
        source={"https://cataas.com/cat?width=400&height=400"}
        placeholder={require("../../../assets/images/user-image-placeholder.jpg")}
        transition={500}
      />
      <Text style={styles.userNameText}>User Name</Text>

      <Button style={styles.button} type={Button.DANGER}>
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
})

export default ProfileScreen
