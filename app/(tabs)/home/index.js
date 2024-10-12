import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState } from "react";
import {
  BottomModal,
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";
const index = () => {
  const [todos, setTodos] = useState([]);
  const today = moment().format("MMM Do YY");
  const [isModalVisible, setModalVisible] = useState(false);
  const [todo, setTodo] = useState("");
  const [category, setCategory] = useState("All");
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [marked, setMarked] = useState(false);
  const suggestions = [
    {
      id: "0",
      todo: "Drink Water, keep healthy",
    },
    {
      id: "1",
      todo: "Go Excercising",
    },
    {
      id: "2",
      todo: "Go to bed early",
    },
    {
      id: "3",
      todo: "Take pill reminder",
    },
    {
      id: "4",
      todo: "Go Shopping",
    },
    {
      id: "5",
      todo: "finish assignments",
    },
  ];

  const addTodo = async () => {
    try {
      const todoData = {
        title: todo,
        category: category,
      };

      axios
        .post(
          "https://todo-backend-2-tzc1.onrender.com/todos/66fd1ee083ec3426a028a5ce",
          todoData
        )
        .then((response) => {
          console.log("todo response", response);
        })
        .catch((error) => {
          console.log("error is this while posting  todos", error);
        });
      await getUserTodos();
      setModalVisible(false);
      setTodo("");
    } catch (err) {
      console.log("error is this", err);
    }
  };

  // useEffect(() => {
  //   getUserTodos();
  // }, []);
  // // useEffect(() => {
  // //   console.log("Updated pendingTodos:", pendingTodos);
  // // }, [pendingTodos]); // This will log when pendingTodos is updated
  // const getUserTodos = async () => {
  //   try {
  //     console.log(123);
  //     const response = await axios.get(
  //       `http://192.168.226.155:3000/users/66fd1ee083ec3426a028a5ce/todos`
  //     );
  //     // console.log(4565);

  //     console.log("response of todos", response.data.todos);
  //     setTodos(response.data.todos);

  //     const fetchedTodos = response.data.todos || [];
  //     const pending = fetchedTodos.filter(
  //       (todo) => todo.status !== "completed"
  //     );

  //     const complete = fetchedTodos.filter(
  //       (todo) => todo.status === "completed"
  //     );
  //     console.log("pending", pending);
  //     setPendingTodos(pending);
  //     console.log("pendingtodos", pendingTodos);
  //     setCompletedTodos(complete);
  //   } catch (err) {
  //     console.log("error in fetching todos", err);
  //   }

  //   // console.log("completed", complete, "pending todos", pending);
  // };
  // // const markTodoAsCompleted = async (todoId) => {
  // //   try {
  // //     setMarked(true);
  // //     const response = await axios.petch(
  // //       `https://192.168.226.155:3000/todos/${todoId}/complete`
  // //     );
  // //     console.log(response.data);
  // //   } catch (err) {
  // //     console.log("error in marking todo as completed", err);
  // //   }
  // // };

  useEffect(() => {
    // console.log("marked: ", marked);
    // console.log("isModalVisible: ", isModalVisible);
    getUserTodos();
  }, [marked, isModalVisible]);
  const getUserTodos = async () => {
    try {
      const today = moment().format("YYYY-MM-DD"); // Format today's date

      const response = await axios.get(
        `https://todo-backend-2-tzc1.onrender.com/users/66fd1ee083ec3426a028a5ce/todos`
      );

      const fetchedTodos = response.data.todos || [];

      // Filter todos where the dueDate matches today
      const todaysTodos = fetchedTodos.filter((todo) => todo.dueDate === today);

      console.log("Today's todos:", todaysTodos); // Log today's todos for debugging
      setTodos(todaysTodos); // Set only today's todos

      const pending = todaysTodos.filter((todo) => todo.status !== "completed");
      const completed = todaysTodos.filter(
        (todo) => todo.status === "completed"
      );

      setPendingTodos(pending);
      setCompletedTodos(completed);
    } catch (error) {
      console.log("error", error);
    }
  };
  const markTodoAsCompleted = async (todoId) => {
    try {
      setMarked(!marked);
      const response = await axios.patch(
        `https://todo-backend-2-tzc1.onrender.com/todos/${todoId}/complete`
      );
      console.log(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const markTodoAsPending = async (todoId) => {
    try {
      setMarked(!marked);
      const response = await axios.patch(
        `https://todo-backend-2-tzc1.onrender.com/todos/${todoId}/unComplete`
      );
    } catch (err) {
      console.log("error", error);
    }
  };
  console.log("completed", completedTodos);
  console.log("pending", pendingTodos);
  return (
    <>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#7cb9e8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>All</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#7cb9e8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Work</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#7cb9e8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginRight: "auto",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Personal</Text>
        </Pressable>
        <Pressable>
          <AntDesign
            onPress={() => setModalVisible(!isModalVisible)}
            name="pluscircle"
            size={30}
            color="#007FFF"
          />
        </Pressable>
      </View>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ padding: 10 }}>
          {todos.length > 0 ? (
            <View>
              {pendingTodos?.length > 0 && <Text>Tasks to do! {today}</Text>}
              {pendingTodos?.map((item, index) => (
                <Pressable
                  onPress={() => {
                    markTodoAsCompleted(item?._id);
                  }}
                  style={{
                    backgroundColor: "#e0e0e0",
                    padding: 10,
                    borderRadius: 7,
                    marginVertical: 7,
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
                    <Entypo
                      onPress={() => {
                        markTodoAsCompleted(item?._id);
                      }}
                      name="circle"
                      size={18}
                      color="black"
                    />
                    <Text style={{ flex: 1 }}>{item?.title}</Text>
                    <Feather name="flag" size={20} color="black" />
                  </View>
                </Pressable>
              ))}
              {completedTodos?.length > 0 && (
                <View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 10,
                    }}
                  >
                    <Image
                      style={{ width: 100, height: 100 }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/6784/6784655.png",
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      marginVertical: 10,
                    }}
                  >
                    <Text>Completed Tasks</Text>
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={24}
                      color="black"
                    />
                  </View>
                  {completedTodos?.map((item, index) => (
                    <Pressable
                      onPress={() => {
                        markTodoAsPending(item?._id);
                      }}
                      style={{
                        backgroundColor: "#e0e0e0",
                        padding: 10,
                        borderRadius: 7,
                        marginVertical: 7,
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
              )}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 130,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Image
                style={{ width: 200, height: 200, resizeMode: "contain" }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/2387/2387679.png",
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 15,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                No task for today! add a task
              </Text>
              <Pressable style={{ marginTop: 15 }}>
                <AntDesign
                  onPress={() => setModalVisible(!isModalVisible)}
                  name="pluscircle"
                  size={30}
                  color="#007FFF"
                />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
      <BottomModal
        onBackdropPress={() => {
          setModalVisible(!isModalVisible);
        }}
        onHardwareBackPress={() => {
          setModalVisible(!isModalVisible);
        }}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Add a todo" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={isModalVisible}
        onTouchOutside={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <ModalContent style={{ width: "100%", height: "auto" }}>
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TextInput
              value={todo}
              onChangeText={(text) => setTodo(text)}
              placeholder="Input your new task here..."
              // placeholderTextColor="red"
              style={{
                padding: 10,
                borderColor: "#e0e0e0",
                borderWidth: 1,
                borderRadius: 5,
                flex: 1,
              }}
            />
            <Ionicons onPress={addTodo} name="send" size={24} color="#007fff" />
          </View>
          <View>
            <Text>Choose Category</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginVertical: 10,
              }}
            >
              <Pressable
                onPress={() => {
                  setCategory("Work");
                }}
                style={{
                  borderColor: "#e0e0e0",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderWidth: 1,
                  borderRadius: 25,
                }}
              >
                <Text>Work</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setCategory("Personal");
                }}
                style={{
                  borderColor: "#e0e0e0",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderWidth: 1,
                  borderRadius: 25,
                }}
              >
                <Text>Personal</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setCategory("Wishlist");
                }}
                style={{
                  borderColor: "#e0e0e0",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderWidth: 1,
                  borderRadius: 25,
                }}
              >
                <Text>Wishlist</Text>
              </Pressable>
            </View>
          </View>
          <Text>Some suggestions</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
              marginVertical: 10,
            }}
          >
            {suggestions?.map((item, index) => (
              <Pressable
                onPress={() => setTodo(item?.todo)}
                style={{
                  backgroundColor: "#f0f8ff",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 25,
                }}
                key={index}
              >
                <Text style={{ textAlign: "center" }}>{item?.todo}</Text>
              </Pressable>
            ))}
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
