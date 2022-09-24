import React, { useState } from "react"
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"

import { Season } from "types/shows"
import { GRAY_ALTERNATIVE_TOUCHABLE, GRAY_TOUCHABLE, ORANGE_DARKEN_2 } from "styles/colors";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown, faChevronUp, faEye } from "@fortawesome/free-solid-svg-icons";

interface SeasonsAccordionProps {
   seasons: Season[];
   onPressEpisode: (ep: number, season: number) => void;
}
export function SeasonsAccordion({ seasons, onPressEpisode }: SeasonsAccordionProps) {
   const [activeSeason, setActiveSeason] = useState(-1)

   function onChangeActiveSeason(newActiveSeason: number) {
      setActiveSeason(newActiveSeason === activeSeason ? -1 : newActiveSeason)
   }

   return (
      <View style={sheet.container}>
         {seasons.map((season, index) => {
            return (
               <View key={"season_" + season.number}>
                  <TouchableOpacity
                     style={[
                        sheet.seasonItem,
                        index % 2 === 0 && { backgroundColor: GRAY_ALTERNATIVE_TOUCHABLE }
                     ]}
                     onPress={() => onChangeActiveSeason(season.number)}
                  >
                     <Text style={sheet.seasonItemTitle}>
                        Season {season.number}
                     </Text>

                     <FontAwesomeIcon
                        size={18}
                        color="#FFF"
                        icon={activeSeason === season.number ? faChevronUp : faChevronDown}
                     />
                  </TouchableOpacity>

                  {activeSeason === season.number && Array(season.episodeOrder).fill(0).map((ep, i) => {
                     return (
                        <TouchableOpacity
                           style={sheet.episodeItem}
                           key={"season_" + season.number + "_episode_" + (i + 1)}
                           onPress={() => onPressEpisode(i + 1, season.number)}
                        >
                           <Text style={sheet.episodeItemTitle}>
                              Episode {i + 1}
                           </Text>

                           <FontAwesomeIcon
                              size={16}
                              color="#FFF"
                              icon={faEye}
                           />
                        </TouchableOpacity>
                     )
                  })}
               </View>
            )
         })}
      </View>
   )
}

const sheet = StyleSheet.create({
   container: {
      marginTop: 24,
      borderRadius: 16,
      backgroundColor: GRAY_TOUCHABLE,
      overflow: "hidden",
   },
   seasonItem: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: GRAY_TOUCHABLE,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
   },
   seasonItemTitle: {
      fontSize: 18,
      color: '#FFF',
      fontWeight: 'bold',
   },
   episodeItem: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: "#101010",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomColor: "#515151",
      borderBottomWidth: 1,
      borderStyle: "solid",
   },
   episodeItemTitle: {
      fontSize: 16,
      color: '#FFF',
      fontWeight: 'bold',
   }
})