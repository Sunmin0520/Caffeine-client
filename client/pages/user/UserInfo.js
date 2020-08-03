import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import GoogleLogin from "./GoogleLogin";
import FacebookLogin from "./FackbookLogin";
import { LinearGradient } from "expo-linear-gradient";

export default function UserInfo({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.locationLogo}
        source={require("./LogoMakr_9PLclM.png")}
      />
      <View>
        <GoogleLogin />
        <FacebookLogin />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Signin");
        }}
      >
        <LinearGradient
          colors={["#FFEFBA", "#FBD786", "#f8b500"]}
          style={{
            padding: 10,
            alignItems: "center",
            borderRadius: 10,
            marginBottom: 20,
            width: 300,
          }}
        >
          <Image source={require("./location.png")} />
          <Text
            style={{
              backgroundColor: "transparent",
              fontSize: 15,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Sign in with Caffeine
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={{ fontWeight: "bold", marginTop: 10 }}>
          회원이 아니신가요? 회원가입
        </Text>
      </TouchableOpacity>
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
  locationLogo: {
    width: 109,
    height: 150,
    marginTop: -50,
    marginBottom: 50,
  },
});
