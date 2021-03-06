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
                style={styles.cafeliststyle}
                key={result.id}
                onPress={() => {
                  navigation.navigate("Cafeinfo", {
                    cafe_id: result.id,
                    city: city,
                  });
                }}
              >
                <Text style={styles.cafenamestyle}>{result.name}</Text>
                <Text style={styles.cafeinfostyle} numberOfLines={1}>
                  {result.address}
                </Text>
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
  }, [cafelist]);

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.headtextstyle}>{city}</Text>
      </View>
      <View style={styles.plusbutton}>
        <TouchableOpacity
          style={styles.buttonstyle}
          onPress={() => {
            navigation.navigate("Addcafe");
          }}
        >
          <Text style={styles.pluscafestyle}>새로운 카페 등록</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scrollstyle}>
        <ScrollView>{cafelist}</ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingLeft: 20,
  },
  container2: {
    alignSelf: "flex-start",
    marginTop: 60,
    width: 90,
    borderBottomColor: "#000000",
    borderBottomWidth: 5,
  },
  plusbutton: {
    alignSelf: "flex-end",
  },
  pluscafestyle: {
    fontSize: 18,
    margin: 5,
    fontWeight: "500",
  },
  headtextstyle: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 10,
    color: "#692702",
  },
  buttonstyle: {
    padding: 2,
    marginTop: 5,
    marginRight: 25,
    marginHorizontal: 5,
    borderRadius: 5,
    borderColor: "#E9E2E2",
    borderWidth: 3,
  },
  cafeliststyle: {
    marginTop: 10,
    width: 330,
    borderBottomColor: "#E9E2E2",
    borderBottomWidth: 2,
  },
  cafenamestyle: {
    fontWeight: "600",
    fontSize: 20,
  },
  cafeinfostyle: {
    fontSize: 17,
    fontWeight: "400",
    marginVertical: 5,
  },
  scrollstyle: {
    height: 650,
    alignSelf: "flex-start",
  },
});
export default Region;
