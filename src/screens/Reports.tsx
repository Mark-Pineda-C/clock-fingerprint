import React from "react";
import auth from "@react-native-firebase/auth";
import { View, Text, Pressable } from "react-native";
import { Octicons } from "@expo/vector-icons";
const Reports = () => {
  function doLogout() {
    auth()
      .signOut()
      .then(() => console.log("User signed out!"));
  }

  return (
    <View className="w-screen h-screen bg-white relative flex items-center justify-center gap-5">
      <Octicons name="circle-slash" size={200} color="lightgray" />
      <Text>No implementado</Text>
      <Pressable className="bg-blue-300 px-5 py-2 z-20" onPress={doLogout}>
        <Text>Salir</Text>
      </Pressable>
    </View>
  );
};

export default Reports;
