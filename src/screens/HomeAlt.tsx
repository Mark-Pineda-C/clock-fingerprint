import { View, Text, Pressable } from "react-native";
import React from "react";
import auth from "@react-native-firebase/auth";
import { useAuth } from "../utils/AuthContext";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { compareTime } from "../utils/MapUtils";
import { FontAwesome5 } from "@expo/vector-icons";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

const HomeAlt = () => {
  const { user } = useAuth();
  const [currentHour, setCurrentHour] = React.useState(new Date().getTime());
  const [checkInTime, setCheckInTime] = React.useState({
    hour: 0,
    minute: 0,
  });
  const [checkOutTime, setCheckOutTime] = React.useState({
    hour: 0,
    minute: 0,
  });
  const [diffHour, setDiffHour] = React.useState("");
  const [isChecking, setIsChecking] = React.useState(false);

  React.useEffect(() => {
    setCheckInTime({
      hour: parseInt(user!.check_in_hour!.split(":")[0]),
      minute: parseInt(user!.check_in_hour!.split(":")[1]),
    });
    setCheckOutTime({
      hour: parseInt(user!.check_out_hour!.split(":")[0]),
      minute: parseInt(user!.check_out_hour!.split(":")[1]),
    });
  }, [user?.check_in_hour, user?.check_out_hour]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getTime());

      const compare = compareTime([checkInTime.hour, checkInTime.minute]);

      setDiffHour(compare.toString());
    }, 1000);

    return () => clearInterval(interval);
  }, [checkInTime.hour, checkInTime.minute]);

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
        if (user.lastCheck === "salida") {
          console.log("Registrando entrada");
          const res = await LocalAuthentication.authenticateAsync();
          console.log(res);
          if (res.success) {
            setIsChecking(false);
            firestore().collection("users").doc(user?.id).update({
              lastCheck: "entrada",
            });
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
          }
          return;
        }
        console.log("Registrando salida");
        const res = await LocalAuthentication.authenticateAsync();
        console.log(res);
        if (res.success) {
          setIsChecking(false);
          firestore().collection("users").doc(user?.id).update({
            lastCheck: "salida",
          });
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
        }
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="w-full h-full relative items-center justify-center flex">
      <View className="absolute top-20 flex flex-col gap-2 items-center">
        <Text className="text-xl font-bold">
          {new Date(currentHour).toLocaleString("es-PE", {
            day: "2-digit",
            month: "long",
          })}
        </Text>
        <Text className="text-4xl font-bold">
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
            : user?.lastCheck !== "entrada"
            ? "bg-emerald-500"
            : "bg-amber-400"
        }  px-5 py-2 z-20 w-8/12 aspect-square flex items-center justify-center rounded-full`}
        onPress={doCheckIn}
      >
        {isChecking ? (
          <FontAwesome5 name="fingerprint" size={50} color="white" />
        ) : user?.lastCheck !== "entrada" ? (
          <Text className="text-white font-bold text-2xl">ENTRADA</Text>
        ) : (
          <Text className="text-white font-bold text-2xl">SALIDA</Text>
        )}
      </Pressable>
      <Pressable
        className="bg-blue-500 px-5 py-2 z-20 w-40 absolute bottom-1/4 right-0"
        onPress={doLogout}
      >
        <Text>Salir</Text>
      </Pressable>
    </View>
  );
};

export default HomeAlt;
