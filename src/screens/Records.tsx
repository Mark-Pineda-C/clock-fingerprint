import { View, Text, FlatList } from "react-native";
import React from "react";
import { useAuth } from "../utils/AuthContext";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { RecordData } from "../utils/MapUtils";
import ShowRecords from "../components/ShowRecords";

type Records = Omit<RecordData, "excuse" | "salary_reduction">;

const Records = () => {
  const { user } = useAuth();
  const [recordData, setRecords] = React.useState<Records[][]>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const subcriber = firestore()
      .collection("data")
      .where("user_id", "==", user?.id)
      .orderBy("timestamp", "asc")
      .onSnapshot((querySnapshot) => {
        const list: Records[] = [];
        querySnapshot.forEach((documentSnapshot) => {
          list.push(documentSnapshot.data() as Records);
        });
        const pairedList: Records[][] = [];
        const codeMap: { [key: string]: Records[] } = {};
        for (let i = 0; i < list.length; i++) {
          const cur = list[i];
          const code = cur.id.split("_")[0];

          if (codeMap[code]) {
            codeMap[code].push(cur);
            if (codeMap[code].length === 2) {
              pairedList.push(codeMap[code]);
              delete codeMap[code];
            }
          } else {
            codeMap[code] = [cur];
          }
        }
        Object.values(codeMap).forEach((items) => {
          pairedList.push([items[0], {} as Records]);
        });
        setRecords(pairedList);
        setLoading(false);
      });
    return () => subcriber();
  }, []);
  return (
    <View className="w-full h-full">
      <FlatList
        data={recordData}
        renderItem={({ item }) => (
          <ShowRecords item={item} key={item[0].id.split("_")[1]} />
        )}
        // keyExtractor={(item) => item[0].id + (item[1].id || "")}
        ListHeaderComponent={() => (
          <View
            className="flex items-center justify-between w-full flex-row p-3 bg-white"
            style={{ elevation: 5 }}
          >
            <Text
              className="text-center text-lg font-bold flex flex-col items-center flex-1 "
              style={{ borderRightWidth: 2 }}
            >
              Dia
            </Text>
            <Text className="text-center text-lg font-bold flex flex-col items-center flex-1 ">
              Entradas
            </Text>
            <Text className="text-center text-lg font-bold flex flex-col items-center flex-1 ">
              Salidas
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Records;
