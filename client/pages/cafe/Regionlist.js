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
  const [button, SetButton] = useState(false);

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
                  style={styles.buttonstyle}
                  onPress={() => {
                    navigation.navigate("Region", {
                      region_id: result.id,
                      city: result.name,
                    });
                  }}
                >
                  <Text style={styles.textstyle}>{result.name}</Text>
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
      <View style={styles.bookmarkstyle}>
        <TouchableOpacity
          style={styles.container2}
          onPress={() => {
            navigation.navigate("Bookmark");
          }}
        >
          <Text style={styles.bookmarktextstyle}>Bookmark 바로가기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flexwrapstyle}>{city}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  citystyle: {
    width: 500,
    height: 200,
  },
  flexwrapstyle: {
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: 300,
    marginTop: 10,
    marginLeft: 20,
  },
  headtextstyle: {
    alignSelf: "center",
    marginTop: 80,
    fontSize: 22,
    fontWeight: "bold",
  },
  textstyle: {
    fontSize: 18,
    margin: 10,
    fontWeight: "500",
  },
  bookmarktextstyle: {
    fontSize: 16,
    margin: 10,
    fontWeight: "400",
  },
  buttonstyle: {
    padding: 2,
    marginTop: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    borderColor: "#C7C1C1",
    borderWidth: 3,
  },
  bookmarkstyle: {
    alignSelf: "flex-end",
    padding: 2,
    marginTop: 20,
    marginRight: 37,
    marginHorizontal: 5,
    borderRadius: 5,
    borderColor: "#E9E2E2",
    borderWidth: 3,
  },
});
export default Regionlist;
