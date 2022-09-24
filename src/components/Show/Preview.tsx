import React, { memo } from "react"
import { View, StyleSheet } from "react-native"

import { Show } from "types/shows"

import FastImage from "react-native-fast-image"
import { Text, TouchableOpacity } from "react-native";
import { GRAY_LIGHTEN_1, ORANGE_LIGHTEN_2, ORANGE_LIGHTEN_4, ORANGE_MAIN } from "styles/colors";

interface ShowPreviewProps {
   show: Show;
   isLeftColumn: boolean;
   onPress: () => void;
}
const ShowPreview = ({ show, isLeftColumn, onPress }: ShowPreviewProps) => {
   return (
      <View style={[sheet.container, { marginRight: isLeftColumn ? 16 : 0 }]}>
         <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
            <FastImage
               resizeMode="cover"
               style={sheet.poster}
               source={{ uri: show.image?.medium }}
            />
         </TouchableOpacity>

         <Text style={sheet.showName}>
            {show.name}
         </Text>
      </View>
   )
}

export default memo(ShowPreview)

const sheet = StyleSheet.create({
   container: {
      flex: 1,
      marginBottom: 16,
   },
   poster: {
      height: 200,
      borderRadius: 24,
      marginBottom: 4,

      backgroundColor: ORANGE_LIGHTEN_2,
      shadowColor: ORANGE_MAIN,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 16,
      elevation: 3,
   },
   showName: {
      flex: 1,
      fontSize: 16,
      color: "#cecece",
      fontWeight: "bold",
   }
})