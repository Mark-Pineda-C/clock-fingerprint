import React from 'react';
import auth from '@react-native-firebase/auth';
import { View, Text, Pressable } from 'react-native';

export default function HomeScreen() {

  function doLogout() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Logged with:</Text>
      <Text>{ auth().currentUser?.email }</Text>
      <Pressable onPress={doLogout}>
        <Text>Log Out</Text>
      </Pressable>
    </View>
  )
}