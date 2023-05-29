import React from 'react';
import auth from '@react-native-firebase/auth';
import { View, Text, Pressable } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

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
      setStatus(status);
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })(); 
  },[])

  return (
    <View className='w-screen h-screen bg-white dark:bg-darkPrimary'>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >

      </MapView>
    </View>
  )
}