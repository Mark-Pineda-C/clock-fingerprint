import React from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { View, Text, TextInput, Pressable } from 'react-native';

export default function LoginScreen() {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function doLogin() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account signed in!');
      })
      .catch(error => {
        console.error(error);
      })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Not logged!!</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder='Email...'/>
      <TextInput value={password} onChangeText={setPassword} placeholder='Password...'/>
      <Pressable onPress={doLogin} style={{ marginTop: 15, backgroundColor: 'cyan', paddingHorizontal: 10, paddingVertical: 5}}>
        <Text >Login</Text>
      </Pressable>
    </View>
  );
}