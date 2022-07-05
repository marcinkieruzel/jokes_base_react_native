import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  Button,
} from "react-native";
import { handleLogin } from "../repository/handleLogin";

type Props = {};

type Form = {
  username: string;
  password: string;
};

const initialFormState: Form = {
  username: "",
  password: "",
};

const Register: React.FC<Props> = ({}): JSX.Element => {
  const [formState, setFormState] = useState<Form>(initialFormState);
  const [err, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>("");

  const handleInputChange = (name: string, value: string) => {
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = () => {
    setErrors([]);
    setSuccess("");
    const errors = [];
    let valid = true;

    if (formState.username?.length < 3) {
      valid = false;
      errors.push("Za krótki username");
    }

    if (formState.password?.length < 3) {
      valid = false;
      errors.push("Za krótki password");
    }

    if (valid) {
      handleSend();
    } else {
      setErrors(errors);
    }
  };

  const handleSend = async () => {
    try {
      const loginData = await handleLogin(formState);
      console.log("loginData", loginData);

      setSuccess("Zalogowałeś się");
    } catch (error) {
      setErrors(["Błąd logowania"]);
    }
  };

  return (
    <View>
      <View>
        <Text>Username</Text>
        <TextInput
          onChangeText={(e) => {
            console.log("", this);

            handleInputChange("username", e);
          }}
          value={formState.username}
          style={styles.input}
        />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput
          onChangeText={(e) => handleInputChange("password", e)}
          value={formState.password}
          style={styles.input}
        />
      </View>
      <Pressable onPress={handleSubmit}>Zaloguj się</Pressable>
      {err?.map((x, i) => {
        return <Text key={i}>{x}</Text>;
      })}

      {success && <Text>{success}</Text>}

      <Button
        title="get tokens"
        onPress={() => {
          (async () => {
            console.log(
              "tokens",
              await AsyncStorage.getItem("@access_token"),
              await AsyncStorage.getItem("@refresh_token")
            );
          })();
        }}
      ></Button>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
