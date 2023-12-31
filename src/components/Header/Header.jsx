import React from "react"
import { Pressable, StyleSheet, View } from "react-native"
import { Image } from "expo-image"
import { useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"

import { Color, Space } from "@Styles"
import { userSelectors } from "@State"

const { selectUser } = userSelectors

const Header = () => {
  const { userImageURL } = useSelector(selectUser)
  const { navigate } = useNavigation()

  const handleImagePress = () => {
    navigate("Profile")
  }

  return (
    <View style={styles.header}>
      <Image
        style={styles.logo}
        source={require("../../../assets/icon.png")}
        contentFit="contain"
      />
      <View style={styles.spacer} />
      <Pressable onPress={handleImagePress}>
        <Image
          style={styles.userImage}
          source={userImageURL}
          placeholder={require("../../../assets/images/user-image-placeholder.jpg")}
          transition={500}
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.RAISIN_BLACK,
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: Space.S1,
    paddingTop: Space.S5,
    paddingHorizontal: Space.S1,
  },
  logo: {
    width: 40,
    height: 40,
  },
  spacer: { flex: 1 },
  userImage: {
    width: 35,
    height: 35,
    borderRadius: "100%",
    borderColor: Color.GHOST_WHITE,
    borderWidth: 2,
    marginRight: Space.S1,
  },
})

export default Header
