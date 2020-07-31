import * as Facebook from "expo-facebook";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

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
        <Text style={styles.facebookStyle}>Sign in with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
}

export default FacebookLogin;

const styles = StyleSheet.create({
  facebookStyle: {
    backgroundColor: "cornflowerblue",
    width: 350,
    height: 30,
    marginBottom: 20,
    textAlign: "center",
  },
});
