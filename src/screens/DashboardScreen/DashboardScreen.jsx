import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { LinearGradient } from "expo-linear-gradient"

import { Color, Space } from "@Styles"
import { ClipboardCopy } from "@Components"

const DashboardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <LinearGradient
        colors={[Color.RAISIN_BLACK, Color.AMETHYST_PURPLE_D60]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.shareURITitleText}>
          Share Your Musical Journey with Others!
        </Text>
        <Text style={styles.shareURISubTitleText}>
          Give this user ID to a friend and explore your musical connection!
        </Text>
        <ClipboardCopy
          text="userIDMock"
          style={styles.clipboardCopy}
          type={ClipboardCopy.SECONDARY}
        />
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.RAISIN_BLACK_L,
    padding: Space.S3,
  },
  gradient: {
    padding: Space.S3,
    borderRadius: 20,
  },
  shareURITitleText: {
    color: Color.GHOST_WHITE,
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    textAlign: "center",
  },
  shareURISubTitleText: {
    color: Color.GHOST_WHITE,
    fontSize: 18,
    marginTop: Space.S2,
    textAlign: "center",
  },
  clipboardCopy: {
    marginTop: Space.S3,
  },
})

export default DashboardScreen
