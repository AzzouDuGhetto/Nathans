import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';

import { userActions, userSelectors } from '../slices/User';

const ProfilStack = createStackNavigator();

function Profil(): JSX.Element {
  const dispatch = useDispatch();
  const uid = useSelector(userSelectors.getId);
  const picture = useSelector(userSelectors.getPicture);
  const name = useSelector(userSelectors.getName);
  const [image, setImage] = React.useState(picture);
  const [hasPermission, setHasPermission] = React.useState<boolean | null>(
    null
  );
  const signOut = React.useCallback(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(userActions.flush());
      });
  }, [dispatch]);

  React.useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const updatePicture = async () => {
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const userInfo = firebase.database().ref(`user/${uid}/picture`);

    if (!result.cancelled) {
      await userInfo.set(result.uri);
      dispatch(
        userActions.setPicture({
          picture: result.uri,
        })
      );
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Avatar
        size={'xlarge'}
        rounded={true}
        title={name}
        source={{ uri: image }}
        onPress={updatePicture}
      />
      <Text>{'Profil'}</Text>
      <Button title={'Sign Out'} onPress={signOut} />
    </View>
  );
}

export default function ProfilNavigator(): JSX.Element {
  return (
    <ProfilStack.Navigator initialRouteName={'Profil'}>
      <ProfilStack.Screen name={'Profil'} component={Profil} />
    </ProfilStack.Navigator>
  );
}
