import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GoogleLogin from "./GoogleLogin";
import FacebookLogin from "./FackbookLogin";
import Signin from "./Signin";

export default function UserInfo({ navigation }) {
  return (
    <LinearGradient style={styles.container} colors={["#fff", "#fff"]}>
      <Image style={styles.locationLogo} source={require("./logo2.png")} />
      <Signin />
      <Text
        style={{
          marginBottom: 30,
          marginTop: 30,
          color: "black",
          fontWeight: "bold",
          fontSize: 16,
        }}
      >
        ㅡ OR ㅡ
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <GoogleLogin />
        <FacebookLogin />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text
            style={{
              marginTop: 50,
              textAlign: "center",
              color: "#A4A4A4",
            }}
          >
            Dont have an account?
          </Text>
          <Text
            style={{
              marginTop: 50,
              marginLeft: 10,
              fontWeight: "bold",
              color: "black",
            }}
          >
            Sign Up
          </Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  locationLogo: {
    marginTop: -90,
    marginBottom: 60,
    width: 100,
    height: 100,
  },
});
