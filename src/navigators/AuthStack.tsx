import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

export type AuthStackType = {
  SignIn: undefined;
  SignUp: undefined;
};

const AuthStack = createStackNavigator();

export default function AuthNavigator(): JSX.Element {
  return (
    <AuthStack.Navigator
      initialRouteName={'SignIn'}
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name={'SignIn'} component={SignIn} />
      <AuthStack.Screen name={'SignUp'} component={SignUp} />
    </AuthStack.Navigator>
  );
}
