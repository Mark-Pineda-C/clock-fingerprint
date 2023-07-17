import { View, Text, FlatList } from "react-native";
import React from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { RecordData } from "../utils/MapUtils";
import ShowValidation from "../components/ShowValidation";

const Validation = () => {
  const [records, setRecords] = React.useState<RecordData[]>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const subcriber = firestore()
      .collection("data")
      .where("is_valid", "==", false)
      .onSnapshot((querySnapshot) => {
        const list: RecordData[] = [];
        querySnapshot.forEach((documentSnapshot) => {
          list.push(documentSnapshot.data() as RecordData);
        });
        setRecords(list);
        setLoading(false);
      });
    return () => subcriber();
  }, []);

  return (
    <View className="w-screen h-screen p-5 flex-1">
      {records && (
        <FlatList
          data={records}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ShowValidation {...item} />}
          contentContainerStyle={{ padding: 10, gap: 10 }}
          fadingEdgeLength={50}
          className="w-full h-full"
        />
      )}
    </View>
  );
};

export default Validation;
