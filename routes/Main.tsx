import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Joke } from "../interfaces/Joke.interface";
import { getJokes } from "../repository/getJokes";
import { isTokenValid, parseJwt } from "../repository/parseJwt";
import { useIsFocused } from "@react-navigation/native";
import { logout } from "../repository/logout";

type Props = {
  route: any;
  navigation: any;
};

const Main: React.FC<Props> = ({ route, navigation }): JSX.Element => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string | null>();
  const isFocused = useIsFocused();

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

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("@access_token");

        if (typeof token === "string") {
          const valid = isTokenValid(token);
          setIsLoggedIn(valid);

          if (valid) {
            const user = parseJwt(token);

            if (user !== null) {
              setCurrentUser(user.username);
            }
          } else {
            setCurrentUser(null);
            setIsLoggedIn(false);
          }
        } else {
          setCurrentUser(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [isFocused]);

  // console.log('jokes', jokes);

  return (
    <View>
      <Text>Home</Text>

      <ScrollView>
        {jokes?.map((x: Joke) => {
          return (
            <View style={styles.item}>
              <Text key={x.id}>{x.title}</Text>
              <Button
                title={"Zobacz żart"}
                onPress={() => {
                  navigation.navigate("Joke", {
                      id: x.id
                  });
                }}
              ></Button>
            </View>
          );
        })}
      </ScrollView>

      {currentUser && <Text>Witaj, {currentUser}</Text>}

      {isLoggedIn && (
        <Button
          title="Dodaj żart"
          onPress={() => {
            navigation.navigate("AddJoke", {
              isTokenValid: isLoggedIn,
            });
          }}
        ></Button>
      )}

      {isLoggedIn && (
        <Button
          title="Wyloguj się"
          onPress={() => {
            logout();
          }}
        ></Button>
      )}
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "blue",
  },
});
