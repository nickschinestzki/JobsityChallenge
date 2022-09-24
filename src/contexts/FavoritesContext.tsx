import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

interface FavoritesContextData {
   favorites: number[];
   onAddToFavorites: (showId: number) => Promise<void>;
}

interface FavoritesProviderProps {
   children: ReactNode;
}

const FavoritesContext = createContext({} as FavoritesContextData)

export function useFavorites() {
   const context = useContext(FavoritesContext)

   return context
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
   const [favorites, setFavorites] = useState<number[]>([])

   useEffect(() => {
      const getFavorites = async () => {
         try {
            const value = await AsyncStorage.getItem("favorites")
            if (value)
               setFavorites(JSON.parse(value))
         }
         catch (error) {
            console.error(error)
            Alert.alert("Error getting favorites shows")
         }
      }

      getFavorites()
   }, [])

   const onAddToFavorites = useCallback(async (showId: number) => {
      try {
         let newFavorites;

         // If favorites already has showId, removes it array, if not, adds it.
         if (favorites.includes(showId))
            newFavorites = favorites.filter(f => f !== showId)
         else
            newFavorites = favorites.concat(showId)

         const parsedValue = JSON.stringify(newFavorites)
         await AsyncStorage.setItem("favorites", parsedValue)
         setFavorites(newFavorites)
      } catch (error) {
         console.error(error)
         Alert.alert("Error saving favorite show")
      }
   }, [favorites])

   return (
      <FavoritesContext.Provider value={{ favorites, onAddToFavorites }}>
         {children}
      </FavoritesContext.Provider>
   )
}
