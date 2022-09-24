import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, Alert, Dimensions, Image } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { Episode } from "types/shows"
import { tvMazeAPI } from "services/tvMaze"
import { FeedStackParamList } from "Navigator"
import { convertRTFtoPlainText } from "utils/general"
import { GRAY_BACKGROUND, GRAY_PLACEHOLDER, ORANGE_DARKEN_2, ORANGE_MAIN } from "styles/colors"

import { H1 } from "@components/Texts/H1"
import { BackButton } from "@components/BackButton"
import { Paragraph } from "@components/Texts/Paragraph"
import { ScrollView } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"
import { AutoHeightImage } from "@components/AutoHeightImage"

const windowWidth = Dimensions.get("window").width

type EpisodeDetailsScreenProps = NativeStackScreenProps<FeedStackParamList, "EpisodeDetails">
export default function EpisodeDetailsScreen({ navigation, route }: EpisodeDetailsScreenProps) {
   const { showId, season, episode: epNumber } = route.params

   const [episode, setEpisode] = useState<Episode>()
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      getEpisodeInfo()
   }, [])

   async function getEpisodeInfo() {
      try {
         const result = await tvMazeAPI.get(`/shows/${showId}/episodebynumber`, {
            params: { season, number: epNumber }
         })

         setEpisode(result.data)
      } catch (error) {
         console.error(error)
         Alert.alert("Error obtaining show info")
      }
   }

   return (
      <View style={sheet.container}>
         <BackButton />

         <ScrollView style={sheet.container}>
            <View style={{ position: "relative" }}>
               <AutoHeightImage
                  resizeMode="contain"
                  style={{ minHeight: 200 }}
                  width={windowWidth}
                  source={{ uri: episode?.image?.original }}
               />
               <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  locations={[0.4, 1]}
                  colors={['rgba(0, 0, 0, 0)', "rgba(0,0,0, 1)"]}
                  style={sheet.posterGradient}
               />
               <View style={sheet.header}>
                  <H1>{episode?.name}</H1>
                  <Paragraph style={sheet.episodeInfo}>
                     Episode {epNumber} - Season {season}
                  </Paragraph>
               </View>

            </View>
            {episode && (
               <View style={sheet.body}>
                  <Paragraph style={sheet.summary}>
                     {convertRTFtoPlainText(episode?.summary)}
                  </Paragraph>
               </View>
            )}
         </ScrollView>
      </View>
   )
}

const sheet = StyleSheet.create({
   container: {
      flex: 1,
      position: "relative",
      backgroundColor: GRAY_BACKGROUND,
   },
   posterGradient: {
      top: 0, left: 0, right: 0,
      bottom: 0,
      position: "absolute",
   },
   header: {
      zIndex: 9999,
      paddingHorizontal: 32,
      bottom: 16,
      position: "absolute",
   },
   genresWrapper: {
      marginTop: 16,
      flexDirection: "row",
      alignItems: "center",
   },
   body: {
      padding: 32,
      paddingBottom: 120,
   },
   summary: {
      fontStyle: "italic",
      marginBottom: 16,
   },
   episodeInfo: {
      marginTop: 8,
      fontSize: 16,
      fontWeight: "bold",
      color: GRAY_PLACEHOLDER,
   }
})