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
            source={require("./cafe.png")}
          />
        </LinearGradient>
      </TouchableOpacity>
      <Text
        style={{ marginBottom: 50, fontWeight: "bold" }}
      >{`나만 알고싶은 카페
      찜꽁빵꽁`}</Text>
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
            source={require("./beans.png")}
          />
        </LinearGradient>
      </TouchableOpacity>
      <Text style={{ fontWeight: "bold" }}>{`나만의 커피 콩콩콩을
      확인하세요!`}</Text>
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
