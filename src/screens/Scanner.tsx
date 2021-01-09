import React from 'react';
import * as firebase from 'firebase';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useSelector } from 'react-redux';
import { userSelectors } from '../slices/User';

const ScannerStack = createStackNavigator();

function Scanner(): JSX.Element {
  const uid = useSelector(userSelectors.getId);
  const [hasPermission, setHasPermission] = React.useState<boolean | null>(
    null
  );
  const [scanned, setScanned] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = React.useCallback(
    async ({ data }: { data: string }) => {
      setScanned(true);
      try {
        const contactInfo = await firebase
          .database()
          .ref(`user/${data}`)
          .once('value');
        const userInfo = firebase.database().ref(`user/${uid}/contacts/${contactInfo.child('id').val()}/`);
        userInfo.set({
          name: contactInfo.child('name').val(),
          phone: contactInfo.child('phone').val(),
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Err msg: ', error.message);
      }
    },
    [setScanned, uid]
  );

  if (hasPermission === null) {
    return <Text>{'Requesting for camera permission'}</Text>;
  }
  if (hasPermission === false) {
    return <Text>{'No access to camera'}</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{'Scanner'}</Text>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

export default function ProfilNavigator(): JSX.Element {
  return (
    <ScannerStack.Navigator initialRouteName={'Scanner'}>
      <ScannerStack.Screen name={'Scanner'} component={Scanner} />
    </ScannerStack.Navigator>
  );
}
