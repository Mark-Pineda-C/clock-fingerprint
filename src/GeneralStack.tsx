import { View, Text } from "react-native";
import React from "react";
import { AuthContext } from "./utils/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserData } from "./utils/MapUtils";
import firestore from "@react-native-firebase/firestore";
import CustomTabs from "./components/CustomTabs";
import HomeScreen from "./screens/Home";
import HomeAlt from "./screens/HomeAlt";
import Records from "./screens/Records";
import Reports from "./screens/Reports";
import Users from "./screens/Users";
import Validation from "./screens/Validation";

const Tabs = createBottomTabNavigator();

const GeneralStack = ({ id }: { id: string }) => {
  const [user, setUser] = React.useState<UserData | null>();
  const [loading, setloading] = React.useState(true);
  React.useEffect(() => {
    const userSubscriber = firestore()
      .collection("users")
      .doc(id || "")
      .onSnapshot(
        (querySnapshot) => {
          console.log(querySnapshot.data());
          setUser(querySnapshot.data() as UserData);
          setloading(false);
        },
        (error) => {
          // console.log(error);
        }
      );

    return () => userSubscriber();
  }, []);
  return (
    <>
      {loading ? (
        <View>
          <Text>Cargando...</Text>
        </View>
      ) : (
        <NavigationContainer>
          <AuthContext.Provider value={{ user: user! }}>
            {user!.role === "admin" ? (
              <Tabs.Navigator tabBar={(props) => <CustomTabs {...props} />}>
                <Tabs.Screen
                  name="MARCAR"
                  component={HomeScreen}
                  options={{ headerShown: false }}
                />
                <Tabs.Screen
                  name="VALIDACION"
                  component={Validation}
                  options={{ headerShown: false }}
                />
                <Tabs.Screen
                  name="REPORTES"
                  component={Reports}
                  options={{ headerShown: false }}
                />
                {user!.is_super_admin && (
                  <Tabs.Screen
                    name="USUARIOS"
                    component={Users}
                    options={{ headerShown: false }}
                  />
                )}
              </Tabs.Navigator>
            ) : (
              <Tabs.Navigator tabBar={(props) => <CustomTabs {...props} />}>
                <Tabs.Screen
                  name="MARCAR"
                  component={HomeAlt}
                  options={{ headerShown: false }}
                />
                <Tabs.Screen
                  name="REGISTROS"
                  component={Records}
                  options={{ headerShown: false }}
                />
              </Tabs.Navigator>
            )}
          </AuthContext.Provider>
        </NavigationContainer>
      )}
    </>
  );
};

export default GeneralStack;
