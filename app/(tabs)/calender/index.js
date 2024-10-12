import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import axios from "axios";
import { Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const index = () => {
  const today = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(today);
  const [todos, setTodos] = useState([]);
  const fetchCompletedTodos = async () => {
    try {
      const response = await axios.get(
        `https://todo-backend-2-tzc1.onrender.com/todos/completed/${selectedDate}`
      );

      const completedTodos = response.data.completedTodos || [];
      setTodos(completedTodos);
    } catch (err) {
      console.log("Error fetching completed todos", err);
      return;
    }
  };
  useEffect(() => {
    fetchCompletedTodos();
  }, [selectedDate]);
  console.log(`Completed todos: ${selectedDate}` + todos);
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* <Text>index</Text> */}
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#7cb9e8" },
        }}
      />
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            marginVertical: 10,
            marginHorizontal: 12,
          }}
        >
          <Text>Completed Tasks</Text>
          <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        </View>
        {todos?.map((item, index) => (
          <Pressable
            onPress={() => {
              markTodoAsPending(item?._id);
            }}
            style={{
              backgroundColor: "#e0e0e0",
              padding: 10,
              borderRadius: 7,
              marginVertical: 7,
              marginHorizontal: 12,
            }}
            key={index}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <FontAwesome
                onPress={() => {
                  markTodoAsPending(item?._id);
                }}
                name="circle"
                size={18}
                color="gray"
              />
              <Text
                style={{
                  flex: 1,
                  textDecorationLine: "line-through",
                  color: "gray",
                }}
              >
                {item?.title}
              </Text>
              <Feather name="flag" size={20} color="gray" />
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
