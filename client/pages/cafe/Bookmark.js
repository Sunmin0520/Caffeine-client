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
  const [bookmarks, Setbookmarks] = useState(null);

  const getBookmarkcall = async () => {
    const value = await AsyncStorage.getItem("userToken");
    axios
      .get("http://13.125.247.226:3001/cafes/bookmark/all", {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .then((res) => {
        getCafeinfoCall(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getCafeinfoCall = async (data) => {
    const value = await AsyncStorage.getItem("userToken");
    axios
      .get("http://13.125.247.226:3001/cafes/allcafes", {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .then((res) => {
        let arr = [];
        arr.push(res.data);
        let dataArr = [];
        for (let i = 0; i < arr[0].length; i++) {
          // console.log(arr[0][i].id);
          for (let j = 0; j < data.length; j++) {
            // console.log(data[j].cafe_id);
            if (data[j].cafe_id === arr[0][i].id) {
              dataArr.push({
                id: arr[0][i].id,
                name: arr[0][i].name,
                address: arr[0][i].address,
                bookmark_id: data[j].bookmark_id,
              });
            }
          }
        }
        return dataArr;
      })
      .then((result) => {
        console.log(result);
        Setbookmarks(
          result.map((data) => {
            return (
              <View key={data.id} style={styles.liststyle}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Cafeinfo", {
                      cafe_id: data.id,
                    });
                  }}
                >
                  <Text style={styles.textstyle}>{data.name}</Text>
                  <Text style={styles.addressstyle} numberOfLines={1}>
                    {data.address}
                  </Text>
                </TouchableOpacity>
                <View style={styles.aligndelete}>
                  <TouchableOpacity
                    onPress={() => {
                      handleDeleteBookmark(data.bookmark_id);
                    }}
                  >
                    <Text style={styles.deletestyle}>삭제하기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDeleteBookmark = async (bookmark_id) => {
    const value = await AsyncStorage.getItem("userToken");
    axios
      .delete(`http://13.125.247.226:3001/cafes/bookmark/${bookmark_id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBookmarkcall();
  }, [bookmarks]);

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
  aligndelete: {
    alignSelf: "flex-end",
  },
  deletestyle: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 5,
  },
});

export default Bookmark;
