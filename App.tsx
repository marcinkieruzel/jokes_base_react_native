import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, Button, View } from "react-native";
import Home from "./routes/Home";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View>
        <Stack.Navigator>
          <Stack.Screen name={"Home"} component={Home} />
        </Stack.Navigator>
      </View>
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
