import React from "react"
import { StyleSheet, TextProps, Text } from "react-native"

export function Paragraph({ children, ...rest }: TextProps) {
   return (
      <Text {...rest} style={[sheet.p, rest.style]}>
         {children}
      </Text>
   )
}

const sheet = StyleSheet.create({
   p: {
      fontSize: 16,
      color: "#FFF",
   }
})