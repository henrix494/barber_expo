import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import PopupModal from "../components/model/Model";
import Animated, { FadeIn } from "react-native-reanimated";
import Icon from "react-native-vector-icons/AntDesign";
import auth from "@react-native-firebase/auth";
import { Link, Stack } from "expo-router";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Page() {
  const [visible, setVisible] = useState(false);

  // firebase auth states
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [error, setError] = useState("");
  const signInWithPhoneNumber = async () => {
    try {
      const isNewUser = await fetch("http://10.100.102.4:4000/getUserByPhone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phoneNumber }),
      });

      if (isNewUser.status === 200) {
        setVisible(true);
        const confirmCode = await auth().signInWithPhoneNumber(
          `+972${phoneNumber}`
        );

        setConfirm(confirmCode);
        setError("");
      } else {
        setError("מספר פלאפון לא קיים במערכת");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const confirmCode = async () => {
    try {
      const userCredential = await confirm.confirm(code);
      const user = userCredential.user;

      if (userCredential) {
        let phoneNUmber = userCredential.user.phoneNumber;
        phoneNUmber = phoneNUmber.replace("+972", "0");
        setVisible(false);
        try {
          await AsyncStorage.setItem("phoneNumber", phoneNUmber);
          console.log("phone number saved");
          router.replace("/");
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log("Invalid code.");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <SafeAreaView>
              <StatusBar
                animated={true}
                style={"light"}
                backgroundColor="black"
              />
              <View
                style={{
                  height: 90, // use the interpolated value here
                  backgroundColor: "black",
                  width: "100%",
                  borderBottomEndRadius: 24,
                  borderBottomStartRadius: 24,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <Link
                  href="/"
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    paddingTop: 30,

                    position: "absolute",
                    left: 15,
                  }}
                >
                  <Icon name="arrowleft" size={24} color="white" />
                </Link>
                <Animated.Text
                  entering={FadeIn.duration(1000)}
                  style={{
                    color: "white",
                    fontSize: 20,
                    paddingTop: 30,
                  }}
                >
                  התחברות
                </Animated.Text>
              </View>
            </SafeAreaView>
          ),
        }}
      />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>הזן מספר פלאפון להתחברות</Text>
          <TextInput
            style={styles.input}
            placeholder="מספר פאלפון"
            keyboardType="phone-pad"
            onChangeText={(text) => setPhoneNumber(text)}
          />
          <TouchableOpacity onPress={signInWithPhoneNumber} style={styles.btn}>
            <Text style={{ color: "white" }}>התחבר</Text>
          </TouchableOpacity>

          {error && (
            <Text style={{ color: "red", marginTop: 50 }}>{error}</Text>
          )}

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Link
              push
              href={"/register"}
              style={{
                marginTop: 60,
                fontWeight: "bold",
                height: 50,
                paddingTop: 15,
              }}
            >
              לחץ להרשמה
            </Link>

            <Text
              style={{
                marginLeft: 30,
                fontWeight: "bold",
                marginTop: 60,
                fontSize: 22,
              }}
            >
              לקוח חדש?
            </Text>
            <PopupModal isVisible={visible}>
              <View style={styles.popUpCOntainer}>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 20,
                    width: 30,
                    height: 30,
                    padding: 5,
                  }}
                  onPress={() => setVisible(false)}
                >
                  <Text style={{ color: "white" }}>X</Text>
                </TouchableOpacity>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <Text style={{ color: "white" }}>הכנס קוד</Text>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: "white",
                      borderRadius: 10,
                      padding: 10,
                      marginTop: 30,
                      width: "70%",
                      color: "white",
                      textAlign: "center",
                    }}
                    keyboardType="number-pad"
                    maxLength={6}
                    onChangeText={(text) => setCode(text)}
                  ></TextInput>
                  <TouchableOpacity
                    onPress={confirmCode}
                    style={{
                      marginTop: 30,
                      padding: 10,
                      borderRadius: 10,
                      alignItems: "center",
                      alignSelf: "center",
                      width: "50%",
                      backgroundColor: "white",
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>אשר</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </PopupModal>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  text: {
    fontSize: 20,
    color: "black",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    marginTop: 30,
    width: "70%",
  },
  btn: {
    marginTop: 30,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    width: "50%",
    backgroundColor: "black",
  },
  containers: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 150,
  },
  popupButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    width: 100,
    height: 50,
  },
  popupContent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: "1px",
    height: 150,
  },
  popUpCOntainer: {
    position: "relative",
    backgroundColor: "black",
    width: 300,
    height: 280,
    borderRadius: 10,
  },
});
