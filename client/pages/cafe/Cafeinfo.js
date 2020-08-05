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
import * as Linking from "expo-linking";
import StarRating from "react-native-star-rating";

const Cafeinfo = ({ route, navigation }) => {
  //Region에서 선택한 카페의 상세 내용을 출력합니다.
  const cafe_id = route.params.cafe_id; //Region에서 선택한 하나의 카페의 ID입니다.
  const region_id = route.params.region_id;
  const city = route.params.city;
  const user_id = route.params.user_id;

  const [name, Setname] = useState(null);
  const [address, Setaddress] = useState(null);
  const [sell_beans, Setsell_beans] = useState("원두 미판매");
  const [instagram_account, Setinstagram_account] = useState(null);
  const [rating_average, Setrating_average] = useState(null);
  const [reviews, Setreviews] = useState(null);

  const getCafeinfoCall = async () => {
    const value = await AsyncStorage.getItem("userToken");
    axios
      .get(`http://13.125.247.226:3001/cafes/${cafe_id}`, {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .then((res) => {
        Setname(res.data.name),
          Setaddress(res.data.address),
          Setinstagram_account(res.data.instagram_account);
        if (res.data.sell_beans === true) {
          return Setsell_beans("원두 판매");
        } else {
          Setsell_beans("원두 미판매");
        }
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          return alert("카페 정보를 불러 올 수 없습니다");
        } else if (error.response.status === 401) {
          return alert(
            "정상적인 접근이 아닙니다. 로그아웃 후 다시 로그인 해주세요"
          );
        }
      });
  };

  const postBookmarkCall = async () => {
    const value = await AsyncStorage.getItem("userToken");
    axios
      .post(
        `http://13.125.247.226:3001/cafes/bookmark/${cafe_id}`,
        {
          cafe_id: cafe_id,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${value}`,
          },
        }
      )
      .catch(function (error) {
        console.log(error);
      });
  };

  const getCafeReviewCall = async () => {
    const value = await AsyncStorage.getItem("userToken");
    axios
      .get(`http://13.125.247.226:3001/cafes/${cafe_id}`, {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .then((res) => {
        if (res.data.review.length === 0) {
          Setreviews(
            <Text style={styles.textstyle}>
              리뷰가 없습니다. 리뷰를 작성해주세요.
            </Text>
          );
        } else {
          Setreviews(
            res.data.review.map((result) => {
              return (
                <View key={result.id}>
                  <Text style={styles.textstyle}>{result.text}</Text>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={result.rating}
                    fullStarColor={"#FEBF34"}
                  />
                </View>
              );
            })
          );
        }
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          return alert("리뷰를 불러 올 수 없습니다");
        } else if (error.response.status === 401) {
          return alert(
            "정상적인 접근이 아닙니다. 로그아웃 후 다시 로그인 해주세요"
          );
        }
      });
  };
  const getRatingCall = async () => {
    const value = await AsyncStorage.getItem("userToken");
    axios
      .get(`http://13.125.247.226:3001/cafes/rating/${cafe_id}`, {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .then((res) => {
        Setrating_average(res.data);
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          return alert("평가를 확인할 수 없습니다");
        } else if (error.response.status === 401) {
          return alert(
            "정상적인 접근이 아닙니다. 로그아웃 후 다시 로그인 해주세요"
          );
        }
      });
  };
  //reviews, rating_average
  useEffect(() => {
    getCafeinfoCall();
    getCafeReviewCall();
    getRatingCall();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.textstyle}>{city}</Text>
      <Text style={styles.textstyle}>{name}</Text>
      <Text style={styles.textstyle}>{address}</Text>
      <Text
        style={styles.textstyle}
        onPress={() => {
          Linking.openURL(`https://www.instagram.com/${instagram_account}`);
        }}
      >
        @{instagram_account}
      </Text>
      <Text style={styles.textstyle}>{sell_beans}</Text>
      <StarRating
        disabled={true}
        maxStars={5}
        rating={rating_average}
        fullStarColor={"#FEBF34"}
      />
      <TouchableOpacity
        onPress={() => {
          postBookmarkCall();
        }}
      >
        <Text style={styles.textstyle}>북마크 테스트 용 입니다</Text>
      </TouchableOpacity>
      <ScrollView>{reviews}</ScrollView>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Addreview", {
            cafe_id: cafe_id,
            user_id: user_id,
          });
        }}
      >
        <Text style={styles.textstyle}>리뷰남기기</Text>
      </TouchableOpacity>
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
    margin: 10,
  },
});

export default Cafeinfo;
