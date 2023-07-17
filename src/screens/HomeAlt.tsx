import { View, Text, Pressable } from "react-native";
import React from "react";
import auth from "@react-native-firebase/auth";
import { useAuth } from "../utils/AuthContext";
import * as LocalAuthentication from "expo-local-authentication";
import * as Location from "expo-location";
import { compareTime, isInside } from "../utils/MapUtils";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import MapView, { Marker, Polygon } from "react-native-maps";
import { BlurView } from "@react-native-community/blur";

const polygon = [
  { latitude: -12.098783254840741, longitude: -77.01958123978042 },
  { latitude: -12.099319575578393, longitude: -77.01889948239894 },
  { latitude: -12.099231703892842, longitude: -77.01974858022861 },
  { latitude: -12.098886276986844, longitude: -77.0198818328077 },
];

const HomeAlt = () => {
  const { user } = useAuth();
  const [currentHour, setCurrentHour] = React.useState(new Date().getTime());
  const [inside, setInside] = React.useState(false);
  const [location, setLocation] =
    React.useState<Location.LocationObject | null>();
  const [errorMsg, setErrorMsg] = React.useState("");
  const [whereIAm, setWhereIAm] = React.useState("");
  const [status, setStatus] =
    React.useState<Location.PermissionStatus | null>();

  const [isChecking, setIsChecking] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setStatus(status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
    const interval = setInterval(() => {
      setCurrentHour(new Date().getTime());

      if (location && polygon) {
        const isInsidePolygon = isInside(location, polygon);
        setWhereIAm(isInsidePolygon ? "inside" : "outside");
        console.log(isInsidePolygon ? "inside" : "outside");
        isInsidePolygon ? setInside(true) : setInside(false);
      }

      const compare = compareTime([
        parseInt(user?.check_in_hour!.split(":")[0]!),
        parseInt(user?.check_in_hour!.split(":")[1]!),
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const doLogout = () => {
    console.log("doLogout");
    auth()
      .signOut()
      .then(() => console.log("User signed out!"));
  };

  const doCheckIn = async () => {
    setIsChecking(true);
    try {
      if (user?.for_test) {
        const newDoc = firestore().collection("data").doc();
        const today = new Date(currentHour)
          .toLocaleString("es-PE", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          })
          .split("/")
          .join("-");
        const newToAdd = today + "_" + newDoc.id;
        if (user.lastCheck.type === "salida") {
          console.log("Registrando entrada");
          const res = await LocalAuthentication.authenticateAsync();
          console.log(res);
          if (res.success) {
            setIsChecking(false);
            firestore()
              .collection("data")
              .doc(newToAdd)
              .set({
                type: "entrada",
                timestamp: new Date(currentHour),
                id: newToAdd,
                user_id: user?.id,
                is_valid: false,
              });
            firestore()
              .collection("users")
              .doc(user?.id)
              .update({
                lastCheck: {
                  type: "entrada",
                  timestamp: new Date(currentHour),
                },
              });
          }
          return;
        }
        console.log("Registrando salida");
        const res = await LocalAuthentication.authenticateAsync();
        console.log(res);
        if (res.success) {
          setIsChecking(false);
          firestore()
            .collection("data")
            .doc(newToAdd)
            .set({
              type: "salida",
              timestamp: new Date(currentHour),
              id: newToAdd,
              user_id: user?.id,
              is_valid: false,
            });
          firestore()
            .collection("users")
            .doc(user?.id)
            .update({
              lastCheck: {
                type: "salida",
                timestamp: new Date(currentHour),
              },
            });
        }
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="w-full h-full relative items-center justify-center flex">
      <MapView
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
        minZoomLevel={15}
        maxZoomLevel={15}
        zoomTapEnabled={false}
        moveOnMarkerPress={false}
        // customMapStyle={}
        rotateEnabled={false}
        scrollEnabled={false}
        pitchEnabled={false}
        toolbarEnabled={false}
        loadingEnabled
        region={{
          latitude: user?.location.latitude!,
          longitude: user?.location.longitude!,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Polygon coordinates={polygon} strokeWidth={1} fillColor="lightblue" />
        {location && (
          <Marker
            coordinate={{
              latitude: location?.coords.latitude!,
              longitude: location?.coords.longitude!,
            }}
          />
        )}
      </MapView>
      <View
        className="absolute top-20 flex flex-col gap-2 items-center pb-3 pr-3 rounded-xl border border-neutral-300"
        style={{ backgroundColor: "#ffffffbb" }}
      >
        <Text className="text-xl font-bold text-center">
          {new Date(currentHour).toLocaleString("es-PE", {
            day: "2-digit",
            month: "long",
          })}
        </Text>
        <Text className="text-4xl font-bold w-full text-center">
          {new Date(currentHour).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </Text>
      </View>
      <Pressable
        className={`${
          isChecking
            ? "bg-blue-500"
            : user?.lastCheck.type === "entrada"
            ? "bg-emerald-500"
            : "bg-amber-400"
        }  px-5 py-2 z-20 w-8/12 aspect-square flex items-center justify-center rounded-full`}
        onPress={doCheckIn}
      >
        {isChecking ? (
          <FontAwesome5 name="fingerprint" size={50} color="white" />
        ) : user?.lastCheck.type === "entrada" ? (
          <Text className="text-white font-bold text-2xl">ENTRADA</Text>
        ) : (
          <Text className="text-white font-bold text-2xl">SALIDA</Text>
        )}
      </Pressable>
      <Pressable
        className="bg-blue-500 p-4 rounded-full z-20 absolute top-5 right-5"
        style={{ elevation: 10 }}
        onPress={doLogout}
      >
        <FontAwesome name="sign-out" size={20} color="white" />
      </Pressable>
    </View>
  );
};

export default HomeAlt;
