import React, { memo, useCallback, useEffect, useState } from "react"
import { View, StyleSheet, Text, Alert, Dimensions, Image, TouchableOpacity } from "react-native"
import FastImage from "react-native-fast-image";
import { tvMazeAPI } from "services/tvMaze";
import { Show } from "types/shows";

interface FavoriteShowItemProps {
   showId: number;
   onPress: () => void;
}
export const FavoriteShowItem = memo(function FavoriteShowItem({ showId, onPress }: FavoriteShowItemProps) {
   const [show, setShow] = useState<Show>()
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      getShowInfo()
   }, [])

   const getShowInfo = useCallback(async () => {
      try {
         const result = await tvMazeAPI.get(`/shows/${showId}`)
         setShow(result.data)
         setIsLoading(false)
      } catch (error) {
         console.error(error)
         Alert.alert("Error obtaining show info")
      }
   }, [showId])

   return (
      <TouchableOpacity
         onPress={onPress}
         style={sheet.container}
         activeOpacity={0.9}
      >
         <FastImage
            resizeMode="contain"
            style={sheet.poster}
            source={{ uri: show?.image.original }}
         />

         <Text style={sheet.showName}>
            {show?.name}
         </Text>
      </TouchableOpacity>
   )
})

const sheet = StyleSheet.create({
   container: {
      flex: 1,
      width: 240,
      alignSelf: "center",
   },
   poster: {
      height: 300,
      borderRadius: 40,

      shadowColor: "#ffffff36",
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 2,
      elevation: 5,
   },
   showName: {
      marginTop: 16,
      fontSize: 24,
      color: '#FFF',
      fontWeight: 'bold',
      textAlign: "center",
   }
})