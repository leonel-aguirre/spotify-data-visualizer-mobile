import React, { useEffect, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import {
  faClipboard,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons"
import { setStringAsync } from "expo-clipboard"

import { Color, Space } from "@Styles"

const ClipboardCopy = ({
  text,
  style,
  labelText,
  type = ClipboardCopy.DEFAULT,
}) => {
  const [isCopied, setIsCopied] = useState(false)

  let baseColor
  let pressColor

  switch (type) {
    case ClipboardCopy.DEFAULT:
      baseColor = Color.AZURE_BLUE
      pressColor = Color.AZURE_BLUE_D40
      break
    case ClipboardCopy.SECONDARY:
      baseColor = Color.AMETHYST_PURPLE
      pressColor = Color.AMETHYST_PURPLE_D40

      break
    case ClipboardCopy.SUCCESS:
      baseColor = Color.SPRING_GREEN
      pressColor = Color.SPRING_GREEN_D40

      break
    case ClipboardCopy.WARNING:
      baseColor = Color.ARYLIDE_YELLOW
      pressColor = Color.ARYLIDE_YELLOW_D40

      break
    case ClipboardCopy.DANGER:
      baseColor = Color.FOLLY_RED
      pressColor = Color.FOLLY_RED_D40
      break
  }

  const handleButtonPress = async () => {
    if (!isCopied) {
      await setStringAsync(text)
      setIsCopied(true)
    }
  }

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false)
      }, 5000)
    }
  }, [isCopied])

  const baseStyles = customStyles(baseColor)

  return (
    <View style={[baseStyles.clipboardCopy, style]}>
      <View style={baseStyles.textToCopyContainer}>
        {labelText && <Text style={baseStyles.labelText}>{labelText}</Text>}
        <Text style={baseStyles.textToCopy}>{text}</Text>
      </View>
      <Pressable
        style={({ pressed: isPressed }) => [
          baseStyles.button,
          {
            backgroundColor: isPressed && !isCopied ? pressColor : baseColor,
          },
        ]}
        onPress={handleButtonPress}
      >
        <Text style={baseStyles.buttonText}>
          {isCopied ? "Copied!" : "Copy to Clipboard"}
        </Text>
        <FontAwesomeIcon icon={isCopied ? faClipboardCheck : faClipboard} />
      </Pressable>
    </View>
  )
}

const customStyles = (color) =>
  StyleSheet.create({
    clipboardCopy: {
      borderColor: color,
      borderWidth: 3,
      borderRadius: 20,
    },
    textToCopyContainer: {
      backgroundColor: Color.RAISIN_BLACK,
      borderTopEndRadius: 15,
      borderTopStartRadius: 15,
      padding: Space.S2,
      flexDirection: "row",
      justifyContent: "center",
    },
    labelText: {
      color: Color.GHOST_WHITE,
      fontFamily: "Poppins-Bold",
      textAlign: "center",
      fontSize: 14,
      marginRight: Space.S1,
    },
    textToCopy: {
      fontFamily: "Poppins-Medium",
      color: Color.GHOST_WHITE_D,
      fontSize: 14,
      textAlign: "center",
    },
    button: {
      backgroundColor: color,
      borderBottomEndRadius: 15,
      borderBottomStartRadius: 15,
      padding: Space.S2,
      flexDirection: "row",
      justifyContent: "center",
    },
    buttonText: {
      fontFamily: "Poppins-Bold",
      color: Color.RAISIN_BLACK,
      fontSize: 14,
      textAlign: "center",
      marginRight: Space.S1,
    },
  })

ClipboardCopy.DEFAULT = "default"
ClipboardCopy.SECONDARY = "secondary"
ClipboardCopy.SUCCESS = "success"
ClipboardCopy.WARNING = "warning"
ClipboardCopy.DANGER = "danger"

export default ClipboardCopy
