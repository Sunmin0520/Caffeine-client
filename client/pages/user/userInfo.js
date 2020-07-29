//test
import React, { useState } from "react";
import { Text, Button, View, StyleSheet, TextInput } from "react-native";

export default function userInfo({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Google 로그인"></Button>
      <Button title="Fackbook 로그인"></Button>
      <Button
        title="등록된 이메일로 로그인"
        onPress={() => {
          navigation.navigate("Signin");
        }}
      ></Button>
      <Text onPress={() => navigation.navigate("Signup")}>
        아직 회원이 아니신가요? 회원가입
      </Text>
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
    width: 350,
    height: 40,
    marginBottom: 10,
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
  },
  inputext: {
    width: 200,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
});