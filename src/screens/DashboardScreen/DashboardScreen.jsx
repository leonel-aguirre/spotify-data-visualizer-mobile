import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { StatusBar } from "expo-status-bar"
import { LinearGradient } from "expo-linear-gradient"
import { useSelector } from "react-redux"
import { faMusic, faPalette, faStar } from "@fortawesome/free-solid-svg-icons"

import { Color, Space } from "@Styles"
import {
  ClipboardCopy,
  CollapsibleSection,
  UserTopInformation,
} from "@Components"
import { userSelectors } from "@State"

const { selectUser, selectTopsStatus } = userSelectors

const DashboardScreen = () => {
  const { userID } = useSelector(selectUser)
  const topsStatus = useSelector(selectTopsStatus)

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* <LinearGradient
        colors={[Color.RAISIN_BLACK, Color.AMETHYST_PURPLE_D60]}
        style={styles.idShareContainer}
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
          text={userID}
          style={styles.clipboardCopy}
          type={ClipboardCopy.SECONDARY}
        />
      </LinearGradient> */}

      <CollapsibleSection title="Your Top Artists" icon={faPalette}>
        <UserTopInformation
          data={{
            type: "tracks",
            timeRange: "short_term",
            isCreated: topsStatus.trackShortTerm,
          }}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Your Top Tracks" icon={faMusic}>
        <View style={styles.collapsibleContent}>
          <Text style={styles.collapsibleContentText}>Content</Text>
        </View>
      </CollapsibleSection>

      <CollapsibleSection title="Your Top Genres" icon={faStar}>
        <View style={styles.collapsibleContent}>
          <Text style={styles.collapsibleContentText}>Content</Text>
        </View>
      </CollapsibleSection>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.RAISIN_BLACK_L,
    // padding: Space.S3,
  },
  idShareContainer: {
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
  collapsibleContent: {
    backgroundColor: Color.RAISIN_BLACK,
    padding: Space.S2,
  },
  collapsibleContentText: {
    color: Color.GHOST_WHITE,
    fontFamily: "Poppins-Bold",
    fontSize: 24,
  },
})

export default DashboardScreen
