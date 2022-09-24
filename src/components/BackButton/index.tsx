import React from "react"
import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from "react-native"

import { FeedStackParamList } from "Navigator"
import { useNavigation } from "@react-navigation/core"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { GRAY_TOUCHABLE } from "styles/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { isAndroid } from "utils/general";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

interface BackButtonProps {
   onBack?: () => void;
   style?: StyleProp<ViewStyle>;
}

type BackButtonNavProp = NativeStackNavigationProp<FeedStackParamList, "FeedScreen" | "ShowDetails">;

export function BackButton({ onBack, style }: BackButtonProps) {
   const navigation = useNavigation<BackButtonNavProp>()
   const insets = useSafeAreaInsets()

   const androidExtraMargin = isAndroid ? 8 : 0

   const customGoBack = () => {
      if (!!onBack) {
         onBack()
         return
      }
      if (navigation.canGoBack()) {
         navigation.goBack()
      } else {
         navigation.navigate("FeedScreen")
      }
   }

   return (
      <TouchableOpacity
         onPress={customGoBack}
         style={[sheet.container, { top: insets.top + androidExtraMargin }, style]}
      >
         <FontAwesomeIcon
            color="white"
            size={24}
            icon={faChevronLeft}
         />
      </TouchableOpacity>
   )
}

const sheet = StyleSheet.create({
   container: {
      left: 16,

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