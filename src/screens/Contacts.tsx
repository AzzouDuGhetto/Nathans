import React from 'react';
import * as firebase from 'firebase';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { ListItem } from 'react-native-elements';

import { userSelectors } from '../slices/User';

const ContactsStack = createStackNavigator();

function Contacts(): JSX.Element {
  const uid = useSelector(userSelectors.getId);
  // const [contactsInfo, setContactsInfo] = React.useState(null);
  const [contacts, setContacts] = React.useState<
    null | { name: string; phone: string }[]
  >(null);

  React.useEffect(() => {
    (async () => {
      const fbContacts = await firebase
        .database()
        .ref(`user/${uid}/contacts/`)
        .once('value');
      setContacts(Object.values(fbContacts.val()));
    })();
  }, [uid]);

  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.phone.toString()}
      renderItem={({ item }) => (
        <ListItem bottomDivider={true}>
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.phone}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      )}
    />
  );
}

export default function ContactsNavigator(): JSX.Element {
  return (
    <ContactsStack.Navigator initialRouteName={'Contacts'}>
      <ContactsStack.Screen name={'Contacts'} component={Contacts} />
    </ContactsStack.Navigator>
  );
}
