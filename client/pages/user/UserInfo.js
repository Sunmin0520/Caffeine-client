import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import GoogleLogin from "./GoogleLogin";
import FacebookLogin from "./FackbookLogin";
import Signin from "./Signin";

export default function UserInfo({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.locationLogo}
        source={require("./UserInfoLogo.png")}
      />
      {/* <Text style={styles.locationLogo}>Caffeine</Text> */}
      <Signin />
      <Text
        style={{
          marginBottom: 30,
          marginTop: 30,
          color: "#FDA118",
          fontWeight: "bold",
          fontSize: 16,
        }}
      >
        ㅡ or Login with ㅡ
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
              color: "#D8D8D8",
            }}
          >
            Dont have an account?
          </Text>
          <Text
            style={{
              marginTop: 50,
              marginLeft: 10,
              fontWeight: "bold",
              color: "#FDA118",
            }}
          >
            Sign Up
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  locationLogo: {
    marginTop: -90,
    marginBottom: 70,
    width: 250,
    height: 78,
  },
});
