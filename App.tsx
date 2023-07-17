import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import auth from "@react-native-firebase/auth";
import LoginScreen from "./src/screens/Login";
import GeneralStack from "./src/GeneralStack";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initializing, setInitializing] = React.useState(true);
  const [loggedId, setLoggedId] = React.useState<string | null>();

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (initializing) setInitializing(false);
      if (user) {
        setLoggedId(user.uid);
      } else {
        setLoggedId(null);
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <>
      {!loggedId ? (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <GeneralStack id={loggedId} />
      )}
    </>
  );
}
