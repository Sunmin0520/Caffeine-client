import React, { useState, useEffect } from "react";
import {
  Text,
  Button,
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
    console.log("로그인시 해당 페이지의 토큰 값을 확인합니다 ", value);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <TextInput
          label="Email"
          placeholder="  Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          style={{
            width: 300,
            height: 44,
            marginBottom: 10,
            backgroundColor: "#F2F2F2",
            borderRadius: 10,
          }}
        ></TextInput>
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <TextInput
          label="Password"
          placeholder="  Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          style={{
            width: 300,
            height: 44,
            marginBottom: 10,
            backgroundColor: "#F2F2F2",
            borderRadius: 10,
          }}
        ></TextInput>
      </View>
      <View>
        <TouchableOpacity onPress={postLoginData}>
          <View
            style={{
              backgroundColor: "#FDA118",
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <Text style={styles.appButtonContainer}>Login</Text>
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
});
