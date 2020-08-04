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
        Setbookmarks(
          res.data.map((el) => {
            getCafeinfoCall(el);
          })
        );
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
        console.log("hello", res.data.name);

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
        });
      })
      .catch(function (error) {
        console.log(error); //401{result:"token expired"} 수정예정
      });
  };

  useEffect(() => {
    getBookmarkcall();
    getCafeinfoCall();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textstyle}>북마크 입니다</Text>
      {bookmarks}
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
