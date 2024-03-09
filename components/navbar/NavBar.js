import React from "react";
import { View, Text, StyleSheet } from "react-native";
export default function NavBar() {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>יוגב בוקובזה</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
    backgroundColor: "black",
    height: 50,
    borderBottomEndRadius: 35,
    borderBottomStartRadius: 35,
  },
  textStyle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
