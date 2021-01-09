import React from 'react';
import * as firebase from 'firebase';
import { StackNavigationProp } from '@react-navigation/stack';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import { userActions, userSelectors } from '../slices/User';
import type { AuthStackType } from '../navigators/AuthStack';

type Props = {
  navigation: StackNavigationProp<AuthStackType>;
};

export default function SignIn({ navigation }: Props): JSX.Element {
  const dispatch = useDispatch();
  const email = useSelector(userSelectors.getEmail);
  const [password, setPassword] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const signIn = React.useCallback(async () => {
    if (!email || !password) return;
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const uid = user.user?.uid;
      const token = await user.user?.getIdToken();
      if (!uid) return;
      const userInfo = await firebase
        .database()
        .ref(`user/${uid}`)
        .once('value');
      dispatch(
        userActions.setUser({
          user: {
            id: uid,
            name: userInfo.child('name').val(),
            phone: userInfo.child('phone').val(),
            picture: userInfo.child('picture').val(),
            email: email,
            token: token,
          },
        })
      );
    } catch (error) {
      setErrorMessage(error.message);
    }
  }, [dispatch, email, password]);

  const goSignUp = React.useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
      <Button title={'Sign In'} onPress={signIn} />
      <Button title={'Create an account'} onPress={goSignUp} />
    </View>
  );
}
