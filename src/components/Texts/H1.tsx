import React from "react"
import { StyleSheet, TextProps, Text } from "react-native"

export function H1({ children, ...rest }: TextProps) {
   return (
      <Text {...rest} style={[sheet.h1, rest.style]} >
         {children}
      </Text>
   )
}

const sheet = StyleSheet.create({
   h1: {
      fontSize: 32,
      color: "#FFF",
      fontWeight: "600",
   }
})