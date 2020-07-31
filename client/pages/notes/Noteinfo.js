import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  AsyncStorage,
} from "react-native";
import StarRating from "react-native-star-rating";
import axios from "axios";

const Noteinfo = ({ navigation, route }) => {
  const user_id = route.params.user_id;
  const note_id = route.params.note_id;
  //const rating = route.params.rating;

  const [name, setName] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [mall, setMall] = useState(null);
  const [price, setPrice] = useState(null);
  const [feature, setFeature] = useState(null);
  const [flavor, setFlavor] = useState([]);
  const [rating, setRating] = useState(route.params.rating);

  // const getflavorinfo = async ({ noteflavor }) => {
  //   const value = await AsyncStorage.getItem("userToken");
  //   axios
  //     .get(`http://13.125.247.226:3001/notes/flavor/all`, {
  //       headers: {
  //         Authorization: `Bearer ${value}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       let store = [];
  //       res.data.map((result) => {
  //         for (let i = 0; i < noteflavor.length; i++) {
  //           if (noteflavor[i] === result.id) {
  //             store.push(result.name);
  //           }
  //         }
  //       });
  //       console.log(store);
  //       return store;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const getNoteInfo = async () => {
    const value = await AsyncStorage.getItem("userToken");

    axios
      .get(`http://13.125.247.226:3001/notes/${note_id}`, {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setName(res.data.name),
          setOrigin(res.data.origin),
          setMall(res.data.mall),
          setPrice(res.data.price),
          setFeature(res.data.feature),
          //setFlavor(res.data.flavor);
          setRating(res.data.rating);
        // setNoteListUp(
        //   res.data.map((result) => {
        //     return result;
        //   }),
        // );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getNoteInfo();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F5" }}>
      <Text>{name}</Text>
      <Text>{origin}</Text>
      <Text>{mall}</Text>
      <Text>{price}</Text>
      <Text>{feature}</Text>
      <Text>{flavor}</Text>
      <StarRating
        disabled={true}
        maxStars={5}
        rating={rating}
        fullStarColor={"#FEBF34"}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Modifynote", {
            name: name,
            origin: origin,
            mall: mall,
            price: price,
            feature: feature,
            rating: rating,
          })
        }
      >
        <Text>수정하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Modifynote", {
            name: name,
            origin: origin,
            mall: mall,
            price: price,
            feature: feature,
            rating: rating,
          })
        }
      >
        <Text>삭제하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});

export default Noteinfo;
