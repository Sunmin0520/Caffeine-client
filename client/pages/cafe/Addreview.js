import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
} from "react-native";
import axios from "axios";
import StarRating from "react-native-star-rating";

const Addreview = ({ route, navigation }) => {
  //Cafeinfo 선택한 카페의 리뷰를 작성할수 있습니다.
  const cafe_id = route.params.cafe_id; //Cafeinfo에서 선택한 카페의 ID입니다.
  const user_id = route.params.user_id;

  const [review, onChangereview] = useState(null);
  const [rating, onChangeRating] = useState(0);
  const postReviewCall = async () => {
    const value = await AsyncStorage.getItem("userToken");
    axios
      .post(
        `http://13.125.247.226:3001/cafes/${cafe_id}`,
        { text: review, rating: rating },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${value}`,
          },
        }
      )
      .then((res) => {
        //status 200 ok
        console.log(rating);
        alert(JSON.stringify(res)); // 수정예정
      })
      .catch(function (error) {
        console.log(error); //401{result:"token expired"} 수정예정
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textstyle}>이 카페에서의 경험을 공유해주세요</Text>
      <StarRating
        disabled={false}
        maxStars={5}
        selectedStar={(rating) => onChangeRating(rating)}
        rating={rating}
        fullStarColor={"#FEBF34"}
      />
      <TextInput
        style={styles.textstyle}
        placeholder={"리뷰를 작성해주세요"}
        onChangeText={(text) => onChangereview(text)}
        value={review}
      />
      <TouchableOpacity
        onPress={() => {
          postReviewCall();
          navigation.navigate("Cafeinfo");
        }}
      >
        <Text style={styles.textstyle}>등록하기</Text>
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

export default Addreview;
