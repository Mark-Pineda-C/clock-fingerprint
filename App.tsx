import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import LoginScreen from './src/screens/Login';
import HomeScreen from './src/screens/Home';


const Stack = createNativeStackNavigator();

export default function App() {
  
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>();


  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (initializing) setInitializing(false);
      if(user) {
        setUser(user);
      } else {
        setUser(null);
      }
    } );
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { !user 
            ? <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            : <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
