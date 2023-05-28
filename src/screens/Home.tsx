import React from 'react';
import auth from '@react-native-firebase/auth';
import { View, Text, Pressable } from 'react-native';
import * as Location from 'expo-location';

export default function HomeScreen() {

  const [location, setLocation] = React.useState<Location.LocationObject | null>();
  const [errorMsg, setErrorMsg] = React.useState('');
  const [status, setStatus] = React.useState<Location.PermissionStatus | null>()

  function doLogout() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })(); 
  },[])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Logged with:</Text>
      <Text>{ auth().currentUser?.email }</Text>
      {errorMsg && <Text>{errorMsg}</Text>}
      <Text>Ubicacion { JSON.stringify(location) }</Text>
      <Pressable onPress={doLogout}>
        <Text>Log Out</Text>
      </Pressable>
    </View>
  )
}