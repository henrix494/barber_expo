import { View, Text, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Stack, Link } from "expo-router";
import Icon from "react-native-vector-icons/AntDesign";
import Animated, {
  FadeIn,
  BounceInDown,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Workers from "../components/booking/Workers";
import icon from "react-native-vector-icons/Entypo";
import Schedule from "../components/booking/Schedule";
import Time from "../components/booking/Time";
const book = () => {
  const [apointmentData, setApointmentData] = useState({
    date: "",
    time: "",
    worker: null,
  });

  const getWorkerData = (worker) => {
    setApointmentData({ ...apointmentData, worker: worker });
  };
  const getDateTime = (date) => {
    setApointmentData({ ...apointmentData, date: date });
  };
  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: apointmentData.worker
            ? withTiming(1000, {
                duration: 2000,
                easing: Easing.bounce,
                reduceMotion: true,
              })
            : 0,
        },
      ],
    };
  });
  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <SafeAreaView style={{ overflow: "hidden" }}>
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
                  קביעת תור
                </Animated.Text>
              </View>
            </SafeAreaView>
          ),
        }}
      />
      <View style={styles.container}>
        <View>
          <View style={styles.circle}>
            <Text style={styles.text}>3</Text>
          </View>
          <Text style={{ color: "white", marginTop: 10 }}> בחר זמן</Text>
        </View>

        <View>
          <View style={styles.circle}>
            {apointmentData.date ? (
              <Icon name="check" size={40} />
            ) : (
              <Text style={styles.text}>2</Text>
            )}
          </View>
          <Text style={{ color: "white", marginTop: 10 }}> בחר תאריך</Text>
        </View>
        <View style={styles.circle_container}>
          <View style={styles.circle}>
            {apointmentData.worker ? (
              <Icon name="check" size={40} />
            ) : (
              <Text style={styles.text}>1</Text>
            )}
          </View>
          <Text style={{ color: "white", marginTop: 10 }}> בחר עובד</Text>
        </View>
      </View>

      <Animated.ScrollView
        entering={BounceInDown.duration(1000)}
        style={[{ backgroundColor: "#1d1d1d" }, animationStyle]}
      >
        <View style={styles.bookContainer}>
          <Workers getWorkerData={getWorkerData} />
        </View>
      </Animated.ScrollView>
      {apointmentData.worker && (
        <Animated.ScrollView
          style={[
            {
              backgroundColor: "#1d1d1d",
              position: "absolute",
              width: "100%",
            },
          ]}
        >
          <View style={styles.bookContainer}>
            <Schedule
              apointmentData={apointmentData.worker}
              getDateTime={getDateTime}
            />
          </View>
        </Animated.ScrollView>
      )}
      {apointmentData.date && (
        <Animated.ScrollView
          style={[
            {
              backgroundColor: "#1d1d1d",
              position: "absolute",
              width: "100%",
            },
          ]}
        >
          <View style={styles.bookContainer}>
            <Time apointmentData={apointmentData} getDateTime={getDateTime} />
          </View>
        </Animated.ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-around",
    zIndex: 10,
    backgroundColor: "#1d1d1d",
    width: "100%",
    height: "20%",
  },
  bookContainer: {
    height: 1000,
    width: "100%",
    backgroundColor: "black",
    borderTopEndRadius: 32,
    borderTopStartRadius: 32,
  },
  circle_container: {
    alignContent: "center",
    justifyContent: "center",
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
  circle: {
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
    backgroundColor: "white",
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 7,
  },
});
export default book;
