import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
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
      .get("http://13.125.247.226:3001/cafes/bookmark/all", {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .then((res) => {
        let dataArr = [];

        for (let i = 0; i < res.data.length; i++) {
          dataArr.push(res.data[i].cafe_id);
        }
        return dataArr;
      })
      .then((data) => {
        getCafeinfoCall(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getCafeinfoCall = async (cafeId) => {
    const value = await AsyncStorage.getItem("userToken");
    axios
      .get("http://13.125.247.226:3001/cafes/allcafes", {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .then((res) => {
        let arr = [];
        let nameArr = [];
        for (let k = 0; k < res.data.length; k++) {
          arr.push(res.data[k]);
        }
        for (let i = 0; i < cafeId.length; i++) {
          for (let j = 0; j < arr.length; j++) {
            if (cafeId[i] === arr[j].id) {
              nameArr.push({
                id: arr[j].id,
                name: arr[j].name,
                address: arr[j].address,
                region_id: arr[i].region_id,
              });
            }
          }
        }
        return nameArr;
      })
      .then((data) => {
        Setbookmarks(
          data.map((result) => {
            Setaddress(result.id);
            return (
              <View key={result.id}>
                <TouchableOpacity
                  style={styles.liststyle}
                  onPress={() => {
                    navigation.navigate("Cafeinfo", {
                      cafe_id: result.id,
                    });
                  }}
                >
                  <Text style={styles.textstyle}>{result.name}</Text>
                  <Text style={styles.addressstyle} numberOfLines={1}>
                    {result.address}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDeleteBookmark = async () => {
    const value = await AsyncStorage.getItem("userToken");
    axios
      .delete(`http://13.125.247.226:3001/cafes/bookmark/${address}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getBookmarkcall();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.headlinestyle}>
          <Text style={styles.headtextstyle}>Bookmark</Text>
        </View>
        {bookmarks}
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
  },
  textstyle: {
    fontWeight: "500",
    fontSize: 20,
    marginTop: 20,
  },
  addressstyle: {
    fontSize: 17,
    fontWeight: "400",
    marginVertical: 5,
  },
  liststyle: {
    marginTop: 10,
    width: 330,
    borderBottomColor: "#E9E2E2",
    borderBottomWidth: 2,
  },
  headlinestyle: {
    marginTop: 60,
    width: 200,
    borderBottomColor: "#000000",
    borderBottomWidth: 3,
  },
  headtextstyle: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 10,
    color: "#692702",
  },
});

export default Bookmark;
