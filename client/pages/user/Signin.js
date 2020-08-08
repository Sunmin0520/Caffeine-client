import React, { useState, useEffect } from "react";
import {
  Text,
  CheckBox,
  View,
  StyleSheet,
  TextInput,
  Image,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function Signin() {
  const [isLogin, setIsLogin] = useState(false); // 로그인 핸들링
  const [email, setEmail] = useState(""); // 이메일 인풋값 핸들링
  const [password, setPassword] = useState(""); // 패스워드 인풋값 핸들링
  const [isSelected, setSelection] = useState(true); // 주의! 펄스로 바꿔줘야함

  const navigation = useNavigation();

  // axios 요청
  const postLoginData = () => {
    const data = JSON.stringify({
      email: email,
      password: password,
    });

    const config = {
      method: "post",
      url: "http://13.125.247.226:3001/users/signin",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        const testFn = async () => {
          try {
            await AsyncStorage.setItem("userToken", response.data.token);
          } catch (error) {
            console.log("Something went wrong", error);
          }
        };
        testFn();
        navigation.navigate("Tab");
      })
      .catch((error) => {
        console.log(
          `${error} 에러 ${data}를 보내지 못했습니다. 로그인 상태는 ${isLogin}입니다.`
        );
      });
  };

  useEffect(() => {
    testFn2();
  });

  const testFn2 = async () => {
    const value = await AsyncStorage.getItem("userToken");
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: 40,
          width: 300,
          marginBottom: 10,
          backgroundColor: "#fff",
          borderColor: "#A0A0A0",
          borderBottomWidth: 1,
        }}
      >
        <TextInput
          label="Email"
          placeholder="  아이디"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
        ></TextInput>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: 40,
          width: 300,
          marginBottom: 10,
          backgroundColor: "#fff",
          borderColor: "#A0A0A0",
          borderBottomWidth: 1,
        }}
      >
        <TextInput
          label="Password"
          placeholder="  비밀번호"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
        ></TextInput>
      </View>
      {/* 주의! 주석 풀어야함*/}
      {/* <View style={{ flexDirection: "row" }}>
        <CheckBox value={isSelected} onValueChange={setSelection} />
        <Text style={{ marginTop: 5, fontWeight: "bold" }}>자동 로그인</Text>
      </View> */}
      <View>
        <TouchableOpacity
          // 주의! 주석 풀어야함
          // disabled={isSelected ? false : true}
          onPress={postLoginData}
        >
          <View style={isSelected ? styles.loginBtTrun : styles.loginBtFalse}>
            <Text style={styles.appButtonContainer}>
              {isSelected ? "로그인" : "자동 로그인을 체크하세요"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  appButtonContainer: {
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    fontSize: 15,
    color: "#fff",
    height: 30,
  },
  loginBtTrun: {
    backgroundColor: "#939393",
    marginTop: 10,
  },
  loginBtFalse: {
    backgroundColor: "#C8C8C8",
    marginTop: 10,
  },
});
