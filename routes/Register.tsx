import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Pressable } from "react-native";
import { handleRegister } from "../repository/handleRegister";

type Props = {};

type Form = {
  username: string;
  password: string;
  email: string;
};

const initialFormState: Form = {
  username: "",
  password: "",
  email: "",
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

    if (formState.email?.length < 3) {
      valid = false;
      errors.push("Za krótki email");
    }

    if (valid) {
      handleSend();
    } else {
      setErrors(errors);
    }
  };

  const handleSend = async () => {
    try {
      const res = await handleRegister(formState);
      console.log("res", res);

      setSuccess("Zarejestrowałeś się");
    } catch (error) {
      setErrors(["Błąd rejestracji"]);
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
      <View>
        <Text>Email</Text>
        <TextInput
          onChangeText={(e) => handleInputChange("email", e)}
          value={formState.email}
          style={styles.input}
        />
      </View>
      <Pressable onPress={handleSubmit}>Zarejestruj się</Pressable>
      {err?.map((x, i) => {
        return <Text key={i}>{x}</Text>;
      })}

      {success && <Text>{success}</Text>}
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
