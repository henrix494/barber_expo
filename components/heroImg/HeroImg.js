import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Animated from "react-native-reanimated";

export default function HeroImg({}) {
  const styles = StyleSheet.create({
    image: {
      width: "100%",
      height: 300,
    },
  });

  return (
    <View>
      <Animated.Image style={styles.image} source={img} />
    </View>
  );
}
