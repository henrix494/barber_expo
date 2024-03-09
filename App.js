import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useContext, useState, useEffect } from "react";

import NavBar from "./components/navbar/NavBar";
import HeroImg from "./components/heroImg/HeroImg";
import Greet from "./components/greet/Greetings";
export default function App() {
  return (
    <AuthContext.Provider value={user}>
      <SafeAreaProvider>
        <SafeAreaView>
          <StatusBar animated={true} style={"light"} backgroundColor="black" />
          <NavBar />
          <HeroImg />
          <ScrollView>
            <View style={styles.container}>
              <Greet />
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 1000,
    borderRadius: 35,
  },
});
