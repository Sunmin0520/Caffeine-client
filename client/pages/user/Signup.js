import React, { useState } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function Signup() {
  const [email, setEmail] = useState(""); // 이메일 인풋값 핸들링

  const [username, setNickname] = useState(""); // 닉네임 인풋값 핸들링

  const [password, setPassword] = useState(""); // 패스워드 인풋값 핸들링
  const [passwordCheck, setPasswordCheck] = useState(""); // 패스워드체크 인풋값 핸들링

  const navigation = useNavigation();

  const postSignupData = () => {
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
        alert(`${email}님 회원가입 하셨습니다. 로그인 페이지로 이동합니다.`);
        navigation.navigate("UserInfo");
      })
      .catch((error) => {
        console.log(`${error} 에러 ${data}를 보내지 못했습니다.`);
      });
  };

  const doesPasswordMatch = () => {
    // 패스워드 체크
    return password === passwordCheck;
  };

  const renderFeedbackMessage = () => {
    // 패스워드 체크
    if (passwordCheck) {
      if (!doesPasswordMatch()) {
        return (
          <Text style={styles.feedbackMessage}>패스워드를 확인하세요</Text>
        );
      }
    }
  };

  const CheckEmailForm = () => {
    // 이메일 체크
    const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    return !reg_email.test(email) ? false : true;
  };

  const renderEmailFeedback = () => {
    // 이메일
    if (email) {
      if (!CheckEmailForm()) {
        return (
          <Text style={styles.feedbackMessage}>
            이메일 형식에 맞게 입력하세요
          </Text>
        );
      }
    }
  };

  const passwordLengthCheck = () => {
    return password.length <= 7 ? true : false;
  };

  const renderPasswordFeedback = () => {
    // 이메일
    if (password) {
      if (passwordLengthCheck()) {
        return (
          <Text style={styles.feedbackMessage}>
            비밀번호는 8자리 이상입니다
          </Text>
        );
      }
    }
  };

  return (
    <LinearGradient style={styles.container} colors={["#fff", "#fff"]}>
      <Image style={styles.locationLogo} source={require("./Images/D.png")} />
      <TextInput
        label="Text"
        placeholder="   이름"
        style={styles.input}
        onChangeText={(username) => setNickname(username)}
        autoCapitalize="none"
      />
      <TextInput
        label="Email"
        placeholder="   이메일"
        style={styles.input}
        onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
      />
      <View style={{ marginLeft: 10 }}>{renderEmailFeedback()}</View>
      <TextInput
        label="Password"
        placeholder="   비밀번호"
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(password) => setPassword(password)}
        autoCapitalize="none"
      />
      <View>{renderPasswordFeedback()}</View>
      <TextInput
        label="Password"
        placeholder="   비밀번호 확인"
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(passwordCheck) => setPasswordCheck(passwordCheck)}
        autoCapitalize="none"
      />
      <View style={{ marginLeft: -30 }}>{renderFeedbackMessage()}</View>
      <View
        style={
          username === "" ||
          password === "" ||
          password === "" ||
          !doesPasswordMatch()
            ? styles.signupFalse
            : styles.signupTrue
        }
      >
        <TouchableOpacity
          onPress={postSignupData}
          disabled={
            CheckEmailForm() === false || doesPasswordMatch() === false
              ? true
              : false
          }
        >
          <Text style={styles.signupStyle}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDA118",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 300,
    height: 44,
    marginBottom: 10,
    borderBottomColor: "#A0A0A0",
    borderBottomWidth: 1,
  },
  inputext: {
    width: 200,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  signupStyle: {
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    fontSize: 15,
    color: "#fff",
    height: 30,
    width: 305,
  },
  feedbackMessage: {
    color: "#DC5F5F",
    fontWeight: "bold",
    marginLeft: -130,
  },
  locationLogo: {
    marginTop: -200,
    marginBottom: 110,
  },
  signupFalse: {
    backgroundColor: "#C8C8C8",
    marginTop: 10,
  },
  signupTrue: {
    backgroundColor: "#939393",
    marginTop: 10,
  },
});
