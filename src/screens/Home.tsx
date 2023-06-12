import React from 'react';
import auth from '@react-native-firebase/auth';
import { View, Text, Pressable } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Polygon } from 'react-native-maps';
import { useColorScheme } from 'nativewind';
import Svg, { Defs, RadialGradient, Stop, Rect } from "react-native-svg";
import { createMotionComponent } from '@legendapp/motion'
import { isInside } from '../utils/MapUtils';

const MotionSVG = createMotionComponent(Svg)
const MotionStop = createMotionComponent(Stop)

const polygon = [{
    latitude: -12.004639077695442,  
    longitude: -77.09031456317132
  },{
    latitude: -12.005177374028387, 
    longitude: -77.090043907992, 
  },{
    latitude: -12.005459758559862, 
    longitude: -77.09033260684994
  },{
    latitude: -12.004806743881678, 
    longitude: -77.09065739306513 
}]

export default function HomeScreen() {

  const { colorScheme } = useColorScheme();
  const [step, setStep] = React.useState(0);
  const [location, setLocation] = React.useState<Location.LocationObject | null>();
  const [errorMsg, setErrorMsg] = React.useState('');
  const [status, setStatus] = React.useState<Location.PermissionStatus | null>()
  const [inside, setInside] = React.useState(false);

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
  },[Location])

  React.useEffect(() => {
    if(location){
      const value = isInside(location!,polygon);

      if(!value){
        setStep(1)
        setInside(false)
        return;
      }
      setInside(true);
    }
  },[location])

  return (
    <View className='w-screen h-screen bg-white dark:bg-darkPrimary relative flex items-center justify-center'>
      <MotionSVG height="100%" width="100%" className='absolute top-0 z-10'>
        <Defs>
          <RadialGradient
            id="grad"
          >
            <Stop offset="0.5" stopColor={step === 1 ? '#7A0000' : '#007A0C'} stopOpacity="0" />
            <Stop offset="0.65" stopColor={step === 1 ? '#7A0000' : '#007A0C'} stopOpacity="0.25" />
            <Stop offset="1" stopColor={step === 1 ? '#7A0000' : '#007A0C'} stopOpacity="0.5" />
          </RadialGradient>
        </Defs>
        <Rect y="-30%" x="-30%" width="160%" height="160%" fill="url(#grad)" />
      </MotionSVG>
      <MapView
        region={{
          latitude: -12.0050891288016,  
          longitude: -77.09034162868926,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsPointsOfInterest={false}
        showsMyLocationButton={false}
        minZoomLevel={17}
        toolbarEnabled={false}
        scrollEnabled={false}
        rotateEnabled={false}
        zoomEnabled={false}
        showsUserLocation
        className='w-full h-full absolute top-0 z-0'
        userInterfaceStyle="dark"
      >
        <Polygon
          coordinates={polygon}
          strokeWidth={2}
          strokeColor='#16486b'
          fillColor='#16486b33'
        />
      </MapView>
      <Pressable className='bg-red-500 px-5 py-2 rounded-full z-20 disabled:bg-red-300' onPress={() => setStep(step === 1 ? 0 : 1)} disabled={!location}>
        <Text className='text-center text-white'>{ location ? "cambiar" : "cargando" }</Text>
      </Pressable>
      {inside && <Text>Dentro</Text>}
      <Pressable className='bg-blue-500 px-5 py-2 z-20' onPress={doLogout}>
        <Text>Salir</Text>
      </Pressable>
    </View>
  )
}