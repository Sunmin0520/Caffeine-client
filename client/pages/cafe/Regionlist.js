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

function Regionlist({ route, navigation }) {
  //DB에 있는 지역리스트를 가져옵니다.
  const [city, Setcity] = useState(null);

  const getRegionList = async () => {
    const value = await AsyncStorage.getItem("userToken");
    axios
      .get("http://13.125.247.226:3001/cafes", {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .then((res) => {
        Setcity(
          res.data.map((result) => {
            return (
              <View key={result.name}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Region", {
                      region_id: result.id,
                      city: result.name,
                    });
                  }}
                >
                  <Text style={styles.buttonstyle}>{result.name}</Text>
                </TouchableOpacity>
              </View>
            );
          })
        );
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          return alert("지역 목록을 불러올 수 없습니다");
        } else if (error.response.status === 401) {
          return alert(
            "정상적인 접근이 아닙니다. 로그아웃 후 다시 로그인 해주세요"
          );
        }
      });
  };

  useEffect(() => {
    getRegionList();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headtextstyle}>
        어떤 지역의 카페정보가 궁금하신가요?
      </Text>
      <ScrollView>{city}</ScrollView>

      <TouchableOpacity
        style={styles.container2}
        onPress={() => {
          navigation.navigate("Bookmark");
        }}
      >
        <Text style={styles.textstyle}>북마크 바로가기(공사중)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: 10,
  },
  citystyle: {
    marginTop: 50,
    width: 500,
    height: 200,
  },
  buttonstyle: {
    marginTop: 40,
    alignSelf: "center",
    padding: 15,
    borderColor: "#ffdc8a",
    borderRadius: 10,
    borderWidth: 2,
    fontSize: 18,
    margin: 10,
    fontWeight: "500",
  },

  headtextstyle: {
    marginTop: 80,
    fontSize: 22,
    margin: 10,
    fontWeight: "bold",
  },
  textstyle: {
    fontSize: 18,
    margin: 10,
    fontWeight: "500",
  },
});

export default Regionlist;
