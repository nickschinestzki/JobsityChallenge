import React, { useEffect, useState, useCallback, useRef } from "react"
import { View, StyleSheet, Alert, ActivityIndicator, Image } from "react-native"

import { Show } from "types/shows"
import { tvMazeAPI } from "services/tvMaze"
import { FeedStackParamList } from "Navigator"
import { useScrollToTop } from "@react-navigation/native"
import { GRAY_ALTERNATIVE_TOUCHABLE, GRAY_BACKGROUND, ORANGE_MAIN } from "styles/colors"

import { SearchBar } from "@components/SearchBar"
import ShowPreview from "@components/Show/Preview"
import { FlatList } from "react-native-gesture-handler"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import SkeletonContent from "react-native-skeleton-content-nonexpo"

type RenderShowParams = {
   item: Show;
   index: number;
}

type FeedScreenProps = NativeStackScreenProps<FeedStackParamList, "FeedScreen">
export default function FeedScreen({ navigation }: FeedScreenProps) {
   const scrollRef = useRef(null)
   useScrollToTop(scrollRef)

   const [page, setPage] = useState<number>(0)
   const [shows, setShows] = useState<Show[]>([])
   const [isLoading, setIsLoading] = useState(true)
   const [isSearchingByText, setIsSearchingByText] = useState(false)

   useEffect(() => {
      getShows(0)
   }, [])

   const getShows = useCallback(async (nextPage: number, concat = true) => {
      try {
         const result = await tvMazeAPI.get("/shows", {
            params: { page: nextPage }
         })

         const resultedShows = result.data as Show[]
         const resultedGenres: string[] = []

         setShows(prevState => {
            if (concat)
               return prevState.concat(resultedShows)
            else
               return resultedShows
         })
         setPage(nextPage)
         setIsLoading(false)
      } catch (error) {
         console.error(error)
         Alert.alert("Error fetching TV Shows data.", "Please check your connection and try again.")
      }
   }, [shows])


   const getMoreShows = useCallback(async (nextPage: number) => {
      if (!isLoading) {
         setIsLoading(true)
         console.log("get more")
         await getShows(nextPage)
      }
   }, [isLoading])

   const onSearchShowsByText = useCallback(async (text: string) => {
      try {
         setIsLoading(true)
         setShows([])

         // If has text, activate "searching by text" mode
         if (!!text) {
            setIsSearchingByText(true)
            const { data } = await tvMazeAPI.get("/search/shows", {
               params: { q: text }
            })
            const resultedShows = data.map((r: any) => r.show) as Show[]

            if (!resultedShows.length) {
               Alert.alert("No TV Show founded.")
               setShows([])
               return
            }

            setShows(resultedShows)
         } else {
            setIsSearchingByText(false)
            getShows(0, false)
         }

      } catch (error) {
         console.error(error)
         Alert.alert("Error while searching for shows by text")
      } finally { setIsLoading(false) }
   }, [])

   const formatData = useCallback((data: Show[]) => {
      // If data length is odd, add one hidden element
      if (data.length % 2 !== 0) {
         data.push({ isHidden: true } as any)
         return data
      } else return data
   }, [])

   const renderListHeader = useCallback(() => {
      return (
         <>
            <Image
               style={sheet.logo}
               resizeMode="contain"
               source={require("../../assets/img/JFLIX.png")}
            />

            <SearchBar onSearchByText={onSearchShowsByText} />
         </>
      )
   }, [])

   const renderShow = useCallback(({ item, index }: RenderShowParams) => {
      if (!item.isHidden)
         return (
            <ShowPreview
               show={item}
               isLeftColumn={index % 2 === 0}
               onPress={() => openShowDetails(item.id)}
               key={item.id + "_" + item.name + "_" + index}
            />
         )
      else return <View style={sheet.hiddenItem} />
   }, [])

   const renderListFooter = useCallback(() => {
      return (isLoading && shows.length > 0) ? (
         <ActivityIndicator
            size="large"
            color={ORANGE_MAIN}
            style={{ alignSelf: "center", marginVertical: 120 }}
         />
      ) : null
   }, [isLoading, shows])

   const renderLoader = useCallback(() => {
      return isLoading ? (
         <SkeletonContent
            isLoading={true}
            containerStyle={{ flex: 1 }}
            boneColor={GRAY_ALTERNATIVE_TOUCHABLE}
            highlightColor="#404040"
            layout={[
               {
                  flexDirection: "row", marginBottom: 16, children: [
                     { height: 200, flex: 1, borderRadius: 24, marginRight: 16 },
                     { height: 200, flex: 1, borderRadius: 24 },
                  ]
               },
               {
                  flexDirection: "row", children: [
                     { height: 200, flex: 1, borderRadius: 24, marginRight: 16 },
                     { height: 200, flex: 1, borderRadius: 24 },
                  ]
               },
            ]}
         />
      ) : null
   }, [isLoading])

   const onEndReached = useCallback(() => {
      if (!isSearchingByText)
         getMoreShows(page + 1)
   }, [page, isSearchingByText])

   const openShowDetails = useCallback((showId: number) => {
      navigation.push("ShowDetails", { showId })
   }, [])

   return (
      <View style={sheet.container}>
         <FlatList
            ref={scrollRef}
            data={formatData(shows)}

            // Pagination
            onEndReachedThreshold={0.1}
            onEndReached={onEndReached}

            // Renders
            renderItem={renderShow}
            ListHeaderComponent={renderListHeader}
            ListEmptyComponent={renderLoader}
            ListFooterComponent={renderListFooter}

            // Styling
            numColumns={2}
            style={{ flex: 1 }}
            contentContainerStyle={sheet.content}
         />
      </View>
   )
}

const sheet = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: GRAY_BACKGROUND
   },
   content: {
      paddingTop: 32,
      paddingHorizontal: 32,
      paddingBottom: 160,
   },
   logo: {
      height: 60,
      width: 120,
   },
   hiddenItem: {
      flex: 1,
   }
})