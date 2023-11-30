import React, { useEffect, useState } from "react"
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { LinearGradient } from "expo-linear-gradient"
import { useDispatch, useSelector } from "react-redux"
import { faMusic, faPalette, faStar } from "@fortawesome/free-solid-svg-icons"

import { useAuth } from "../../context/auth"

import { Color, Space } from "@Styles"
import {
  ClipboardCopy,
  CollapsibleSection,
  UserTopInformation,
} from "@Components"
import { userSelectors, userActions } from "@State"

const { selectUser, selectTopsStatus } = userSelectors
const { fetchStoredUserTopsStatus } = userActions

const DashboardScreen = () => {
  const dispatch = useDispatch()
  const { userID } = useSelector(selectUser)
  const topsStatus = useSelector(selectTopsStatus)
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await dispatch(fetchStoredUserTopsStatus(user, userID))
      setIsLoading(false)
    }

    if (user && userID) {
      fetchData()
    }
  }, [user, userID])

  return (
    <ScrollView style={styles.container}>
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

      {isLoading ? (
        <ActivityIndicator
          style={styles.loader}
          size={"large"}
          color={Color.GHOST_WHITE}
        />
      ) : (
        <>
          <CollapsibleSection title="Your Top Artists" icon={faPalette}>
            <UserTopInformation
              data={{
                type: "artists",
                timeRange: "short_term",
                isCreated: topsStatus.artistShortTerm,
              }}
            />
            <View style={styles.spacer} />
            <UserTopInformation
              data={{
                type: "artists",
                timeRange: "medium_term",
                isCreated: topsStatus.artistMidTerm,
              }}
            />
            <View style={styles.spacer} />
            <UserTopInformation
              data={{
                type: "artists",
                timeRange: "long_term",
                isCreated: topsStatus.artistLongTerm,
              }}
            />
          </CollapsibleSection>

          <CollapsibleSection title="Your Top Tracks" icon={faMusic}>
            <UserTopInformation
              data={{
                type: "tracks",
                timeRange: "short_term",
                isCreated: topsStatus.trackShortTerm,
              }}
            />
            <View style={styles.spacer} />
            <UserTopInformation
              data={{
                type: "tracks",
                timeRange: "medium_term",
                isCreated: topsStatus.trackMidTerm,
              }}
            />
            <View style={styles.spacer} />
            <UserTopInformation
              data={{
                type: "tracks",
                timeRange: "long_term",
                isCreated: topsStatus.trackLongTerm,
              }}
            />
          </CollapsibleSection>

          <CollapsibleSection title="Your Top Genres" icon={faStar}>
            <UserTopInformation
              data={{
                type: "genres",
                timeRange: "full_activity",
                isCreated: topsStatus.genreFullActivity,
              }}
            />
          </CollapsibleSection>
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loader: { paddingTop: Space.S5 },
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
  spacer: {
    marginHorizontal: Space.S2,
    marginVertical: Space.S3,
    height: 2,
    backgroundColor: Color.GHOST_WHITE,
  },
})

export default DashboardScreen
