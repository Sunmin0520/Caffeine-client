import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import axios from "axios";
import StarRating from "react-native-star-rating";

const Region = ({ route, navigation }) => {
  //Regionlist에서 선택한 지역의 카페 목록을 가져옵니다.
  const city = route.params.city; //Regionlist에서 route로 받은 도시이름을 가져옵니다.
  const region_id = route.params.region_id;

  const [cafelist, Setcafelist] = useState(null);

  const getCafelistCall = async () => {
    //get cafes table
    const value = await AsyncStorage.getItem("userToken");
    axios
      .get(`http://13.125.247.226:3001/cafes/region/${region_id}`, {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .then((res) => {
        // console.log(res.data[0].id);
        Setcafelist(
          res.data.map((result) => {
            return (
              <View key={result.updatedAt}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Cafeinfo", { cafe_id: result.id });
                  }}
                >
                  <Text style={styles.textstyle}>{result.name}</Text>
                  <Text style={styles.textstyle}>{result.address}</Text>
                </TouchableOpacity>
              </View>
            );
          })
        );
      });
  };

  useEffect(() => {
    getCafelistCall();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.textstyle}>{city}</Text>
      {/**선택한지역명 */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Addcafe");
        }}
      >
        <Text style={styles.textstyle}>새로운 카페 추가</Text>
      </TouchableOpacity>
      {cafelist}
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
