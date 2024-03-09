import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../app/index";

export default function Greet() {
  const [appointments, setappointments] = useState([]);
  const navigation = useNavigation();
  const user = useContext(AuthContext);
  useEffect(() => {
    if (user?.barber_appointments) {
      setappointments(user.barber_appointments);
    }
  }, [user]);
  console.log(appointments);
  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.text, styles.marginTop]}>
          <Text style={styles.innerText}>
            {user ? `שלום ${user.name},` : "שלום אורח"}
          </Text>{" "}
          ברוך הבא!
        </Text>
      </View>
      <View>
        {user ? (
          <View>
            {appointments.length > 0 && (
              <Text style={styles.text}>
                יש לך {appointments.length} תורים מוזמנים
              </Text>
            )}

            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => navigation.navigate("book")}
            >
              <Text style={styles.btnText}>לחץ לקביעת תור </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => navigation.navigate("login")}
          >
            <Text style={styles.btnText}>לחץ להיתחברות או להרשמה</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.shape}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 10,
  },
  text: {
    color: "black",
    fontSize: 20,
  },
  marginTop: {
    marginTop: 30,
  },

  innerText: {
    color: "black",
    fontWeight: "bold",
  },
  btnStyle: {
    backgroundColor: "black",
    color: "white",
    padding: 10,
    borderRadius: 10,

    marginTop: 20,
  },
  btnText: {
    color: "white",
    textAlign: "center",
  },
  shape: {
    width: "100%",
    height: 60,
    backgroundColor: "white",
    position: "absolute",
    top: -40,
    right: 0,
    borderTopEndRadius: 60,
    borderTopStartRadius: 60,
  },
});
