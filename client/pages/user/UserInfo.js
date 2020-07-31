import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import GoogleLogin from "./GoogleLogin";
import FacebookLogin from "./FackbookLogin";

export default function UserInfo({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.test}>
        <GoogleLogin />
      </View>
      <View style={styles.test}>
        <FacebookLogin />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Signin");
        }}
      >
        <Text style={styles.loginStyle}>Sign in with Caffeine</Text>
      </TouchableOpacity>
      <Text
        style={styles.signinStyle}
        onPress={() => navigation.navigate("Signup")}
      >
        아직 회원이 아니신가요? 회원가입
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginStyle: {
    backgroundColor: "yellow",
    width: 350,
    height: 30,
    marginBottom: 20,
    textAlign: "center",
  },
  signinStyle: {
    backgroundColor: "cyan",
    width: 350,
    height: 20,
    marginTop: 20,
    textAlign: "center",
  },
});
