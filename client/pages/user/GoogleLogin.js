import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import * as Google from "expo-google-app-auth";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const ANDROID_CLIENT_ID =
  "348379217678-iep3tgg5rfud3s2be2psvql59d74g10u.apps.googleusercontent.com";

function GoogleLogin() {
  const navigation = useNavigation();
  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        const _storeData = async () => {
          try {
            await AsyncStorage.setItem("userToken", result.accessToken);
          } catch (error) {
            console.log(error);
          }
        };
        _storeData();
        navigation.navigate("Tab");
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log("에러: ", e);
      return { error: true };
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={signInWithGoogleAsync}>
        <LinearGradient
          colors={["#e73827", "#f85032", "#FF6B6B"]}
          style={{
            padding: 10,
            alignItems: "center",
            borderRadius: 10,
            marginBottom: 20,
            width: 300,
          }}
        >
          <Image source={require("./google.png")} />
          <Text
            style={{
              backgroundColor: "transparent",
              fontSize: 15,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Sign in with Google
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

export default GoogleLogin;
