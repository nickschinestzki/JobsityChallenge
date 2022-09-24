import React, { useCallback } from "react"
import { View, StyleSheet, Text, Dimensions, Image } from "react-native"

import { GRAY_BACKGROUND } from "styles/colors"
import { interpolate } from 'react-native-reanimated'
import { useFavorites } from "contexts/FavoritesContext"

import { H1 } from "@components/Texts/H1"
import Carousel from 'react-native-reanimated-carousel'
import { SafeAreaView } from "react-native-safe-area-context"
import { FavoriteShowItem } from "@components/Favorites/CarouselItem"
import LinearGradient from "react-native-linear-gradient"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FavoritesStackParamList } from "Navigator"
import { HomeCinemaSVG } from "@components/SVGs/HomeCinema"
import { Paragraph } from "@components/Texts/Paragraph"


const window = Dimensions.get("window")

type RenderFavoritesShowsParams = {
   item: number;
}
type FavoritesScreenProps = NativeStackScreenProps<FavoritesStackParamList, "FavoritesScreen">
export default function FavoritesScreen({ navigation }: FavoritesScreenProps) {
   const { favorites } = useFavorites()

   const renderItem = useCallback(({ item }: RenderFavoritesShowsParams) => {
      return (
         <FavoriteShowItem
            showId={item}
            onPress={() => openFavoriteShow(item)}
         />
      )
   }, [])

   const openFavoriteShow = useCallback((showId: number) => {
      navigation.push("ShowDetails", { showId })
   }, [])

   const animationStyle = React.useCallback(
      (value: number) => {
         'worklet';

         const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
         const rotateZ = `${interpolate(
            value,
            [-1, 0, 1],
            [-10, 0, 10]
         )}deg`;
         const translateX = interpolate(
            value,
            [-1, 0, 1],
            [-240, 0, 240]
         );

         return {
            transform: [{ rotateZ }, { translateX }],
            zIndex,
         };
      },
      []
   );


   return (
      <SafeAreaView style={sheet.container}>
         <LinearGradient
            pointerEvents="none"
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0.5, 1]}
            style={sheet.gradient}
            colors={['rgba(245, 124, 0, 0)', "rgba(245, 124, 0, 1)"]}
         />

         {!!favorites.length ? (
            <Carousel
               loop={false}
               style={sheet.carousel}

               data={favorites}
               width={window.width}
               height={window.height}
               renderItem={renderItem}
               customAnimation={animationStyle}
            />
         ) : (
            <HomeCinemaSVG />
         )}

         <H1 style={{ textAlign: "center", zIndex: 99999 }}>
            Favorites TV Shows
         </H1>

         <Paragraph style={{ marginTop: 24, textAlign: "center", zIndex: 99999 }}>
            The TV Shows you favorite are displayed here.
         </Paragraph>
      </SafeAreaView>
   )
}

const sheet = StyleSheet.create({
   container: {
      flex: 1,
      position: "relative",
      backgroundColor: GRAY_BACKGROUND
   },
   gradient: {
      zIndex: 9999,
      position: 'absolute',
      height: window.height,
      width: window.width,
   },
   carousel: {
      marginTop: 40,
      marginBottom: -240,
      width: window.width,
   },
})