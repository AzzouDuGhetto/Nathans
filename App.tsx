import React from 'react';
import * as firebase from 'firebase';

import RootStack from './src/navigators/RootStack';

const firebaseConfig = {
  apiKey: 'AIzaSyARCdNNwT_gFgbM0s65UXYxQH112fhkOPs',
  authDomain: 'rn1-nathans.firebaseapp.com',
  databaseURL: 'https://rn1-nathans.firebaseio.com',
  projectId: 'rn1-nathans',
  storageBucket: 'rn1-nathans.appspot.com',
  messagingSenderId: '876361402747',
  appId: '1:876361402747:web:bfbf71e867397833f2d5de',
};

firebase.initializeApp(firebaseConfig);

export default function App(): JSX.Element {
  return <RootStack />;
}
