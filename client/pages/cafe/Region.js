import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
} from "react-native";
import axios from "axios";

const Region = ({ route, navigation }) => {
  const city = route.params.city;
  const region_id = route.params.region_id;

  const [cafelist, Setcafelist] = useState(null);

  const getCafelistCall = async () => {
    const value = await AsyncStorage.getItem("userToken");
    axios
      .get(`http://13.125.247.226:3001/cafes/region/${region_id}`, {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .then((res) => {
        Setcafelist(
          res.data.map((result) => {
            return (
              <TouchableOpacity
                key={result.id}
                onPress={() => {
                  navigation.navigate("Cafeinfo", { cafe_id: result.id });
                }}
              >
                <Text style={styles.textstyle}>{result.name}</Text>
                <Text style={styles.textstyle}>{result.address}</Text>
              </TouchableOpacity>
            );
          })
        );
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          return alert("카페 목록을 불러올 수 없습니다");
        } else if (error.response.status === 401) {
          return alert(
            "정상적인 접근이 아닙니다. 로그아웃 후 다시 로그인 해주세요"
          );
        }
      });
  };

  useEffect(() => {
    getCafelistCall();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.textstyle}>{city}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Addcafe");
        }}
      >
        <Text style={styles.textstyle}>새로운 카페 추가</Text>
      </TouchableOpacity>
      <ScrollView>{cafelist}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textstyle: {
    justifyContent: "center",
    fontSize: 18,
    margin: 7,
  },
});

export default Region;
