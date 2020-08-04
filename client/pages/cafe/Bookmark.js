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

const Bookmark = ({ route, navigation }) => {
  //Regionlist에서 선택한 지역의 카페 목록을 가져옵니다.

  const [cafe_id, Setcafe_id] = useState(null);
  const [bookmarks, Setbookmarks] = useState(null);
  const [name, Setname] = useState(null);
  const [address, Setaddress] = useState(null);

  const getBookmarkcall = async () => {
    //get cafes table
    const value = await AsyncStorage.getItem("userToken");
    axios
      .get(`http://13.125.247.226:3001/cafes/bookmark/all`, {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .then((res) => {
        let dataArr = Object.entries(res.data);
        for (let i = 0; i < dataArr[1][1].length; i++) {
          getCafeinfoCall(dataArr[1][1][i]);
        }
      });
  };

  const getCafeinfoCall = async (id) => {
    const value = await AsyncStorage.getItem("userToken");
    axios
      .get(`http://13.125.247.226:3001/cafes/${id}`, {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .then((res) => {
        console.log("name", res.data["name"]);
      })
      .catch(function (error) {
        console.log(error); //401{result:"token expired"} 수정예정
      });
  };

  const handleDeleteBookmark = async (bookmark_id) => {
    const value = await AsyncStorage.getItem("userToken");
    axios
      .post(`http://13.125.247.226:3001/cafes/bookmark/${bookmark_id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .then((res) => {
        //status 200 ok
        console.log(rating);
        alert(JSON.stringify(res)); // 수정예정
      })
      .catch(function (error) {
        console.log(error); //401{result:"token expired"} 수정예정
      });
  };

  useEffect(() => {
    getBookmarkcall();
    getCafeinfoCall();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.textstyle}>북마크 입니다</Text>
      {name}
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

export default Bookmark;
