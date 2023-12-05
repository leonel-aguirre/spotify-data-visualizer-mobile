import React from "react"
import { StyleSheet, ScrollView, View, Text } from "react-native"
import Chart from "react-native-pie-chart"

import { Color, Space } from "@Styles"

const chartColors = [
  Color.AZURE_BLUE,
  Color.FOLLY_RED,
  Color.SPRING_GREEN,
  Color.ARYLIDE_YELLOW,
  Color.AMETHYST_PURPLE,
]

const PieChart = ({ data }) => {
  const sortedData = data.sort((a, b) => a.value - b.value).reverse()

  const valuesTotal = sortedData.reduce(
    (previous, current) => previous + current.value,
    0
  )

  const formattedValues = sortedData.map(
    (item) => (item.value / valuesTotal) * 100
  )

  const colorSlices = sortedData.map(
    (_item, index) => chartColors[index % chartColors.length]
  )

  const widthAndHeight = 250
  const sliceColor = colorSlices

  const renderItemData = ({ genre }, index) => {
    const value = formattedValues[index]
    const color = colorSlices[index]

    return (
      <Text
        style={[styles.itemText, { color: color }]}
      >{`${genre} %${value.toFixed(1)}`}</Text>
    )
  }

  return (
    <View style={styles.container}>
      <Chart
        widthAndHeight={widthAndHeight}
        series={formattedValues}
        sliceColor={sliceColor}
        coverRadius={0.45}
        coverFill={Color.RAISIN_BLACK_L}
      />
      <View style={styles.itemsContainer}>{data.map(renderItemData)}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  itemsContainer: {
    marginTop: Space.S3,
    justifyContent: "center",
    alignItems: "center",
    rowGap: Space.S1,
    columnGap: Space.S1,
    paddingBottom: Space.S5,
  },
  itemText: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
  },
})

export default PieChart
