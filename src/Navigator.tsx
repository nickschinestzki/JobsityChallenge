import React from "react";
import { StyleSheet, View } from "react-native";

import { GRAY_PLACEHOLDER, ORANGE_MAIN } from "styles/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import FeedScreen from "./screens/Feed";
import FavoritesScreen from "screens/Favorites";
import ShowDetailsScreen from "screens/ShowDetails";
import EpisodeDetails from "screens/EpisodeDetails";
import { BlurView } from "@react-native-community/blur";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClapperboard, faHeart, faUsers } from "@fortawesome/free-solid-svg-icons";

export type FeedStackParamList = {
   FeedScreen: undefined;
   ShowDetails: { showId: number };
   EpisodeDetails: {
      showId: number;
      episode: number;
      season: number;
   };
}

export type FavoritesStackParamList = Omit<FeedStackParamList, "FeedScreen"> & {
   FavoritesScreen: undefined;
}

// Creation of navigators
const Tab = createBottomTabNavigator()
const FeedStack = createNativeStackNavigator()
const FavoritesStack = createNativeStackNavigator()
const iconMap: Record<string, IconDefinition> = {
   Feed: faClapperboard,
   Favorites: faHeart,
   People: faUsers,
}

function FeedStackScreen() {
   return (
      <FeedStack.Navigator screenOptions={{ headerShown: false }}>
         <FeedStack.Screen name="FeedScreen" component={FeedScreen as any} />
         <FeedStack.Screen name="ShowDetails" component={ShowDetailsScreen as any} />
         <FeedStack.Screen name="EpisodeDetails" component={EpisodeDetails as any} />
      </FeedStack.Navigator>
   )
}

function FavoritesStackScreen() {
   return (
      <FavoritesStack.Navigator screenOptions={{ headerShown: false }}>
         <FavoritesStack.Screen name="FavoritesScreen" component={FavoritesScreen} />
         <FavoritesStack.Screen name="ShowDetails" component={ShowDetailsScreen} />
         <FavoritesStack.Screen name="EpisodeDetails" component={EpisodeDetails} />
      </FavoritesStack.Navigator>
   )
}


export function Navigator() {
   return (
      <NavigationContainer>
         <Tab.Navigator
            screenOptions={({ route }) => ({
               headerShown: false,
               tabBarShowLabel: false,
               tabBarHideOnKeyboard: true,
               tabBarBackground: () => (
                  <View style={[StyleSheet.absoluteFill, { borderRadius: 32, overflow: "hidden" }]}>
                     <BlurView
                        blurAmount={5}
                        blurType="dark"
                        style={StyleSheet.absoluteFill}
                     />
                  </View>
               ),
               tabBarActiveTintColor: ORANGE_MAIN,
               tabBarInactiveTintColor: GRAY_PLACEHOLDER,
               tabBarStyle: sheet.tabBarStyle,
               tabBarIcon: ({ color }) => (
                  <FontAwesomeIcon
                     size={24}
                     color={color}
                     icon={iconMap[route.name]}
                  />
               ),
            })}
         >
            <Tab.Screen name="Feed" component={FeedStackScreen} />
            <Tab.Screen name="Favorites" component={FavoritesStackScreen} />
         </Tab.Navigator>
      </NavigationContainer>
   )
}


const sheet = StyleSheet.create({

   tabBarStyle: {
      height: 56,
      borderRadius: 32,
      borderTopWidth: 0,
      marginBottom: 8,
      marginHorizontal: 16,
      position: "absolute",
      shadowColor: "transparent",
      backgroundColor: "#bababa91",
   },
})