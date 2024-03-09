import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
const Workers = ({ getWorkerData }) => {
  const [Workers, setWorkers] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await fetch("http://10.100.102.4:4000/GetWorkers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: 1 }),
      });
      const response = await data.json();
      setWorkers(response);
    };
    getData();
  }, []);

  const handleWorker = (worker) => {
    getWorkerData(worker);
  };
  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>בחר איש צוות</Text>
      <View style={{ marginTop: 50, alignItems: "center" }}>
        {Workers.map((worker) => (
          <TouchableOpacity
            onPress={() => handleWorker(worker.id)}
            key={worker.id}
            style={styles.btnStyle}
          >
            <Text style={styles.btnText}>{worker.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Workers;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  btnStyle: {
    backgroundColor: "#1d1d1d",
    color: "white",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    color: "white",
  },
});
