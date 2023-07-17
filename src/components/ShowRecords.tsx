import { View, Text, Pressable } from "react-native";
import React from "react";
import { RecordData } from "../utils/MapUtils";

interface Props {
  item: RecordData[];
}

const ShowRecords = ({ item }: Props) => {
  return (
    <>
      <View className="flex items-center justify-between w-full flex-row p-3">
        <View className="flex flex-col items-center flex-1 ">
          <Text className="text-center px-8 textl-2xl">
            {new Date(item[0].timestamp.toDate()).toLocaleDateString("es-PE", {
              day: "2-digit",
              month: "2-digit",
              weekday: "long",
            })}
          </Text>
        </View>
        {item.map((record) => (
          <Pressable
            className="flex-1 flex-col items-center gap-2"
            disabled={record.is_valid}
            android_ripple={
              !!record && record.is_valid ? { color: "gray" } : {}
            }
            key={
              record.id
                ? record.id.split("_")[1]
                : item[0].id.split("_")[1] + "asd"
            }
          >
            {record.timestamp ? (
              <Text className="text-center">
                {new Date(record.timestamp.toDate()).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }
                )}
              </Text>
            ) : (
              <Text className="text-center">--:-- --</Text>
            )}
            <Text
              className={`w-2/3 text-center ${
                !record.timestamp
                  ? "bg-gray-500"
                  : record.is_valid
                  ? "bg-green-500"
                  : "bg-red-500"
              } rounded-full text-white`}
            >
              {!record.timestamp
                ? "Sin marca"
                : record.is_valid
                ? "Verificado"
                : "Tarde"}
            </Text>
          </Pressable>
        ))}
        {/* {item[1] ? (
          <Pressable
            className="flex-1 flex-col items-center gap-2"
            disabled={!item[1].is_valid}
            android_ripple={
              !item[1].is_valid ? { color: "gray", borderless: true } : {}
            }
          >
            <Text className="text-center">
              {new Date(item[1].timestamp.toDate()).toLocaleTimeString(
                "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }
              )}
            </Text>
            <Text
              className={`w-2/3 text-center ${
                item[1].is_valid ? "bg-green-500" : "bg-red-500"
              } rounded-full text-white`}
            >
              {item[1].is_valid ? "Verificado" : "Tarde"}
            </Text>
          </Pressable>
        ) : (
          <View className="flex-1">
            <Text className="text-center">--:-- --</Text>
          </View>
        )} */}
      </View>
    </>
  );
};

export default ShowRecords;
