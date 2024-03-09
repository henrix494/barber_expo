import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as Yup from "yup";

import { Formik, Field } from "formik";
import React, { useState } from "react";
import AnimatedSwitchButton from "../components/switch/AnimatedSwitchButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import auth from "@react-native-firebase/auth";
export default function Page() {
  const [toggled, setToggled] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [sex, setSex] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const GetDate = (event, selectedDate, setFieldValue) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setSelectedDate(currentDate);
    setFieldValue("date", currentDate);
    setShowPicker(false);
  };
  const signUpSchema = Yup.object().shape({
    Firstname: Yup.string().required("שדה חובה"),
    LastName: Yup.string().required("שדה חובה"),
    phone: Yup.string().required("שדה חובה"),
  });

  // firebase auth states
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [data, setData] = useState([]);
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
        console.log("user exists");
      } else {
        const confirmCode = await auth().signInWithPhoneNumber(
          `+972${phoneNumber}`
        );
        setConfirm(confirmCode);
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
        const postData = await fetch("http://10.100.102.4:4000/createUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }
    } catch (error) {
      console.log("user not created", error);
    }
  };
  return (
    <ScrollView>
      <Formik
        initialValues={{
          Firstname: "",
          LastName: "",
          phone: "",
          date: "",
          role: "customers",
          sex: "female",
          id: 1,
        }}
        validationSchema={signUpSchema}
        validateOnMount={true}
        onSubmit={async (values) => {
          await signInWithPhoneNumber();
          setData(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          setFieldValue,
        }) => (
          React.useEffect(() => {
            setIsFormValid(isValid);
          }, [isValid]),
          (
            <View
              style={{
                marginTop: 40,
              }}
            >
              <View style={styles.inputContainer}>
                <Icon name="person" size={50} color="black" />
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("Firstname")}
                  onBlur={handleBlur("Firstname")}
                  value={values.Firstname}
                  aria-labelledby="Firstname"
                  placeholder="שם מלא"
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("LastName")}
                  onBlur={handleBlur("LastName")}
                  value={values.LastName}
                  aria-labelledby="LastName"
                  placeholder="שם משפחה"
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => {
                    handleChange("phone")(value);
                    setPhoneNumber(value);
                  }}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                  aria-labelledby="phone"
                  keyboardType="phone-pad"
                  placeholder="מספר פלאפון"
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={date.toLocaleDateString("he-IL")}
                  onTouchStart={() => {
                    setShowPicker(true);
                  }}
                  value={
                    selectedDate && selectedDate.toLocaleDateString("he-IL")
                  }
                />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: 30,
                  gap: 20,
                }}
              >
                <Text>נקבה</Text>
                <AnimatedSwitchButton
                  containerStyle={{
                    backgroundColor: toggled ? "#194260" : "#d85590",
                  }}
                  onChange={() => {
                    setToggled((prev) => {
                      const newToggled = !prev;
                      const newSex = newToggled ? "male" : "female";
                      setSex(newSex);
                      setFieldValue("sex", newSex);
                      return newToggled;
                    });
                  }}
                />
                <Text>זכר</Text>
              </View>
              {showPicker && (
                <DateTimePicker
                  value={date}
                  display="calendar"
                  onChange={(event, selectedDate) =>
                    GetDate(event, selectedDate, setFieldValue)
                  }
                  maximumDate={new Date()}
                />
              )}
              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    backgroundColor: !isFormValid ? "grey" : "black",
                  },
                ]}
                disabled={!isFormValid}
                onPress={handleSubmit}
              >
                <Text style={{ color: "white", fontSize: 20 }}>שלח</Text>
              </TouchableOpacity>
            </View>
          )
        )}
      </Formik>
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={(text) => setCode(text)}
      ></TextInput>
      <TouchableOpacity onPress={confirmCode}>
        <Text>בדיקה</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    marginTop: 30,
    width: "80%",
  },
  btn: {
    marginTop: 30,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    width: "50%",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
