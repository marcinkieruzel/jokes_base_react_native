import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { isTokenValid } from "../repository/parseJwt";
import { sendJoke } from "../repository/sendJoke";

type Props = {
  route: any;
  navigation: any;
};

type Form = {
  title: string;
  joke: string;
};

const initialFormState: Form = {
  title: "",
  joke: "",
};

const AddJoke: React.FC<Props> = ({ route, navigation }): JSX.Element => {
  const [formState, setFormState] = useState<Form>(initialFormState);
  const [err, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>("");

  if (!route?.params?.isTokenValid) {
    navigation.navigate("Login");
  }

  const handleInputChange = (name: string, value: string) => {
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = () => {
    const errors = [];
    let valid = true;

    if (formState.title?.length < 3) {
      valid = false;
      errors.push("Za krótki title");
    }

    if (formState.joke?.length < 3) {
      valid = false;
      errors.push("Za krótki joke");
    }

    if (valid) {
      (async () => {
        const token = await AsyncStorage.getItem("@access_token");

        if (typeof token === "string" && isTokenValid(token)) {
          sendJoke(formState, token);
        }
      })();
    } else {
      setErrors(errors);
      setSuccess("");
    }
  };

  return (
    <View>
      <View>
        <Text>Title</Text>
        <TextInput
          onChangeText={(e) => {
            handleInputChange("title", e);
          }}
          value={formState.title}
          style={styles.input}
        />
      </View>
      <View>
        <Text>Joke</Text>
        <TextInput
          onChangeText={(e) => handleInputChange("joke", e)}
          value={formState.joke}
          style={styles.input}
        />
      </View>
      <Pressable onPress={handleSubmit}>Dodaj żart</Pressable>

      {err?.map((x, i) => {
        return <Text key={i}>{x}</Text>;
      })}

      {success && <Text>{success}</Text>}
    </View>
  );
};

export default AddJoke;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
