import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
} from "react-native";
import axios from "axios";
import StarRating from "react-native-star-rating";
const Notelist = ({ navigation }) => {
  const [noteListUp, setNoteListUp] = useState([]);

  const createdAtFilter = (data) => {
    let date = data.slice(0, 10);
    return date;
  };
  const getNoteList = async () => {
    const value = await AsyncStorage.getItem("userToken");

    axios
      .get("http://13.125.247.226:3001/notes", {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .then((res) => {
        setNoteListUp(
          res.data.map((result) => {
            return result;
          }),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getNoteList();
    navigation.addListener("focus", () => {
      getNoteList();
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.headtextstyle}>원두 기록 히스토리</Text>
      </View>

      <ScrollView>
        {noteListUp.reverse().map((listup) => (
          <View key={listup.id}>
            <TouchableOpacity
              style={styles.noteListStyle}
              onPress={() => {
                navigation.navigate("Noteinfo", {
                  note_id: listup.id,
                  user_id: listup.user_id,
                });
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingBottom: 5,
                }}
              >
                <Text style={styles.topText}>원두</Text>
                <Text style={styles.bottomText}>{listup.name}</Text>
                <Text style={styles.topText}>평점</Text>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={listup.rating}
                  fullStarColor={"#FEBF34"}
                  starSize={17}
                  starStyle={styles.rating}
                />
              </View>
              <View style={styles.container5}>
                <Text style={styles.topText}>특징</Text>
                <Text style={styles.featureText} numberOfLines={1}>
                  {listup.feature}
                </Text>
                <Text style={styles.dateText}>
                  작성된 날짜 {createdAtFilter(listup.createdAt)}
                </Text>
              </View>

              {/* <Text style={styles.routeButtonText}>정보보기</Text> */}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addButtonstyle}
          onPress={() => navigation.navigate("Addnote")}
        >
          <Text style={styles.addNotestyle}>새 노트 추가하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 30,
  },
  container2: {
    marginTop: 20,
    marginBottom: 10,
    width: 300,
    borderBottomColor: "#000000",
    borderBottomWidth: 5,
  },
  container5: {
    marginTop: 5,
    paddingBottom: 5,
    width: 300,
    flexDirection: "column",
    flexWrap: "wrap",
  },
  headtextstyle: {
    marginTop: 40,
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 10,
    color: "#692702",
  },
  noteListStyle: {
    marginTop: 10,
    width: 320,
    borderBottomColor: "#E9E2E2",
    borderBottomWidth: 2,
  },

  topText: {
    fontWeight: "800",
    fontWeight: "bold",
    fontSize: 15,
    marginRight: 5,
  },
  dateText: {
    alignSelf: "flex-start",
    fontSize: 10,
    color: "#878787",
    marginTop: 5,
    marginRight: 15,
  },
  bottomText: {
    fontWeight: "400",
    fontSize: 15,
    width: 150,
    marginRight: 20,
  },
  featureText: {
    fontWeight: "400",
    fontSize: 15,
    width: 320,
    marginRight: 20,
  },
  footer: {
    margin: 3,
    bottom: 0,
    // justifyContent: "center",
    alignSelf: "flex-start",
  },
  addButtonstyle: {
    backgroundColor: "#7B6D64",
    justifyContent: "center",
    borderRadius: 3,
    padding: 1,
    width: 300,
    height: 45,
    margin: 10,
  },
  addNotestyle: {
    alignSelf: "center",
    fontWeight: "400",
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
  rating: {},
});

export default Notelist;
