import { Text, Keyboard, Pressable } from "react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Motion } from "@legendapp/motion";
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const Tabs = ({ descriptors, navigation, state }: BottomTabBarProps) => {
  const [show, setShow] = React.useState(true);
  Keyboard.addListener("keyboardDidShow", () => {
    setShow(false);
  });
  Keyboard.addListener("keyboardDidHide", () => {
    setShow(true);
  });

  return (
    <Motion.View
      className="flex flex-row w-full items-center bg-white"
      style={{ borderTopEndRadius: 15 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {show &&
        state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? (options.tabBarLabel as string)
              : options.title !== undefined
              ? options.title
              : route.name;
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              className="flex-1 pt-6 pb-2 items-center justify-center"
              android_ripple={{ borderless: true }}
              key={index}
            >
              {label === "MARCAR" ? (
                <FontAwesome5
                  name="user-clock"
                  size={24}
                  color={isFocused ? "#006FFF" : "#78716c"}
                />
              ) : label === "REGISTROS" || label === "REPORTES" ? (
                <MaterialCommunityIcons
                  name="chart-box-outline"
                  size={24}
                  color={isFocused ? "#006FFF" : "#78716c"}
                />
              ) : label === "VALIDACION" ? (
                <MaterialCommunityIcons
                  name="clock-check-outline"
                  size={24}
                  color={isFocused ? "#006FFF" : "#78716c"}
                />
              ) : label === "USUARIOS" ? (
                <FontAwesome5
                  name="user-plus"
                  size={24}
                  color={isFocused ? "#006FFF" : "#78716c"}
                />
              ) : (
                <></>
              )}
              <Text
                className={`${
                  isFocused ? "text-[#006FFF]" : "text-stone-500"
                } text-center mt-2`}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
    </Motion.View>
  );
};

export default Tabs;
