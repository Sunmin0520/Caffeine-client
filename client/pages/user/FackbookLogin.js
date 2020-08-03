import * as Facebook from "expo-facebook";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const FACEBOOK_APP_KEY = "2580711968908550";

function FacebookLogin() {
  const navigation = useNavigation();

  const logIn = async () => {
    try {
      await Facebook.initializeAsync(FACEBOOK_APP_KEY);
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const _storeData = async () => {
          try {
            await AsyncStorage.setItem("userToken", token);
          } catch (error) {
            console.log(error);
          }
        };
        _storeData();
        navigation.navigate("Tab");
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={logIn}>
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={{
            padding: 10,
            alignItems: "center",
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <Image source={require("./facebook.png")} />
          <Text
            style={{
              backgroundColor: "transparent",
              fontSize: 15,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Sign in with Facebook
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

export default FacebookLogin;
