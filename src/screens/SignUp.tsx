import React from 'react';
import * as firebase from 'firebase';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import { userActions, userSelectors } from '../slices/User';
import type { AuthStackType } from '../navigators/AuthStack';

type Props = {
  navigation: StackNavigationProp<AuthStackType>;
};

export default function SignUp({ navigation }: Props): JSX.Element {
  const dispatch = useDispatch();
  const email = useSelector(userSelectors.getEmail);
  const name = useSelector(userSelectors.getName);
  const phone = useSelector(userSelectors.getPhone);
  const [password, setPassword] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const signUp = React.useCallback(async () => {
    if (!email || !password) return;
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const uid = user.user?.uid;
      const token = await user.user?.getIdToken();
      if (!uid) return;
      const userInfo = firebase.database().ref(`user/${uid}`);
      userInfo.set({
        id: uid,
        name: name,
        phone: phone,
      });

      dispatch(
        userActions.setUser({
          user: {
            id: uid,
            name: name,
            phone: phone,
            email: email,
            token: token,
          },
        })
      );
    } catch (error) {
      setErrorMessage(error.message);
    }
  }, [dispatch, name, phone, email, password]);

  const goSignIn = React.useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Input
        placeholder={'Name'}
        value={name}
        onChangeText={(text) => dispatch(userActions.setName({ name: text }))}
        leftIcon={{ type: 'simple-line-icon', name: 'user' }}
      />
      <Input
        placeholder={'Phone Number'}
        value={phone}
        onChangeText={(text) => dispatch(userActions.setPhone({ phone: text }))}
        keyboardType={'phone-pad'}
        leftIcon={{ type: 'simple-line-icon', name: 'screen-smartphone' }}
      />
      <Input
        placeholder={'Email'}
        value={email}
        onChangeText={(text) => dispatch(userActions.setEmail({ email: text }))}
        autoCapitalize={'none'}
        keyboardType={'email-address'}
        leftIcon={{ type: 'simple-line-icon', name: 'envelope' }}
      />
      <Input
        placeholder={'Password'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        leftIcon={{ type: 'simple-line-icon', name: 'lock' }}
        errorMessage={errorMessage}
      />
      <Button title={'Create an account'} onPress={signUp} />
      <Button title={'Already registered ?'} onPress={goSignIn} />
    </View>
  );
}
