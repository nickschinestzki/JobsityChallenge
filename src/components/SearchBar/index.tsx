import React, { useEffect, useRef, useState } from "react"
import { View, StyleSheet, TextInput } from "react-native"

import { GRAY_LIGHTEN_1, GRAY_PLACEHOLDER, GRAY_TOUCHABLE, ORANGE_LIGHTEN_2, ORANGE_MAIN } from "styles/colors"

import { faSearch, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon as Icon } from "@fortawesome/react-native-fontawesome"


interface SearchBarProps {
   onSearchByText: (text: string) => void;
}
export function SearchBar({ onSearchByText }: SearchBarProps) {
   const isFirstMount = useRef(true)
   const [value, setValue] = useState<string>("")

   useEffect(() => {
      if (isFirstMount.current) {
         isFirstMount.current = false
         return
      }

      const delay = setTimeout(() => {
         onSearchByText(value)
      }, 500)

      return () => clearTimeout(delay)
   }, [value])

   return (
      <View style={sheet.bar}>
         <Icon icon={faSearch} color={ORANGE_MAIN} size={20} />

         <TextInput
            value={value}
            onChangeText={setValue}
            placeholder="Search for TV Shows"
            style={sheet.input}
            clearButtonMode="while-editing"
            selectionColor={ORANGE_MAIN}
            placeholderTextColor={GRAY_PLACEHOLDER}
         />
      </View>
   )
}

const sheet = StyleSheet.create({
   bar: {
      width: "100%",
      paddingHorizontal: 16,
      marginVertical: 32,
      borderRadius: 16,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: GRAY_TOUCHABLE,

      shadowColor: ORANGE_MAIN,
      shadowOpacity: 1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      elevation: 20,
   },
   input: {
      flex: 1,
      color: "#FFF",
      marginHorizontal: 8,
   }
})