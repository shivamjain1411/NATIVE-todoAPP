import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarStyle: { color: "#7cb9e8" },
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <FontAwesome name="tasks" size={24} color="#7cb9e8" />
            ) : (
              <FontAwesome name="tasks" size={24} color="black" />
            );
          },
        }}
      />
      <Tabs.Screen
        name="calender"
        options={{
          tabBarLabel: "Calender",
          tabBarStyle: { color: "#7cb9e8" },
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <AntDesign name="calendar" size={24} color="#7cb9e8" />
            ) : (
              <AntDesign name="calendar" size={24} color="black" />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarStyle: { color: "#7cb9e8" },
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <AntDesign name="profile" size={24} color="#7cb9e8" />
            ) : (
              <AntDesign name="profile" size={24} color="black" />
            );
          },
        }}
      />
    </Tabs>
  );
}
