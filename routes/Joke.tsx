import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Joke } from "../interfaces/Joke.interface";
import { getSingleJoke } from "../repository/getSingleJoke";

type Props = {
  route: any;
  navigation: any;
};

const JokeComponent: React.FC<Props> = ({ route, navigation }): JSX.Element => {
  const [jokeState, setJokeState] = useState<Joke | null>(null);
  const jokeid = route?.params?.id;
  console.log("jokeId", jokeid);

  useEffect(() => {
    (async () => {
      try {
        const joke = await getSingleJoke(jokeid);
        setJokeState(joke);
      } catch (error) {}
    })();
  }, []);

  return (
    <View>
      {jokeState && (
        <>
          <Text>{jokeState.user}</Text>
          <Text>{jokeState.title}</Text>
          <Text>{jokeState.joke}</Text>
        </>
      )}
    </View>
  );
};

export default JokeComponent;
