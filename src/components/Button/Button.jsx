import React from "react"
import { Text, Pressable, StyleSheet } from "react-native"

import { Color } from "@Styles"

const Button = ({
  style,
  type = Button.DEFAULT,
  onPress = () => {},
  children,
  ...rest
}) => {
  let color

  switch (type) {
    case Button.DEFAULT:
      color = Color.AZURE_BLUE
      break
    case Button.SECONDARY:
      color = Color.AMETHYST_PURPLE
      break
    case Button.SUCCESS:
      color = Color.SPRING_GREEN
      break
    case Button.WARNING:
      color = Color.ARYLIDE_YELLOW
      break
    case Button.DANGER:
      color = Color.FOLLY_RED
      break
  }

  const baseStyles = customStyles(color)

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed: isPressed }) => [
        style,
        baseStyles.button,
        { backgroundColor: isPressed ? color : Color.RAISIN_BLACK },
        isPressed ? baseStyles.buttonShadow : {},
      ]}
      {...rest}
    >
      {({ pressed: isPressed }) => (
        <Text
          style={[
            baseStyles.text,
            { color: isPressed ? Color.RAISIN_BLACK : Color.GHOST_WHITE },
          ]}
        >
          {children}
        </Text>
      )}
    </Pressable>
  )
}

const customStyles = (color) =>
  StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 15,
      borderWidth: 2,
      borderColor: color,
    },
    buttonShadow: {
      shadowColor: color,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 10,
    },
    text: {
      fontSize: 20,
      fontFamily: "Poppins-Bold",
    },
  })

Button.DEFAULT = "default"
Button.SECONDARY = "secondary"
Button.SUCCESS = "success"
Button.WARNING = "warning"
Button.DANGER = "danger"

export default Button
