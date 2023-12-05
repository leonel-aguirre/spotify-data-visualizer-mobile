import React, { useEffect, useState } from "react"
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { StatusBar } from "expo-status-bar"
import { LinearGradient } from "expo-linear-gradient"
import { Image } from "expo-image"

import { useAuth } from "../../context/auth"

import { InputControl, Button } from "@Components"
import { Color, Space } from "@Styles"
import { userSelectors, userActions } from "@State"

const { selectUser } = userSelectors
const { fetchUserFriends, fetchFriendAffinityData } = userActions

const AffinityScreen = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [userFriends, setUserFriends] = useState([])
  const [friendUserIDText, setFriendUserIDText] = useState("")
  const userData = useSelector(selectUser)
  const { user } = useAuth()

  const fetchFriendsList = async () => {
    setIsLoading(true)
    const fetchedData = await dispatch(fetchUserFriends(user, userData.userID))
    setIsLoading(false)

    setUserFriends(fetchedData?.userFriends || [])
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchFriendsList()
    }

    if (user && userData.userID) {
      fetchData()
    }
  }, [user, userData.userID])

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchFriendsList()
    setRefreshing(false)
  }

  const handleSubmitButtonPress = async () => {
    setIsLoading(true)
    await dispatch(
      fetchFriendAffinityData(user, userData.userID, friendUserIDText)
    )
    setFriendUserIDText("")

    await fetchFriendsList()
    setIsLoading(false)
  }

  const renderFriendRow = (friend, index) => {
    const { userID, userImageURL, userName } = friend

    return (
      <>
        {index !== 0 && <View style={styles.spacer} />}
        <View key={userID} style={styles.friendRow}>
          <View style={styles.friendImageAndNameContainer}>
            <Image
              style={styles.userImage}
              source={userImageURL}
              placeholder={require("../../../assets/images/user-image-placeholder.jpg")}
              transition={500}
            />
            <Text style={styles.friendUserName}>{userName}</Text>
          </View>

          <Button
            style={styles.friendRowButton}
            type={Button.WARNING}
            // onClick={() => push(`/user/affinity/${userID}`)}
          >
            View Affinity
          </Button>
        </View>
      </>
    )
  }

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

      <LinearGradient
        colors={[Color.RAISIN_BLACK, Color.ARYLIDE_YELLOW_D60]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.idShareBottomContainer}>
          <Text style={styles.shareURITitleText}>
            Share Your Musical Journey with Others!
          </Text>
          <Text style={styles.shareURISubTitleText}>
            Submit a friend's user ID and explore your musical connection!
          </Text>
          <InputControl
            placeholder="Enter a friend's user ID"
            style={styles.inputControl}
            type={InputControl.WARNING}
            value={friendUserIDText}
            onChangeText={(text) => setFriendUserIDText(text)}
            onButtonPress={handleSubmitButtonPress}
          />
        </View>
      </LinearGradient>

      {isLoading ? (
        <ActivityIndicator
          style={styles.loader}
          size={"large"}
          color={Color.GHOST_WHITE}
        />
      ) : (
        <View style={styles.contentContainer}>
          <Text style={styles.friendsListText}>
            {userFriends.length === 0
              ? "Oops, it looks like you don't have friends yet... 😿"
              : "Your List of Friends"}
          </Text>
          <View style={styles.friendsListContainer}>
            {userFriends.map((friend, index) => renderFriendRow(friend, index))}
          </View>
        </View>
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
  inputControl: {
    marginTop: Space.S3,
  },
  contentContainer: {
    padding: Space.S3,
  },
  friendsListContainer: {
    marginTop: Space.S3,
  },
  friendsListText: {
    color: Color.GHOST_WHITE,
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: "100%",
    borderColor: Color.GHOST_WHITE,
    borderWidth: 2,
    marginRight: Space.S2,
  },
  friendImageAndNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Space.S2,
  },
  friendUserName: {
    color: Color.GHOST_WHITE,
    fontFamily: "Poppins-Bold",
    fontSize: 20,
  },
  spacer: {
    marginHorizontal: Space.S2,
    marginVertical: Space.S4,
    height: 2,
    backgroundColor: Color.GHOST_WHITE,
  },
})

export default AffinityScreen
