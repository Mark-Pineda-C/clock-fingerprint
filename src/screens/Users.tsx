import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import { UserData, formatTextToTime } from "../utils/MapUtils";
import FormInput from "../components/FormInput";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const Users = () => {
  const [newUser, setNewUser] = React.useState({
    salary: 0,
    check_in_hour: "00:00",
    check_out_hour: "00:00",
  } as UserData);
  const [userErrors, setUserErrors] = React.useState(
    {} as { [K in keyof UserData]: string }
  );
  const [passwords, setPasswords] = React.useState({
    set: "",
    confirm: "",
  });

  const emailRef = React.useRef<TextInput>(null);
  const pswdRef = React.useRef<TextInput>(null);
  const pswdCRef = React.useRef<TextInput>(null);
  const nameRef = React.useRef<TextInput>(null);
  const salaryRef = React.useRef<TextInput>(null);
  const checkInRef = React.useRef<TextInput>(null);
  const checkOutRef = React.useRef<TextInput>(null);

  const handleRegister = async () => {
    setUserErrors({} as { [K in keyof UserData]: string });
    console.log(userErrors);
    if (passwords.set === "" || passwords.confirm === "") {
      Alert.alert("Error", "Las contrasenas no pueden estar vacias");
      return;
    }
    if (passwords.set !== passwords.confirm) {
      Alert.alert("Error", "Las contrasenas no coinciden");
      return;
    }
    if (newUser.email === "") {
      setUserErrors({ ...userErrors, email: "El email no puede estar vacio" });
    }
    if (newUser.name === "") {
      setUserErrors({ ...userErrors, name: "El nombre no puede estar vacio" });
    }
    if (newUser.salary == 0) {
      setUserErrors({ ...userErrors, salary: "El salario no puede ser 0" });
    }
    if (newUser.check_in_hour === "") {
      setUserErrors({
        ...userErrors,
        check_in_hour: "La hora de entrada no puede estar vacia",
      });
    }
    if (newUser.check_out_hour === "") {
      setUserErrors({
        ...userErrors,
        check_out_hour: "La hora de salida no puede estar vacia",
      });
    }
    if (newUser.check_in_hour!.length !== 5) {
      setUserErrors({
        ...userErrors,
        check_in_hour: "Formato: XXXX",
      });
    }
    if (newUser.check_out_hour!.length !== 5) {
      setUserErrors({
        ...userErrors,
        check_out_hour: "Formato: XXXX",
      });
    }
    if (Object.values(userErrors).length) return;

    try {
      const cred = await auth().createUserWithEmailAndPassword(
        newUser.email,
        passwords.set
      );
      const userToAdd = {
        ...newUser,
        id: cred.user?.uid,
        for_test: true,
        role: "user",
        lastCheck: "salida",
        location: new firestore.GeoPoint(-11.9948793, -77.021886),
      };
      await firestore().collection("users").doc(cred.user.uid).set(userToAdd);
      console.log("user added");
      setNewUser({
        salary: 0,
        check_in_hour: "00:00",
        check_out_hour: "00:00",
      } as UserData);
      setPasswords({
        set: "",
        confirm: "",
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <View className=" w-full h-full flex flex-col items-center p-8">
      <Text className="text-2xl font-bold">Creacion de usuarios</Text>
      <ScrollView className="w-full flex flex-col gap-5 mt-10">
        <View>
          <FormInput
            name="Email"
            value={newUser.email}
            icon="envelope"
            reference={emailRef}
            onChangeText={(text) => setNewUser({ ...newUser, email: text })}
            onSubmitEditing={() => nameRef.current?.focus()}
            blurOnSubmit={false}
            error={userErrors.email}
            inputMode="email"
            autoCapitalize="none"
          />
        </View>
        <View>
          <FormInput
            name="Nombre"
            value={newUser.name}
            icon="user"
            reference={nameRef}
            onChangeText={(text) => setNewUser({ ...newUser, name: text })}
            onSubmitEditing={() => pswdRef.current?.focus()}
            blurOnSubmit={false}
            error={userErrors.name}
          />
        </View>
        <View>
          <FormInput
            value={passwords.set}
            name="Contrasena"
            icon="lock"
            reference={pswdRef}
            onChangeText={(text) => setPasswords({ ...passwords, set: text })}
            onSubmitEditing={() => pswdCRef.current?.focus()}
            blurOnSubmit={false}
            keyboardType="visible-password"
            autoCapitalize="none"
          />
        </View>
        <View>
          <FormInput
            value={passwords.confirm}
            name="Validar Contrasena"
            icon="lock"
            reference={pswdCRef}
            onChangeText={(text) =>
              setPasswords({ ...passwords, confirm: text })
            }
            onSubmitEditing={() => salaryRef.current?.focus()}
            blurOnSubmit={false}
            keyboardType="visible-password"
            autoCapitalize="none"
          />
        </View>
        <View>
          <FormInput
            name="Salario"
            value={newUser.salary!.toString()}
            icon="money-bill-alt"
            inputMode="numeric"
            reference={salaryRef}
            onChangeText={(text) =>
              setNewUser({
                ...newUser,
                salary: parseInt(text === "" ? "0" : text),
              })
            }
            onSubmitEditing={() => checkInRef.current?.focus()}
            blurOnSubmit={false}
            error={userErrors.salary}
          />
        </View>
        <View>
          <FormInput
            name="Entrada"
            value={newUser.check_in_hour!}
            inputMode="numeric"
            icon="clock"
            reference={checkInRef}
            hintText="formato: XXXX"
            onChangeText={(text) => {
              setNewUser({
                ...newUser,
                check_in_hour: formatTextToTime(text),
              });
            }}
            onSubmitEditing={() => checkOutRef.current?.focus()}
            blurOnSubmit={false}
            maxLength={5}
          />
        </View>
        <View>
          <FormInput
            name="Salida"
            value={newUser.check_out_hour!}
            icon="clock"
            reference={checkOutRef}
            inputMode="numeric"
            hintText="formato: XXXX"
            onChangeText={(text) =>
              setNewUser({ ...newUser, check_out_hour: formatTextToTime(text) })
            }
            onSubmitEditing={() => handleRegister()}
            blurOnSubmit={false}
            maxLength={5}
          />
        </View>
        <View className="w-full flex items-center">
          <Pressable onPress={() => handleRegister()}>
            <Text className="text-white bg-green-500 rounded-lg px-5 py-2">
              Guardar
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default Users;
