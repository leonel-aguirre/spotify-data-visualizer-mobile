import React from "react"
import { Text, Pressable, StyleSheet } from "react-native"

import { Colors } from "styles/colors"

const Button = ({
  type = Button.DEFAULT,
  onPress = () => {},
  children,
  ...rest
}) => {
  let color

  switch (type) {
    case Button.DEFAULT:
      color = Colors.AZURE_BLUE
      break
    case Button.SUCCESS:
      color = Colors.SPRING_GREEN
      break
    case Button.WARNING:
      color = Colors.ARYLIDE_YELLOW
      break
    case Button.DANGER:
      color = Colors.FOLLY_RED
      break
  }

  const customStyles = styles(color)

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed: isPressed }) => [
        customStyles.button,
        { backgroundColor: isPressed ? color : Colors.RAISIN_BLACK },
        isPressed ? customStyles.buttonShadow : {},
      ]}
      {...rest}
    >
      {({ pressed: isPressed }) => (
        <Text
          style={[
            customStyles.text,
            { color: isPressed ? Colors.RAISIN_BLACK : Colors.GHOST_WHITE },
          ]}
        >
          {children}
        </Text>
      )}
    </Pressable>
  )
}

const styles = (color) =>
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
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      // fontFamily: "Poppins", // FIXME: Add correct font.
    },
  })

Button.DEFAULT = "default"
Button.SUCCESS = "success"
Button.WARNING = "warning"
Button.DANGER = "danger"

export default Button
