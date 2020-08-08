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
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
          marginBottom: 10,
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        카페 찾기
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Regionlist");
        }}
      >
        <LinearGradient
          colors={["#622300", "#622300"]}
          style={{
            alignItems: "center",
            borderRadius: 100,
            marginBottom: 10,
            padding: 5,
          }}
        >
          <Image
            style={{ width: 100, height: 100 }}
            source={require("./Images/cafe.png")}
          />
        </LinearGradient>
      </TouchableOpacity>
      <Text style={{ marginBottom: 50, fontWeight: "bold" }}></Text>
      <Text
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
          marginBottom: 10,
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        원두 기록
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Notelist");
        }}
      >
        <LinearGradient
          colors={["#622300", "#622300"]}
          style={{
            alignItems: "center",
            borderRadius: 100,
            marginBottom: 10,
            padding: 5,
          }}
        >
          <Image
            style={{ width: 100, height: 100 }}
            source={require("./Images/beans.png")}
          />
        </LinearGradient>
      </TouchableOpacity>
      <Text style={{ fontWeight: "bold" }}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
