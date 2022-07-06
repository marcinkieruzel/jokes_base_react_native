import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Joke } from "../interfaces/Joke.interface";
import { getJokes } from "../repository/getJokes";
import { createStackNavigator } from '@react-navigation/stack';
import Main from "./Main";
import AddJoke from "./AddJoke";
import JokeScreen from './Joke';
const Stack = createStackNavigator();

type Props = {};

const Home: React.FC = (): JSX.Element => {
  const [jokes, setJokes] = useState<Joke[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const jks = await getJokes();
        setJokes(jks);
      } catch (error) {
        console.error("error", error);
      }
    })();
  }, []);

  // console.log('jokes', jokes);


  console.log('Render', );
  

  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="AddJoke" component={AddJoke} />
      <Stack.Screen name="Joke" component={JokeScreen} />
    </Stack.Navigator>
  );
};

export default Home;
