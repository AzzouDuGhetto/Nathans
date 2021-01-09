import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import QRCodeView from 'react-native-qrcode-svg';
import { useSelector } from 'react-redux';
import { userSelectors } from '../slices/User';

const QRCodeStack = createStackNavigator();

function QRCode(): JSX.Element {
  const uid = useSelector(userSelectors.getId);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{'QR Code'}</Text>
      <QRCodeView
        value={uid}
        size={250}
        backgroundColor={'#F2F2F2'}
      />
    </View>
  );
}

export default function ProfilNavigator(): JSX.Element {
  return (
    <QRCodeStack.Navigator initialRouteName={'QRCode'}>
      <QRCodeStack.Screen name={'QRCode'} component={QRCode} />
    </QRCodeStack.Navigator>
  );
}
