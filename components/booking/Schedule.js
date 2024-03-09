import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from "react-native-calendars";
const calendarConfig = {
  monthNames: [
    "ינואר",
    "פברואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
  dayNamesShort: ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "שבת"],
  today: "היום",
  firstDay: 0, // Sunday is the first day of the week
};
LocaleConfig.locales["he"] = calendarConfig;
LocaleConfig.defaultLocale = "he";
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
const day = currentDate.getDate();
const formattedDate = `${year}-${month}-${day}`;
const calendarTheme = {
  backgroundColor: "black",
  calendarBackground: "black",
  textSectionTitleColor: "white",
  selectedDayTextColor: "white",
  todayTextColor: "white",
  dayTextColor: "white",
  textDisabledColor: "grey",
  dotColor: "orange",
  selectedDotColor: "orange",
  arrowColor: "orange",
  monthTextColor: "white",
  indicatorColor: "red",
  textDayFontFamily: "monospace",
  textMonthFontFamily: "monospace",
  textDayHeaderFontFamily: "monospace",
  textDayFontWeight: "300",
  textMonthFontWeight: "bold",
  textDayHeaderFontWeight: "300",
  textDayFontSize: 20,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 16,

  "stylesheet.calendar.main": {
    week: {
      marginTop: 7,
      marginBottom: 7,
      flexDirection: "row-reverse",
      justifyContent: "space-around",
    },
  },
  "stylesheet.calendar.header": {
    week: {
      marginTop: 7,
      flexDirection: "row-reverse",
      justifyContent: "space-around",
    },
  },
};

const Schedule = ({ apointmentData, getDateTime }) => {
  const [AvailableHours, SetAvailableHours] = useState();
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const getAvailableHours = async () => {
      const data = await fetch("http://10.100.102.4:4000/GetAvailability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ barberId: apointmentData }),
      });
      const res = await data.json();

      SetAvailableHours(res);

      // Process the available hours and update the marked dates
      const newMarkedDates = {};
      res.availability.forEach((item) => {
        const date = new Date(item.timeSlot);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0-based in JavaScript
        const day = ("0" + date.getDate()).slice(-2);
        const formattedDate = `${year}-${month}-${day}`;

        newMarkedDates[formattedDate] = {
          selected: true,
          marked: true,
          selectedColor: "orange",
          dotColor: "white",
        };
      });
      setMarkedDates(newMarkedDates);
    };
    getAvailableHours();
  }, []); // "carrot"
  const lastKey = Object.keys(markedDates)[Object.keys(markedDates).length - 1];
  const onDayPressHandler = (day) => {
    const dateObj = new Date(day);
    const formattedDate = dateObj.toISOString();

    getDateTime(formattedDate);
  };
  return (
    <SafeAreaView>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 200,
        }}
      >
        <Calendar
          theme={calendarTheme}
          st
          minDate={formattedDate}
          hideExtraDays={true}
          locale={"he"}
          firstDay={0}
          onDayPress={(day) => {
            onDayPressHandler(day.dateString);
          }}
          hideArrows={true}
          maxDate={lastKey}
        />
      </View>
    </SafeAreaView>
  );
};

export default Schedule;
