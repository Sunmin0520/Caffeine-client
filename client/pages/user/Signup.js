//test
import React, { useState } from "react";
import {
  Text,
  Button,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState(""); // 이메일 인풋값 핸들링
  const [username, setNickname] = useState(""); // 닉네임 인풋값 핸들링
  const [password, setPassword] = useState(""); // 패스워드 인풋값 핸들링
  const [passwordCheck, setPasswordCheck] = useState(""); // 패스워드체크 인풋값 핸들링

  const postSignupData = () => {
    console.log(`이메일: ${email} 패스워드: ${password} 닉네임: ${username}`);
    const data = JSON.stringify({
      email: email,
      password: password,
      username: username,
    });

    const config = {
      method: "post",
      url: "http://13.125.247.226:3001/users/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        alert(`${email}님 회원가입 하셨습니다. 로그인 페이지로 이동합니다.`);
        navigation.navigate("Signin");
      })
      .catch((error) => {
        console.log(`${error} 에러 ${data}를 보내지 못했습니다.`);
      });
  };

  const doesPasswordMatch = () => {
    return password === passwordCheck;
  };

  const renderFeedbackMessage = () => {
    if (passwordCheck) {
      if (!doesPasswordMatch()) {
        return <Text>패스워드가 일치하지 않습니다!!</Text>;
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inputext}>회원가입 페이지</Text>
      <TextInput
        label="Email"
        placeholder="   Email"
        style={styles.input}
        onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
      />
      <TextInput
        label="Text"
        placeholder="   Nickname"
        style={styles.input}
        onChangeText={(username) => setNickname(username)}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        placeholder="   Password"
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(password) => setPassword(password)}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        placeholder="   Password Check"
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(passwordCheck) => setPasswordCheck(passwordCheck)}
        autoCapitalize="none"
      />
      <View>{renderFeedbackMessage()}</View>
      <TouchableOpacity
        onPress={postSignupData}
        disabled={
          email === "" ||
          username === "" ||
          password === "" ||
          passwordCheck === ""
            ? true
            : false
        }
      >
        <Text style={styles.signupStyle}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 300,
    height: 44,
    marginBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  inputext: {
    width: 200,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  signupStyle: {
    backgroundColor: "red",
    width: 305,
    height: 30,
    marginBottom: 20,
    textAlign: "center",
  },
});
