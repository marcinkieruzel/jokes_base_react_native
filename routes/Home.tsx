import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Joke } from "../interfaces/Joke.interface";
import { getJokes } from "../repository/getJokes";

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
  

  return (
    <View>
      <Text>Home</Text>
      <ScrollView>
        {
          jokes?.map((x: Joke) => {
            return <Text key={x.id}>{x.title}</Text>
          })
        }
      </ScrollView>
    </View>
  );
};

export default Home;
