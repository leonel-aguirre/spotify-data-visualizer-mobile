import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { useRoute } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faBolt, faFaceFrown } from "@fortawesome/free-solid-svg-icons"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"

import { useAuth } from "../../context/auth"
import { snakeToTitleCase } from "utils"

import { userActions, userSelectors } from "@State"
import { Space, Color } from "@Styles"

const { fetchFriendAffinityData } = userActions
const { selectUser } = userSelectors

const FriendAffinityScreen = () => {
  const dispatch = useDispatch()
  const { params } = useRoute()
  const userData = useSelector(selectUser)
  const [affinityData, setAffinityData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const { friendUserID } = params

  const shouldRenderNoteSection = affinityData?.topsAffinities?.some(
    ({ affinity }) => affinity === null
  )

  const { user } = useAuth()

  useEffect(() => {
    const fetchAffinityData = async () => {
      setIsLoading(true)

      const fetchedData = await dispatch(
        fetchFriendAffinityData(user, userData.userID, friendUserID)
      )

      setAffinityData(fetchedData)
      setIsLoading(false)
    }

    fetchAffinityData()
  }, [user, userData.userID, friendUserID])

  const backButtonHandler = () => {
    push("/user/dashboard")
  }

  const renderTopPercentages = ({ type, range, affinity }) => {
    const shouldRenderIcon = affinity === null
    let bubbleColor = Color.GHOST_WHITE

    if (affinity < 0.4) {
      bubbleColor = Color.FOLLY_RED
    } else if (affinity >= 0.4 && affinity < 0.8) {
      bubbleColor = Color.ARYLIDE_YELLOW
    } else {
      bubbleColor = Color.SPRING_GREEN
    }

    bubbleColor = affinity === null ? Color.GHOST_WHITE : bubbleColor

    return (
      <View key={`top-${type}-${range}`} style={styles.topItemContainer}>
        <View
          style={[styles.percentageBubble, { backgroundColor: bubbleColor }]}
        >
          <Text style={styles.percentageBubbleText}>
            {shouldRenderIcon ? (
              <View style={styles.percentageBubbleIconContainer}>
                <FontAwesomeIcon
                  icon={faFaceFrown}
                  color={Color.RAISIN_BLACK_L}
                  size={24}
                />
              </View>
            ) : (
              `${Math.round(affinity * 100)}%`
            )}
          </Text>
        </View>

        <Text style={styles.rangeText}>{snakeToTitleCase(range)}</Text>
      </View>
    )
  }

  const renderAffinityData = (tops) => {
    if (!tops) {
      return null
    }

    const artistTypeTops = tops?.filter(({ type }) => type === "artists")
    const trackTypeTops = tops?.filter(({ type }) => type === "tracks")
    const genreTypeTops = tops?.filter(({ type }) => type === "genres")

    return (
      <>
        <View style={styles.topsGroup}>
          <View style={styles.topsGroupTitleContainer}>
            <Text style={styles.topsGroupTitle}>Artists</Text>
          </View>
          <View style={styles.topsPercentagesWrapper}>
            {artistTypeTops.map((top) => renderTopPercentages(top))}
          </View>
        </View>
        <View style={styles.topsGroup}>
          <View style={styles.topsGroupTitleContainer}>
            <Text style={styles.topsGroupTitle}>Tracks</Text>
          </View>
          <View style={styles.topsPercentagesWrapper}>
            {trackTypeTops.map((top) => renderTopPercentages(top))}
          </View>
        </View>
        <View style={styles.topsGroup}>
          <View style={styles.topsGroupTitleContainer}>
            <Text style={styles.topsGroupTitle}>Genres</Text>
          </View>
          <View style={styles.topsPercentagesWrapper}>
            {genreTypeTops.map((top) => renderTopPercentages(top))}
          </View>
        </View>
      </>
    )
  }

  const renderMainContent = () => {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.usersNameAndImageWrapper}>
          <View style={styles.userNameAndImage}>
            <Image
              style={styles.userImage}
              source={userData?.userImageURL}
              placeholder={require("../../../assets/images/user-image-placeholder.jpg")}
              transition={500}
            />
            <Text style={styles.userName}>
              {userData?.userName?.split(" ")?.[0]}
            </Text>
          </View>
          <View style={styles.imagesDividerContainer}>
            <FontAwesomeIcon
              icon={faBolt}
              color={Color.GHOST_WHITE}
              size={34}
            />
          </View>
          <View style={styles.userNameAndImage}>
            <Image
              style={styles.userImage}
              source={affinityData?.friendImageURL}
              placeholder={require("../../../assets/images/user-image-placeholder.jpg")}
              transition={500}
            />
            <Text style={styles.userName}>
              {affinityData?.friendUserName?.split(" ")?.[0]}
            </Text>
          </View>
        </View>

        <View style={styles.affinityDataSection}>
          {renderAffinityData(affinityData?.topsAffinities)}
        </View>

        {shouldRenderNoteSection && (
          <View style={styles.noteSection}>
            <Text style={styles.noteText}>
              <Text style={styles.noteLabel}>NOTE: </Text>
              It seems that either you or your friend are missing some top picks
              in certain categories. These missing entries are marked with a sad
              face (
              {<FontAwesomeIcon icon={faFaceFrown} color={Color.GHOST_WHITE} />}
              ). But don't worry! You can easily create and update these missing
              tops to get a more accurate measure of your musical affinity.
              Simply create them from your dashboard and return to this page
              later to see the updated affinity percentage.
            </Text>
          </View>
        )}
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />

      <LinearGradient
        colors={[Color.RAISIN_BLACK, Color.AMETHYST_PURPLE_D60]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Discover Your Musical Affinity</Text>
          <Text style={styles.headerSubTitle}>
            Let the melodies guide your friendship, and enjoy discovering your
            musical affinity on this Friendship Affinity Screen!
          </Text>
        </View>
      </LinearGradient>

      {isLoading ? (
        <ActivityIndicator
          style={styles.loader}
          size={"large"}
          color={Color.GHOST_WHITE}
        />
      ) : (
        renderMainContent()
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
  headerTextContainer: {
    padding: Space.S3,
  },
  headerTitle: {
    color: Color.GHOST_WHITE,
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    textAlign: "center",
  },
  headerSubTitle: {
    color: Color.GHOST_WHITE,
    fontSize: 18,
    marginTop: Space.S2,
    textAlign: "center",
  },
  contentContainer: {
    padding: Space.S3,
  },
  usersNameAndImageWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  userNameAndImage: {
    alignItems: "center",
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: "100%",
    borderColor: Color.GHOST_WHITE,
    borderWidth: 4,
  },
  userName: {
    color: Color.GHOST_WHITE,
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    marginTop: Space.S1,
  },
  imagesDividerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  topsGroup: {
    marginTop: Space.S4,
  },
  topsGroupTitleContainer: {
    borderBottomColor: Color.GHOST_WHITE,
    borderBottomWidth: 5,
  },
  topsGroupTitle: {
    color: Color.GHOST_WHITE,
    fontFamily: "Poppins-Bold",
    fontSize: 22,
  },
  topsPercentagesWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: Space.S2,
  },
  topItemContainer: {
    alignItems: "center",
  },
  percentageBubble: {
    width: 64,
    height: 64,
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  percentageBubbleIconContainer: {
    paddingTop: Space.S1,
  },
  percentageBubbleText: {
    color: Color.RAISIN_BLACK_L,
    fontFamily: "Poppins-Black",
    fontSize: 18,
  },
  rangeText: {
    color: Color.GHOST_WHITE,
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    marginTop: Space.S1,
  },
  noteText: {
    color: Color.GHOST_WHITE,
    fontFamily: "Poppins-Medium",
    textAlign: "justify",
    marginTop: Space.S4,
  },
})

export default FriendAffinityScreen
