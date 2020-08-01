import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import GoogleLogin from "./GoogleLogin";
import FacebookLogin from "./FackbookLogin";

export default function UserInfo({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Signin");
        }}
      >
        <Text style={styles.loginStyle}>SIGN IN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.loginStyle}>SIGN UP</Text>
      </TouchableOpacity>
      <Text style={styles.test}>ㅡㅡㅡㅡㅡㅡㅡㅡㅡORㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ</Text>
      <View>
        <GoogleLogin />
        <FacebookLogin />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginStyle: {
    backgroundColor: "snow",
    width: 300,
    height: 30,
    marginBottom: 20,
    textAlign: "center",
    borderColor: "lightsteelblue",
    borderWidth: 1,
    borderRadius: 10,
    fontWeight: "bold",
  },
  signinText: {
    fontWeight: "bold",
  },
  locationLogo: {
    width: 109,
    height: 150,
    marginTop: -50,
    marginBottom: 50,
  },
  test: { marginTop: 10, marginBottom: 30 },
});
