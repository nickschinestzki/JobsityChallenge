import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { ORANGE_DARKEN_2 } from "styles/colors";

interface GenreTagProps {
   genre: string;
}
export function GenreTag({ genre }: GenreTagProps) {
   return (
      <View style={sheet.tag}>
         <Text style={sheet.text}>
            {genre}
         </Text>
      </View>
   )
}

const sheet = StyleSheet.create({
   tag: {
      borderRadius: 8,
      paddingVertical: 4,
      paddingHorizontal: 8,
      backgroundColor: ORANGE_DARKEN_2,
      marginRight: 4,
   },
   text: {
      color: "#000",
      fontSize: 14,
      fontWeight: "bold",
      textTransform: 'uppercase',
      // letterSpacing: 1,
   }
})