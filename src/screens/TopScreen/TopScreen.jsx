import React, { useState, useEffect } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native"

import { useAuth } from "../../context/auth"

import { userSelectors, userActions } from "@State"
import { Color, Space } from "@Styles"
import { PieChart } from "@Components"

const { selectUser } = userSelectors
const { fetchUserTop } = userActions

const formatTimeRange = (timeRange) => {
  switch (timeRange) {
    case "short_term":
      return "Short Term"
    case "medium_term":
      return "Mid Term"
    case "long_term":
      return "Long Term"
    case "full_activity":
      return "Full Activity"
    default:
      return ""
  }
}
// TODO: There must be a better way to do this lol.
const formatType = (type) => {
  switch (type) {
    case "artists":
      return "Artists"
    case "tracks":
      return "Tracks"
    case "genres":
      return "Genres"
    default:
      return ""
  }
}

const getTimeText = (timeRange) => {
  switch (timeRange) {
    case "short_term":
      return "4 Weeks"
    case "medium_term":
      return "6 Months"
    case "long_term":
      return "Few Years"
    case "full_activity":
      return "Full Activity"
    default:
      return ""
  }
}

const itemColors = [
  Color.AZURE_BLUE_L20,
  Color.FOLLY_RED_L20,
  Color.SPRING_GREEN_L20,
  Color.ARYLIDE_YELLOW_L20,
  Color.GHOST_WHITE,
  Color.AMETHYST_PURPLE_L20,
]

let lastIndex = Math.floor(Math.random() * itemColors.length)

const TopScreen = () => {
  const dispatch = useDispatch()
  const userData = useSelector(selectUser)
  const { params } = useRoute()
  const { navigate } = useNavigation()
  const { user } = useAuth()
  const [topData, setTopData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { timeRange, type } = params

  const shouldRenderChart = type === "genres" && timeRange === "full_activity"

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const data = await dispatch(
        fetchUserTop(user, userData.userID, type, timeRange)
      )

      if (data) {
        setTopData(data)
        setIsLoading(false)
      } else {
        navigate("Dashboard")
      }
    }

    if (user && userData.userID) {
      fetchData()
    }
  }, [user, userData.userID])

  const renderDataItem = (item) => {
    const value = shouldRenderChart ? item?.genre : item

    let colorIndex = Math.floor(Math.random() * itemColors.length)

    while (colorIndex === lastIndex) {
      colorIndex = Math.floor(Math.random() * itemColors.length)
    }

    lastIndex = colorIndex

    return (
      <Text
        key={value}
        style={[styles.topItemText, { color: itemColors[colorIndex] }]}
      >
        {value}
      </Text>
    )
  }

  const renderResults = () => {
    if (shouldRenderChart) {
      return <PieChart data={topData} />
    }

    return <>{topData?.map((item) => renderDataItem(item))}</>
  }

  const renderMainContent = () => {
    if (isLoading) {
      return (
        <ActivityIndicator
          style={styles.loader}
          color={Color.GHOST_WHITE}
          size="large"
        />
      )
    } else {
      return (
        <>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>
              {`Your ${formatTimeRange(timeRange)} Top ${formatType(type)}`}
            </Text>
            {!shouldRenderChart && (
              <Text style={styles.descriptionSubTitle}>{`(Last ${getTimeText(
                timeRange
              )})`}</Text>
            )}
          </View>

          <View style={styles.spacer} />

          <View style={styles.resultsContainer}>{renderResults()}</View>
        </>
      )
    }
  }

  return <ScrollView style={styles.container}>{renderMainContent()}</ScrollView>
}

const styles = StyleSheet.create({
  loader: { paddingTop: Space.S4 },
  container: {
    flex: 1,
    backgroundColor: Color.RAISIN_BLACK_L,
    padding: Space.S3,
  },
  descriptionContainer: {
    alignItems: "center",
  },
  descriptionTitle: {
    fontFamily: "Poppins-Bold",
    color: Color.GHOST_WHITE,
    fontSize: 22,
  },
  descriptionSubTitle: {
    fontFamily: "Poppins-Bold",
    color: Color.GHOST_WHITE,
    fontSize: 20,
  },
  resultsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    rowGap: Space.S1,
    columnGap: Space.S1,
    paddingBottom: Space.S5,
  },
  topItemText: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
  },
  spacer: {
    marginVertical: Space.S3,
    height: 2,
    backgroundColor: Color.GHOST_WHITE,
  },
})

export default TopScreen
