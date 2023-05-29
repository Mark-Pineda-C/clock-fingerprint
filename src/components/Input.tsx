import { View, Text, TextInput, Keyboard } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { Motion } from "@legendapp/motion"
import { useColorScheme } from 'nativewind';

interface Props{
  name: string;
  value: string;
  onChange: (text: string) => void;
  error?: string;
  icon?: string;
  reference?: React.RefObject<TextInput>;
  onSubmitEditing?: () => void;
}

const Input = ({name, value, onChange, error, icon, reference, onSubmitEditing}: Props) => {
  const [focus, setFocus] = React.useState(false)
  const {colorScheme} = useColorScheme();
  const input = React.useRef<TextInput>(null);

  const hasValues = () => {
    if(value) return true;
    return false;
  }

  Keyboard.addListener('keyboardDidHide', () => {
    setFocus(false);
    input.current?.blur();
    reference?.current?.blur();
  })

  const submit = () => {
    reference?.current?.blur();
    if(onSubmitEditing) onSubmitEditing();
  }
    
  return (
    <View>
      <View>
        <View className="absolute top-0 left-2">
          <FontAwesome5 
            name={icon} size={24} 
            color={focus 
              ? colorScheme === "light" 
                ? "#006FFF" 
                : "#348CFF" 
              : colorScheme === "light" 
                ? "#000" 
                : error
                  ? "red" 
                  : "#fff"
            } 
          />
        </View>
        <Motion.View
          className="absolute left-10 pointer-events-none"
          animate={{y: hasValues() ? -10 : focus ? -10 : 0}}
          pointerEvents="none"
        >
          <Motion.Text
            animate={{
              fontSize: hasValues()
                ? 12
                : focus 
                  ? 12 
                  : 16, 
              color: focus 
                ? colorScheme === "light" 
                  ? "#006FFF" 
                  : "#348CFF" 
                : colorScheme === "light" 
                  ? "#000" 
                  : error
                    ? "red" 
                    : "#fff"
            }}
          >
            {name}
          </Motion.Text>
        </Motion.View>
        <TextInput 
          ref={reference ?? input}
          value={value} 
          onChangeText={onChange} 
          className='w-full h-8 border-b border-stone-200 pl-10'
          onBlur={() => value === "" ? setFocus(false) : null}
          onFocus={() => setFocus(true)}
          blurOnSubmit={false}
          onSubmitEditing={submit}
        />
        <Motion.View 
          className="absolute bottom-0 left-0 h-0.5 w-full border"
          style={{ borderColor: focus ? colorScheme === "light" ? "#006FFF" : "#348CFF" : error ? "red" : "#000"}}
          animate={{scaleX: hasValues() ? 1 : focus ? 1: 0}}/>
      </View>
      <Text className='text-red-500 text-xs'>{error}</Text> 
    </View>
  )
}

export default Input