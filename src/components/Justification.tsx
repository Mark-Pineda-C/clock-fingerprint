import { View, Text } from "react-native";
import React from "react";

interface Props {
  name: string;
  timeStamp: number;
  registerType: string;
  message: string;
}

const Justification = ({ name, timeStamp, registerType, message }: Props) => {
  return (
    <View
      className="bg-white w-4/5 flex flex-col items-start p-3 rounded-lg"
      style={{ elevation: 5 }}
    >
      <Text className="text-3xl">{name}</Text>
      <View className="flex justify-between">
        <Text className="text-xl">Hora Registrada:</Text>
        <Text className="text-base">{timeStamp}</Text>
      </View>
      <View className="flex justify-between">
        <Text className="text-xl">Tipo de Registro:</Text>
        <Text className="text-base">{registerType}</Text>
      </View>
      <Text className="text-xl">Justificacion:</Text>
    </View>
  );
};

export default Justification;
