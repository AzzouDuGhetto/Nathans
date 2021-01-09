import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { NavigationContainer } from '@react-navigation/native';
import logger from 'redux-logger';
import { persistConfig, userReducer } from '../slices/User';
import SwitchStack from './SwitchStack';

export default function RootNavigator(): JSX.Element {
  const rootStore = React.useMemo(() => {
    const persistedUserReducer = persistReducer(persistConfig, userReducer);
    const store = configureStore({
      reducer: {
        user: persistedUserReducer,
      },
      middleware: [
        logger,
        ...getDefaultMiddleware({ serializableCheck: false }),
      ],
    });
    const persistor = persistStore(store);
    return { store, persistor };
  }, []);

  return (
    <Provider store={rootStore.store}>
      <PersistGate persistor={rootStore.persistor}>
        <NavigationContainer>
          <SwitchStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
