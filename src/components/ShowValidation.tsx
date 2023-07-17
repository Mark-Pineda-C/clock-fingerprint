import { View, Text, Pressable } from "react-native";
import React from "react";
import { RecordData, UserData } from "../utils/MapUtils";
import firestore from "@react-native-firebase/firestore";

const ShowValidation = ({ user_id, timestamp, type }: RecordData) => {
  const [user, setUser] = React.useState<UserData>();

  React.useEffect(() => {
    const fetch = async () => {
      const user = await firestore().collection("users").doc(user_id).get();
      setUser(user.data() as UserData);
    };
    fetch();
  }, []);

  return (
    <View
      className="w-full py-5 px-8 flex bg-white rounded-xl gap-3"
      style={{ elevation: 5 }}
    >
      <View className="w-full flex flex-row items-center justify-between">
        {user ? (
          <Text className="text-lg font-bold">{user!.name}</Text>
        ) : (
          <Text>...</Text>
        )}
        <Text className="text-lg font-bold">
          {new Date(timestamp.toDate()).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </Text>
      </View>
      <View className="w-full flex flex-row items-center justify-between">
        <Text
          className={`font-bold text-md capitalize ${
            type === "entrada" ? "text-green-500" : "text-amber-500"
          }`}
        >
          {type}
        </Text>
        <View className="flex flex-row items-center justify-end gap-2">
          <Pressable android_ripple={{ borderless: true }}>
            <Text className="w-20 text-center rounded-full bg-neutral-500 text-white">
              Detalles
            </Text>
          </Pressable>
          <Pressable android_ripple={{ borderless: true }}>
            <Text className="w-20 text-center rounded-full bg-green-500 text-white">
              Verificar
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ShowValidation;
