import React from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"

import { Color, Space } from "@Styles"

const InputControl = ({
  placeholder = "",
  style,
  value,
  buttonText = "Submit",
  type = InputControl.DEFAULT,
  onChangeText = () => {},
  onButtonPress = () => {},
}) => {
  let baseColor
  let pressColor

  switch (type) {
    case InputControl.DEFAULT:
      baseColor = Color.AZURE_BLUE
      pressColor = Color.AZURE_BLUE_D40
      break
    case InputControl.SECONDARY:
      baseColor = Color.AMETHYST_PURPLE
      pressColor = Color.AMETHYST_PURPLE_D40
      break
    case InputControl.SUCCESS:
      baseColor = Color.SPRING_GREEN
      pressColor = Color.SPRING_GREEN_D40
      break
    case InputControl.WARNING:
      baseColor = Color.ARYLIDE_YELLOW
      pressColor = Color.ARYLIDE_YELLOW_D40
      break
    case InputControl.DANGER:
      baseColor = Color.FOLLY_RED
      pressColor = Color.FOLLY_RED_D40
      break
  }

  const baseStyles = customStyles(baseColor)

  return (
    <View style={[baseStyles.inputControl, style]}>
      <View style={baseStyles.inputTextContainer}>
        <TextInput
          style={baseStyles.inputText}
          value={value}
          onChangeText={(text) => onChangeText(text)}
          placeholder={placeholder}
          placeholderTextColor={Color.GHOST_WHITE_D}
        />
      </View>

      <Pressable
        style={({ pressed: isPressed }) => [
          baseStyles.button,
          {
            backgroundColor: isPressed ? pressColor : baseColor,
          },
        ]}
        onPress={onButtonPress}
      >
        <Text style={baseStyles.buttonText}>{buttonText}</Text>
      </Pressable>
    </View>
  )
}

const customStyles = (color) =>
  StyleSheet.create({
    inputControl: {
      borderColor: color,
      borderWidth: 3,
      borderRadius: 20,
    },
    inputTextContainer: {
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
    inputText: {
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

InputControl.DEFAULT = "default"
InputControl.SECONDARY = "secondary"
InputControl.SUCCESS = "success"
InputControl.WARNING = "warning"
InputControl.DANGER = "danger"

export default InputControl
