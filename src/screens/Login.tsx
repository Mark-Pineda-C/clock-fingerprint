import React from 'react';
import auth from '@react-native-firebase/auth';
import { View, Text, TextInput, Pressable, Keyboard } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useColorScheme } from 'nativewind';
import Input from '../components/Input';

export default function LoginScreen() {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [isLogin, setIsLogin] = React.useState(false);
  const refNext = React.useRef<TextInput>(null);

  const {colorScheme} = useColorScheme();

  /**
   * Funcion para iniciar sesion del usuario
   * 
   * @param email Correo electronico del usuario
   * @param password Contraseña del usuario
   * 
   * @error auth/invalid-email Si el correo electronico no es valido
   * @error auth/user-disabled Si el usuario esta deshabilitado
   * @error auth/user-not-found Si el usuario no existe
   * @error auth/wrong-password Si la contraseña es incorrecta
   * 
   */
  function doLogin() {
    setIsLogin(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setIsLogin(false);
        console.log('User account signed in!');
      })
      .catch(error => {
        setIsLogin(false);
        if(error.code === 'auth/invalid-email') setEmailError("Email invalido");
        if(error.code === 'auth/user-disabled') setEmailError("Usuario deshabilitado");
        if(error.code === 'auth/user-not-found') setEmailError("Usuario no encontrado");
        if(error.code === 'auth/wrong-password') setPasswordError("Contraseña incorrecta");
        console.error(error);
      })
  }

  Keyboard.addListener('keyboardDidShow', () => {
    setEmailError('');
    setPasswordError('');
  })

  return (
    <View className='relative bg-white dark:bg-darkPrimary h-screen flex flex-col items-center justify-center'>
      <View className={`absolute z-0 top-[-20%] left-[-45%] bg-emerald-600 h-[400px] rounded-full flex justify-center items-center`} style={{aspectRatio: 1}}>
        <View className={`bg-emerald-600 h-[460px] opacity-75 rounded-full flex justify-center items-center`} style={{aspectRatio: 1}}>
          <View className={`bg-emerald-600 h-[520px] opacity-50 rounded-full flex justify-center items-center`} style={{aspectRatio: 1}}>
            <View className={`bg-emerald-600 h-[600px] opacity-25 rounded-full`} style={{aspectRatio: 1}}>
            </View>
          </View>
        </View>
      </View>
      <View className={`absolute z-0 top-1/3 right-[-20%] bg-blue-800 h-[250px] rounded-full flex justify-center items-center`} style={{aspectRatio: 1}}>
        <View className={`bg-blue-800 h-[288px] opacity-75 rounded-full flex justify-center items-center`} style={{aspectRatio: 1}}>
          <View className={`bg-blue-800 h-[325px] opacity-50 rounded-full flex justify-center items-center`} style={{aspectRatio: 1}}>
            <View className={`bg-blue-800 h-[375px] opacity-25 rounded-full`} style={{aspectRatio: 1}}>
            </View>
          </View>
        </View>
      </View>
      <View className={`absolute z-0 bottom-0 left-[-50%] bg-red-800 h-[300px] rounded-full flex justify-center items-center`} style={{aspectRatio: 1}}>
        <View className={`bg-red-800 h-[345px] opacity-75 rounded-full flex justify-center items-center`} style={{aspectRatio: 1}}>
          <View className={`bg-red-800 h-[390px] opacity-50 rounded-full flex justify-center items-center`} style={{aspectRatio: 1}}>
            <View className={`bg-red-800 h-[451px] opacity-25 rounded-full`} style={{aspectRatio: 1}}>
            </View>
          </View>
        </View>
      </View>
      <View className='h-44 w-38 border-1 border-neutral-500 rounded-lg overflow-hidden flex items-center justify-center'>
        <BlurView style={{width: 126, height: 174, }} blurType="light" blurAmount={15}>
        </BlurView>
      </View>
      <View className='relative w-11/12 translate-x-10 bg-white dark:bg-darkSeconday h-60 mt-20 p-10 flex flex-col' style={{elevation: 10, gap: 25}} >
        <Input icon="user-alt" name='Correo Electronico' value={email} onChange={setEmail} error={emailError} onSubmitEditing={() => refNext.current?.focus()}/>
        <Input icon="lock" name='Contraseña' value={password} onChange={setPassword} error={passwordError} reference={refNext} onSubmitEditing={doLogin}/>
        <Text className='self-end dark:text-white'>Recuperar Contraseña</Text>
        <Pressable onPress={doLogin} className='bg-black dark:bg-white absolute bottom-[-20px] right-[20px] pl-12 pr-10 py-2'>
          {isLogin 
            ? <Text className='text-white dark:text-black uppercase font-bold text-xl'>Cargando...</Text> 
            : <Text className='text-white dark:text-black uppercase font-bold text-xl'>Ingresar</Text>
          }
        </Pressable>
      </View>
    </View>
  );
}