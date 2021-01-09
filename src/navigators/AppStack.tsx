import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import Profil from '../screens/Profil';
import Contacts from '../screens/Contacts';
import QRCode from '../screens/QRCode';
import Scanner from '../screens/Scanner';

const AppStack = createBottomTabNavigator();

const useTabBarIcon = ({ type, name }: { type: string; name: string }) => {
  return React.useCallback(
    ({ size, color }: { size: number; color: string }): React.ReactNode => (
      <Icon type={type} name={name} size={size} color={color} />
    ),
    [type, name]
  );
};

export default function AppNavigator(): JSX.Element {
  const profilTabBarIcon = useTabBarIcon({
    type: 'simple-line-icon',
    name: 'user',
  });
  const contactsTabBarIcon = useTabBarIcon({
    type: 'simple-line-icon',
    name: 'people',
  });
  const QRCodeTabBarIcon = useTabBarIcon({
    type: 'material-community',
    name: 'qrcode',
  });
  const ScannerTabBarIcon = useTabBarIcon({
    type: 'material-community',
    name: 'qrcode-scan',
  });

  return (
    <AppStack.Navigator
      initialRouteName={'Profil'}
      tabBarOptions={{ showLabel: false }}
    >
      <AppStack.Screen
        name={'Profil'}
        component={Profil}
        options={{ tabBarIcon: profilTabBarIcon }}
      />
      <AppStack.Screen
        name={'Contacts'}
        component={Contacts}
        options={{ tabBarIcon: contactsTabBarIcon, title: 'caca' }}
      />
      <AppStack.Screen
        name={'QRCode'}
        component={QRCode}
        options={{ tabBarIcon: QRCodeTabBarIcon }}
      />
      <AppStack.Screen
        name={'Scanner'}
        component={Scanner}
        options={{ tabBarIcon: ScannerTabBarIcon }}
      />
    </AppStack.Navigator>
  );
}
