import React, { useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import Collapsible from "react-native-collapsible"
import {
  faChevronDown,
  faChevronUp,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"

import { Color, Space } from "@Styles"

const CollapsibleSection = ({
  title = "Section title",
  icon = faQuestion,
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const handlePress = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <View style={styles.collapsibleSection}>
      <Pressable style={styles.sectionPressable} onPress={handlePress}>
        <FontAwesomeIcon icon={icon} color={Color.GHOST_WHITE} size={20} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.spacer} />
        <FontAwesomeIcon
          icon={isCollapsed ? faChevronUp : faChevronDown}
          color={Color.GHOST_WHITE}
          size={20}
        />
      </Pressable>
      <Collapsible collapsed={isCollapsed}>{children}</Collapsible>
    </View>
  )
}

const styles = StyleSheet.create({
  collapsibleSection: {},
  sectionPressable: {
    flexDirection: "row",
    backgroundColor: Color.SOLID_BLACK,
    padding: Space.S2,
    alignItems: "center",
  },
  spacer: { flex: 1 },
  title: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: Color.GHOST_WHITE,
    marginLeft: Space.S2,
  },
})

export default CollapsibleSection
