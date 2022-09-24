import React from "react"
import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from "react-native"

import { FeedStackParamList } from "Navigator"

import { isAndroid } from "utils/general";
import { GRAY_PLACEHOLDER, GRAY_TOUCHABLE, ORANGE_MAIN } from "styles/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { faChevronLeft, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useFavorites } from "contexts/FavoritesContext";

interface FavoriteButtonProps {
   showId: number;
}
export function FavoriteButton({ showId }: FavoriteButtonProps) {
   const insets = useSafeAreaInsets()
   const { favorites, onAddToFavorites } = useFavorites()

   const androidExtraMargin = isAndroid ? 8 : 0

   return (
      <TouchableOpacity
         onPress={() => onAddToFavorites(showId)}
         style={[sheet.container, { top: insets.top + androidExtraMargin }]}
      >
         <FontAwesomeIcon
            size={24}
            icon={faHeart}
            color={favorites.includes(showId) ? ORANGE_MAIN : GRAY_PLACEHOLDER}
         />
      </TouchableOpacity>
   )
}

const sheet = StyleSheet.create({
   container: {
      right: 16,

      width: 48,
      height: 48,
      borderRadius: 8,
      zIndex: 99999,
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: GRAY_TOUCHABLE,
   },
})