import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

const Time = ({ apointmentData }) => {
  const [availableHours, SetAvailableHours] = useState([]);
  useEffect(() => {
    const getAvailableHours = async () => {
      const data = await fetch("http://10.100.102.4:4000/GetAvalableTimes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          barberId: apointmentData.worker,
          date: apointmentData.date,
        }),
      });
      const res = await data.json();

      SetAvailableHours(res);
    };
    getAvailableHours();
  }, []);
  return (
    <ScrollView>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 200,
        }}
      >
        <Text style={{ color: "white" }}>בחר זמן</Text>

        {availableHours.map((item, index) => {
          const date = new Date(item.timeSlot);
          const hours = String(date.getUTCHours()).padStart(2, "0");
          const minutes = String(date.getUTCMinutes()).padStart(2, "0");
          return (
            <Text
              key={index}
              style={{ color: "white", fontSize: 20, margin: 10 }}
            >
              {`${hours}:${minutes}`}
            </Text>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Time;
