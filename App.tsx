import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, Button, View } from "react-native";
import Home from "./routes/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Register from "./routes/Register";
import Login from "./routes/Login";
import AddJoke from "./routes/AddJoke";
import { useEffect, useState } from "react";
import { isTokenValid } from "./repository/parseJwt";

// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("@access_token");
      console.log("token", token);

      if (typeof token === "string") {
        const valid = isTokenValid(token);
        setIsLoggedIn(valid);
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={"Home"} component={Home} />
        <Tab.Screen name={"Register"} component={Register} />
        <Tab.Screen name={"Login"} component={Login} />
        {/* <Tab.Screen
          initialParams={{
            validToken: isLoggedIn,
          }}
          name={"AddJoke"}
          component={AddJoke}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
