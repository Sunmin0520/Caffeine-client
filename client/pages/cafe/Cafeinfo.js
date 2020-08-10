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
  const cafe_id = route.params.cafe_id;
  const city = route.params.city;
  const user_id = route.params.user_id;

  const [name, Setname] = useState(null);
  const [address, Setaddress] = useState(null);
  const [sell_beans, Setsell_beans] = useState(null);
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
          return Setsell_beans("판매");
        } else if (res.data.sell_beans === false) {
          return Setsell_beans("미판매");
        } else {
          return Setsell_beans("미확인");
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
      .then((res) => {
        if (res.status === 201) {
          alert("Bookmark가 등록되었습니다");
        }
      })
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
                  <View style={styles.starstyle}>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      rating={result.rating}
                      fullStarColor={"#FEBF34"}
                      starSize={30}
                    />
                  </View>
                  <Text style={styles.reviewstyle}>{result.text}</Text>
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

  useEffect(() => {
    getCafeinfoCall();
    getCafeReviewCall();
    getRatingCall();
  }, [reviews, rating_average]);

  return (
    <View style={styles.container}>
      <View style={styles.cafenamestyle}>
        <Text style={styles.headtextstyle}>{name}</Text>
      </View>
      <View style={styles.buttonstyle}>
        <TouchableOpacity
          style={styles.bookmarkbutton}
          onPress={() => {
            postBookmarkCall();
          }}
        >
          <Text style={styles.bookmarkstyle}>Bookmark</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textalign}>
        <Text style={styles.boldtextstyle}>
          {`지역    `}
          <Text style={styles.textstyle}>{city}</Text>
        </Text>
        <Text style={styles.boldtextstyle}>
          {`주소    `}
          <Text style={styles.textstyle}>{address}</Text>
        </Text>
        <Text style={styles.boldtextstyle}>
          {`instagram   `}
          <Text
            style={styles.textstyle}
            onPress={() => {
              Linking.openURL(`https://www.instagram.com/${instagram_account}`);
            }}
          >
            @{instagram_account}
          </Text>
        </Text>
        <Text style={styles.boldtextstyle}>
          {`원두판매    `}
          <Text style={styles.textstyle}>{sell_beans}</Text>
        </Text>
        <Text style={styles.boldtextstyle}>리뷰 전체 평점</Text>
        <View style={styles.starstyle}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={rating_average}
            fullStarColor={"#FEBF34"}
            starSize={30}
          />
        </View>
        <Text style={styles.boldtextstyle}>상세리뷰</Text>
        <ScrollView style={styles.textalign}>{reviews}</ScrollView>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Addreview", {
            cafe_id: cafe_id,
            user_id: user_id,
          });
        }}
      >
        <Text style={styles.boldtextstyle}>리뷰남기기</Text>
      </TouchableOpacity>
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
  textstyle: {
    justifyContent: "center",
    fontSize: 18,
    marginBottom: 13,
    fontWeight: "300",
  },
  cafenamestyle: {
    alignSelf: "flex-start",
    marginTop: 60,
    width: 250,
    borderBottomColor: "#000000",
    borderBottomWidth: 3,
    marginBottom: 10,
  },
  headtextstyle: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 10,
    color: "#692702",
  },
  boldtextstyle: {
    marginTop: 15,
    fontWeight: "500",
    fontSize: 18,
  },
  starstyle: {
    marginTop: 10,
    width: 80,
  },
  bookmarkstyle: {
    fontSize: 18,
    margin: 5,
    fontWeight: "400",
  },
  bookmarkbutton: {
    padding: 2,
    marginTop: 0,
    marginRight: 25,
    marginHorizontal: 5,
    borderRadius: 5,
    borderColor: "#E9E2E2",
    borderWidth: 3,
  },
  buttonstyle: { alignSelf: "flex-end" },
  reviewstyle: {
    marginRight: 50,
    justifyContent: "center",
    fontSize: 15,
    marginBottom: 13,
    fontWeight: "300",
  },
  textalign: {
    alignSelf: "flex-start",
    height: 600,
  },
});

export default Cafeinfo;
