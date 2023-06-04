import React from 'react';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';

import {store} from './src/redux/store';
import Navigation from './src/navigation';

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <PaperProvider>
          <Navigation />
        </PaperProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
