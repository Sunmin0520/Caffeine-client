import React, { useEffect } from "react";
import {
  Text,
  Button,
  View,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Signin({ navigation }) {
  useEffect(() => {
    testFn4();
  });

  const testFn4 = async () => {
    const value = await AsyncStorage.getItem("userToken");
    console.log("Main.js 해당 페이지의 토큰 값을 확인합니다 ", value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inputext}>Main</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Regionlist");
        }}
      >
        <LinearGradient
          colors={["#EB5757", "#cc5333"]}
          style={{
            padding: 10,
            alignItems: "center",
            borderRadius: 10,
            marginBottom: 20,
            width: 300,
          }}
        >
          <Image source={require("./signboard.png")} />
          <Text
            style={{
              backgroundColor: "transparent",
              fontSize: 15,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            카페 찾기
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Notelist");
        }}
      >
        <LinearGradient
          colors={["#EB5757", "#cc5333"]}
          style={{
            padding: 10,
            alignItems: "center",
            borderRadius: 10,
            marginBottom: 20,
            width: 300,
          }}
        >
          <Image source={require("./coffee-shop.png")} />
          <Text
            style={{
              backgroundColor: "transparent",
              fontSize: 15,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            원두 기록
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 200,
    marginBottom: 10,
  },
  inputext: {
    width: 200,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 25,
  },
});
