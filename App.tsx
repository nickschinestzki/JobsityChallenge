import React from 'react';
import { Navigator } from './src/Navigator';
import { FavoritesProvider } from 'contexts/FavoritesContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
   return (
      <GestureHandlerRootView style={{ flex: 1 }}>
         <FavoritesProvider>
            <Navigator />
         </FavoritesProvider>
      </GestureHandlerRootView>
   );
};
