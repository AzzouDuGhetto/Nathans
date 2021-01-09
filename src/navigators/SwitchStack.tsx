import * as React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { userSelectors } from '../slices/User';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const SwitchStack = createStackNavigator();

export default function SwitchNavigator(): JSX.Element {
  const isLogged = useSelector(userSelectors.isLogged);

  return (
    <SwitchStack.Navigator screenOptions={{ headerShown: false }}>
      {isLogged ? (
        <SwitchStack.Screen
          name={'AppStack'}
          component={AppStack}
          options={{
            animationTypeForReplace: 'push',
          }}
        />
      ) : (
        <SwitchStack.Screen
          name={'AuthStack'}
          component={AuthStack}
          options={{
            animationTypeForReplace: 'pop',
          }}
        />
      )}
    </SwitchStack.Navigator>
  );
}
