import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          router.push("/(tabs)/home");
        }
      } catch (err) {
        console.log("Error while checking login status", err);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
    console.log("user", user);
    axios
      .post("https://todo-backend-2-tzc1.onrender.com/login", user)
      .then((response) => {
        console.log("login response", response.data);
        const token = response.data;
        console.log("token", token);
        if (token) {
          AsyncStorage.setItem("authToken", token)
            .then(() => {
              router.push("/(tabs)/home");
            })
            .catch((storageError) => {
              console.error("Error storing token:", storageError);
            });
        } else {
          console.error("Token is undefined, cannot store.");
        }
        // AsyncStorage.setItem("authToken", token)
        //   .then(() => {
        //     router.push("/(tabs)/home");
        //   })
        //   .catch((storageError) => {
        //     console.error("Error storing token:", storageError);
        //   });
        // router.push("/(tabs)/home");
      })
      .catch((error) => {
        console.log("error login", error.message);
      });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View style={{ marginTop: 100 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#0066b2" }}>
          Todo-list tracker
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 20 }}>
            Log in to your account
          </Text>
        </View>
        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#e0e0e0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8, color: "gray" }}
              name="email"
              size={24}
              color="black"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 17 : 17,
              }}
              placeholder="enter your email"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#e0e0e0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <AntDesign
              style={{ marginLeft: 8, color: "gray" }}
              name="lock"
              size={24}
              color="black"
            />
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 17 : 17,
              }}
              placeholder="enter your password"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            <Text>Keep me logged in</Text>
            <Text style={{ color: "#007fff", fontWeight: "500" }}>
              Forgot password
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 40 }}>
          <Pressable
            onPress={handleLogin}
            style={{
              width: 200,
              backgroundColor: "#6699cc",
              padding: 15,
              borderRadius: 6,
              marginRight: "auto",
              marginLeft: "auto",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Login
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/register")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", fontSize: 15, color: "gray" }}>
              Don't have an account ? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({});
