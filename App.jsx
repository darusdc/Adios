import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import 'react-native-gesture-handler'
import MainNavigation from './src/navigation/MainNavigation'
import { productCartAmountReducer } from './src/store/redux/reducers/ProductCartAmountReducer'
import { productFilterReducer } from './src/store/redux/reducers/productFilterReducer';
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import { userLoginIdReducer } from './src/store/redux/reducers/UserLoginIdReducer';

const rootReducer = combineReducers({
  userLoginIdReducer,
  productCartAmountReducer,
  productFilterReducer
});

const store = configureStore({
reducer: rootReducer,
})

const App = () => {
  return ( 
    <Provider store={store}>
      <SafeAreaProvider>
        <MainNavigation/>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;