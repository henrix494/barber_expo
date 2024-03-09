import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Image } from "expo-image";
import React, { useState, useEffect, useContext } from "react";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  FadeIn,
} from "react-native-reanimated";

import img from "../assets/msbs-barbershop-perspective-22000.jpg";
import Greet from "../components/greet/Greetings";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = React.createContext();

export default function App() {
  const [user, setUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const userr = useContext(AuthContext); // use the AuthContext here

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("phoneNumber");
      if (value !== null) {
        setPhoneNumber(value);
      }
    } catch (e) {}
  };
  console.log(phoneNumber);
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  const stylez = useAnimatedStyle(() => {
    const scale = scrollY.value / 1000;
    return {
      transform: [{ translateY: withSpring(scale * 90) }],
    };
  });
  useEffect(() => {
    getData();
    if (phoneNumber) {
      const userData = async () => {
        const data = await fetch(
          "http://10.100.102.4:4000/GetFullUserByPhone",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone: phoneNumber }),
          }
        );
        const res = await data.json();
        try {
          await AsyncStorage.setItem("user", JSON.stringify(res));
        } catch (error) {
          console.log(error);
        }

        const user = await AsyncStorage.getItem("user");
        const toJson = await JSON.parse(user);
        setUser(toJson);
      };

      userData();
    }
  }, [phoneNumber]);
  const resetStorage = async () => {
    try {
      await AsyncStorage.removeItem("phoneNumber");
      await AsyncStorage.removeItem("user");
      setUser("");
    } catch (error) {
      console.log(error);
    }
  };
  const contextValue = useContext(AuthContext);

  return (
    <AuthContext.Provider value={user}>
      <SafeAreaProvider>
        <SafeAreaView>
          <Stack.Screen
            options={{
              title: "יוגב בוקובזה",
              headerTitleAlign: "center",

              header: () => (
                <SafeAreaView>
                  <StatusBar
                    animated={true}
                    style={"light"}
                    backgroundColor="black"
                  />
                  <View
                    style={{
                      height: 50, // use the interpolated value here
                      backgroundColor: "black",
                      width: "100%",
                      borderBottomEndRadius: 24,
                      borderBottomStartRadius: 24,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Animated.Text
                      entering={FadeIn.duration(1000)}
                      style={{ color: "white", fontSize: 20 }}
                    >
                      יוגב בוקובזה
                    </Animated.Text>
                  </View>
                </SafeAreaView>
              ),
            }}
          />

          <Animated.ScrollView style={styles.scroll} onScroll={scrollHandler}>
            <View style={styles.container}>
              <View>
                <Image style={[styles.img]} source={img} />
              </View>
              <Animated.View style={stylez}>
                <Greet />
                <TouchableOpacity
                  onPress={resetStorage}
                  style={{ backgroundColor: "red" }}
                >
                  <Text style={{ color: "black", backgroundColor: "red" }}>
                    יציאה
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Animated.ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 1000,
  },
  img: {
    width: "100%",
    height: 300,
    zIndex: 0,
  },
});
