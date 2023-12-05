import React, { useEffect, useState } from "react"
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { useDispatch, useSelector } from "react-redux"
import {
  faMusic,
  faPalette,
  faStar,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { LinearGradient } from "expo-linear-gradient"

import { useAuth } from "../../context/auth"

import { Color, Space } from "@Styles"
import {
  CollapsibleSection,
  UserTopInformation,
  ClipboardCopy,
} from "@Components"
import { userSelectors, userActions, authenticationActions } from "@State"

const { selectUser, selectTopsStatus } = userSelectors
const { fetchStoredUserTopsStatus } = userActions
const { checkUserExist } = authenticationActions

const DashboardScreen = () => {
  const dispatch = useDispatch()
  const userData = useSelector(selectUser)
  const topsStatus = useSelector(selectTopsStatus)
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [shouldShowIDShareSection, setShouldShowIDShareSection] = useState(true)
  const { user } = useAuth()

  const onRefresh = async () => {
    setRefreshing(true)
    await dispatch(fetchStoredUserTopsStatus(user, userData.userID))
    setRefreshing(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await dispatch(checkUserExist(user, userData))
      await dispatch(fetchStoredUserTopsStatus(user, userData.userID))
      setIsLoading(false)
    }

    if (user && userData.userID) {
      fetchData()
    }
  }, [user, userData.userID])

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          tintColor={Color.GHOST_WHITE}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <StatusBar style="light" />

      {shouldShowIDShareSection && (
        <LinearGradient
          colors={[Color.RAISIN_BLACK, Color.AMETHYST_PURPLE_D60]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.idShareTopContainer}>
            <Pressable
              style={styles.idShareCloseButton}
              onPress={() => setShouldShowIDShareSection(false)}
            >
              <FontAwesomeIcon
                color={Color.GHOST_WHITE}
                icon={faTimes}
                size={24}
              />
            </Pressable>
          </View>
          <View style={styles.idShareBottomContainer}>
            <Text style={styles.shareURITitleText}>
              Share Your Musical Journey with Others!
            </Text>
            <Text style={styles.shareURISubTitleText}>
              Give this user ID to a friend and explore your musical connection!
            </Text>
            <ClipboardCopy
              text={userData.userID}
              style={styles.clipboardCopy}
              type={ClipboardCopy.SECONDARY}
            />
          </View>
        </LinearGradient>
      )}

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
  },
  idShareTopContainer: {
    alignItems: "flex-end",
  },
  idShareCloseButton: {
    marginRight: Space.S2,
    marginTop: Space.S2,
  },
  idShareBottomContainer: {
    padding: Space.S3,
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
