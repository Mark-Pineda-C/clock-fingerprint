import { View, Text, TextInput, Keyboard, TextInputProps } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Motion } from "@legendapp/motion";
import { useColorScheme } from "nativewind";

interface Props extends TextInputProps {
  name: string;
  value: string;
  error?: string;
  icon?: string;
  reference?: React.RefObject<TextInput>;
  hintText?: string;
}

const FormInput = ({
  name,
  error,
  icon,
  reference,
  hintText,
  ...inputProps
}: Props) => {
  const [focus, setFocus] = React.useState(false);
  const { colorScheme } = useColorScheme();
  const input = React.useRef<TextInput>(null);

  const hasValues = () => {
    if (inputProps.value) return true;
    return false;
  };

  Keyboard.addListener("keyboardDidHide", () => {
    setFocus(false);
    input.current?.blur();
    reference?.current?.blur();
  });

  return (
    <View>
      <View>
        <View className="absolute top-0 left-0 w-10 flex justify-center items-center">
          <FontAwesome5
            name={icon}
            size={24}
            color={focus ? "#006FFF" : error ? "red" : "#000"}
          />
        </View>
        <Motion.View
          className="absolute left-10 pointer-events-none"
          animate={{ y: hasValues() ? -10 : focus ? -10 : 0 }}
          pointerEvents="none"
        >
          <Motion.Text
            animate={{
              fontSize: hasValues() ? 12 : focus ? 12 : 16,
              color: focus ? "#006FFF" : error ? "red" : "#000",
            }}
          >
            {name}
          </Motion.Text>
        </Motion.View>
        <TextInput
          ref={reference ?? input}
          {...inputProps}
          className="w-full h-8 border-b border-stone-200 pl-10"
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
        />
        <Motion.View
          className="absolute bottom-0 left-0 h-0.5 w-full border"
          style={{
            borderColor: focus ? "#006FFF" : error ? "red" : "#000",
          }}
          animate={{ scaleX: hasValues() ? 1 : focus ? 1 : 0 }}
        />
      </View>
      <Text
        className={`${error ? "text-red-500" : "text-neutral-400"} text-xs`}
      >
        {error ? error : hintText}
      </Text>
    </View>
  );
};

export default FormInput;
