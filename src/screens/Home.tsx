import React from 'react';
import auth from '@react-native-firebase/auth';
import { View, Text, Pressable } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Polygon } from 'react-native-maps';
import { useColorScheme } from 'nativewind';
import Svg, { Defs, RadialGradient, Stop, Rect } from "react-native-svg";

export default function HomeScreen() {

  const { colorScheme } = useColorScheme();
  const [color, setColor] = React.useState("#007A0C");
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
      <Svg height="100%" width="100%" className='absolute top-0 z-50'>
        <Defs>
          <RadialGradient
            id="grad"
          >
            <Stop offset="0.5" stopColor={color} stopOpacity="0" />
            <Stop offset="0.65" stopColor={color} stopOpacity="0.25" />
            <Stop offset="1" stopColor={color} stopOpacity="0.5" />
          </RadialGradient>
        </Defs>
        <Rect y="-30%" x="-30%" width="160%" height="160%" fill="url(#grad)" />
      </Svg>
      <MapView
        region={{
          latitude: -12.093482934627227, 
          longitude: -77.03397478119528,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsPointsOfInterest={false}
        showsMyLocationButton={false}
        minZoomLevel={16}
        toolbarEnabled={false}
        scrollEnabled={false}
        rotateEnabled={false}
        zoomEnabled={false}
        showsUserLocation
        className='w-full h-full'
        userInterfaceStyle="dark"
      >
        <Polygon
          coordinates={[{
              latitude: -12.092609637516395, 
              longitude: -77.0344468570595
            },{
              latitude: -12.092447453453252, 
              longitude: -77.03352822294532
            },{
              latitude: -12.094480984975945,
              longitude: -77.03317097634536
            },{
              latitude: -12.0940193871527, 
              longitude: -77.03486789769516
            }
          ]}
          strokeWidth={2}
          strokeColor='#16486b'
          fillColor='#16486b33'
        />
      </MapView>
    </View>
  )
}