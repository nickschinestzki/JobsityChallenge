import React, { useCallback, useEffect, useState } from "react"
import { View, StyleSheet, Text, Alert, Dimensions, Image } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { tvMazeAPI } from "services/tvMaze"
import { ShowWithSeasons } from "types/shows"
import { GRAY_BACKGROUND, GRAY_PLACEHOLDER, ORANGE_DARKEN_2, ORANGE_MAIN } from "styles/colors"
import { FeedStackParamList } from "Navigator"

import FastImage from "react-native-fast-image"
import { ScrollView } from "react-native-gesture-handler"
import { AutoHeightImage } from "@components/AutoHeightImage"
import { H1 } from "@components/Texts/H1"
import { GenreTag } from "@components/Show/GenreTag"
import LinearGradient from "react-native-linear-gradient"
import { Paragraph } from "@components/Texts/Paragraph"
import { convertRTFtoPlainText } from "utils/general"
import { BackButton } from "@components/BackButton"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faTv } from "@fortawesome/free-solid-svg-icons"
import { SeasonsAccordion } from "@components/Show/SeasonsAccordion"
import { FavoriteButton } from "@components/Show/FavoriteButton"

function convertToPlain(rtf: string) {
   rtf = rtf.replace(/\\par[d]?/g, "");
   return rtf.replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, "").trim();
}

type ShowDetailsScreenProps = NativeStackScreenProps<FeedStackParamList, "ShowDetails">
export default function ShowDetailsScreen({ navigation, route }: ShowDetailsScreenProps) {
   const { showId } = route.params
   const [show, setShow] = useState<ShowWithSeasons>()
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      getShowInfo()
   }, [])

   async function getShowInfo() {
      try {
         const result = await tvMazeAPI.get(`/shows/${showId}`, {
            params: { embed: "seasons" }
         })

         setShow(result.data)
      } catch (error) {
         console.error(error)
         Alert.alert("Error obtaining show info")
      }
   }

   const onOpenEpisode = useCallback((ep: number, season: number) => {
      navigation.push("EpisodeDetails", {
         showId, season, episode: ep
      })
   }, [showId])

   return (
      <View style={sheet.container}>
         <BackButton />
         <FavoriteButton showId={showId} />

         <ScrollView style={sheet.container}>
            <View style={sheet.posterContainer}>
               <AutoHeightImage
                  resizeMode="contain"
                  width={Dimensions.get("window").width}
                  source={{ uri: show?.image.original }}
               />
               <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  locations={[0.4, 1]}
                  colors={['rgba(0, 0, 0, 0)', "rgba(0,0,0, 1)"]}
                  style={sheet.posterGradient}
               />
               <View style={sheet.header}>
                  <H1>{show?.name}</H1>
                  <View style={sheet.genresWrapper}>
                     {show?.genres.map(genre => (
                        <GenreTag key={genre} genre={genre} />
                     ))}
                  </View>
               </View>

            </View>
            {show && (
               <View style={sheet.body}>
                  <Paragraph style={sheet.summary}>
                     {convertRTFtoPlainText(show?.summary)}
                  </Paragraph>

                  {!!show.schedule.time && (
                     <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <FontAwesomeIcon
                           size={24}
                           icon={faTv}
                           color={ORANGE_MAIN}
                        />
                        <Paragraph style={sheet.airingInfo}>
                           Airs on {show.schedule.days.join("/")} at {show.schedule.time}
                        </Paragraph>
                     </View>
                  )}

                  <SeasonsAccordion
                     seasons={show._embedded.seasons}
                     onPressEpisode={onOpenEpisode}
                  />
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
   posterContainer: {
      position: "relative",
      paddingBottom: 40,
   },
   posterGradient: {
      top: 0, left: 0, right: 0,
      bottom: 0,
      position: "absolute",
   },
   header: {
      zIndex: 9999,
      paddingHorizontal: 32,
      bottom: 32,
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
   airingInfo: {
      marginLeft: 8,
      fontSize: 16,
      fontWeight: "bold",
      color: GRAY_PLACEHOLDER,
   }
})