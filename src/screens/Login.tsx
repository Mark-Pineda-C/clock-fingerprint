import React from 'react';
import auth from '@react-native-firebase/auth';
import { View, Text, TextInput, Pressable } from 'react-native';
import NeonCircle from '../components/NeonCircle';

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
    <View tw='relative bg-white dark:bg-darkPrimary h-screen flex flex-col items-center justify-center'>
      <View tw={`absolute z-0 top-[-20%] left-[-45%] bg-emerald-600 h-[400px] rounded-full flex justify-center items-center`} style={{aspectRatio: 1}}>
        <View tw={`bg-emerald-600 h-[460px] opacity-75 rounded-full flex justify-center items-center`} style={{aspectRatio: 1}}>
          <View tw={`bg-emerald-600 h-[520px] opacity-50 rounded-full flex justify-center items-center`} style={{aspectRatio: 1}}>
            <View tw={`bg-emerald-600 h-[600px] opacity-25 rounded-full`} style={{aspectRatio: 1}}>
            </View>
          </View>
        </View>
      </View>
      <View tw={`absolute z-0 top-1/3 right-[-20%] bg-blue-800 h-[250px] rounded-full flex justify-center items-center`} style={{aspectRatio: 1}}>
        <View tw={`bg-blue-800 h-[288px] opacity-75 rounded-full flex justify-center items-center`} style={{aspectRatio: 1}}>
          <View tw={`bg-blue-800 h-[325px] opacity-50 rounded-full flex justify-center items-center`} style={{aspectRatio: 1}}>
            <View tw={`bg-blue-800 h-[375px] opacity-25 rounded-full`} style={{aspectRatio: 1}}>
            </View>
          </View>
        </View>
      </View>
      <View tw={`absolute z-0 bottom-0 left-[-50%] bg-red-800 h-[300px] rounded-full flex justify-center items-center`} style={{aspectRatio: 1}}>
        <View tw={`bg-red-800 h-[345px] opacity-75 rounded-full flex justify-center items-center`} style={{aspectRatio: 1}}>
          <View tw={`bg-red-800 h-[390px] opacity-50 rounded-full flex justify-center items-center`} style={{aspectRatio: 1}}>
            <View tw={`bg-red-800 h-[451px] opacity-25 rounded-full`} style={{aspectRatio: 1}}>
            </View>
          </View>
        </View>
      </View>
      <View tw='w-32 h-44 rounded-xl bg-white opacity-20 border border-3 border-white'>
      </View>
      <View tw='relative w-11/12 translate-x-10 bg-white dark:bg-darkSeconday h-60 mt-20' style={{elevation: 10}}>
        <TextInput value={email} onChangeText={setEmail} placeholder='Email...'/>
        <TextInput value={password} onChangeText={setPassword} placeholder='Password...'/>
        <Pressable onPress={doLogin} tw='bg-black dark:bg-white absolute bottom-[-20px] right-[30px] pl-12 pr-10 py-2'>
          <Text tw='text-white dark:text-black uppercase font-bold text-xl'>Ingresar</Text>
        </Pressable>
      </View>
    </View>
  );
}