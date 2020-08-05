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
  //const user_id = route.params.user_id;
  const note_id = route.params.note_id;
  //const rating = route.params.rating;

  const [name, setName] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [mall, setMall] = useState(null);
  const [price, setPrice] = useState(null);
  const [feature, setFeature] = useState(null);
  const [flavor, setFlavor] = useState([]);
  const [rating, setRating] = useState(route.params.rating);
  const [arrayflavor, setarrayflavor] = useState([]);

  const getNoteInfo = async () => {
    const value = await AsyncStorage.getItem("userToken");

    axios
      .get(`http://13.125.247.226:3001/notes/${note_id}`, {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .then((res) => {
        return (
          setName(res.data.name),
          setOrigin(res.data.origin),
          setMall(res.data.mall),
          setPrice(res.data.price),
          setFeature(res.data.feature),
          setFlavor(res.data.flavor),
          setRating(res.data.rating)
        );
        //console.log(res.data.flavor);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const getflavorinfo = async () => {
    const value = await AsyncStorage.getItem("userToken");
    axios
      .get(`http://13.125.247.226:3001/notes/flavor/all`, {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .then((res) => {
        //console.log(res.data);

        setarrayflavor(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getNoteInfo();
    getflavorinfo();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F5" }}>
      <Text>{name}</Text>
      <Text>{origin}</Text>
      <Text>{mall}</Text>
      <Text>{price}</Text>
      <Text>{feature}</Text>
      {/* <Text>{flavor}</Text> */}
      {/* {console.log(arrayflavor)} */}
      <View style={styles.container}>
        {arrayflavor
          .filter((data) => {
            for (let i = 0; i < flavor.length; i++) {
              if (flavor[i] === data.id) {
                return data.name;
              }
            }
          })
          .map((result) => (
            <TouchableOpacity
              key={result.id}
              style={{
                alignItems: "center",
                borderWidth: 1,
                width: 80,
                padding: 2,
              }}
            >
              <Text>{result.name}</Text>
            </TouchableOpacity>
          ))}
      </View>

      <StarRating
        disabled={true}
        maxStars={5}
        rating={rating}
        fullStarColor={"#FEBF34"}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.replace("Modifynote", {
            note_id: note_id,
            name: name,
            origin: origin,
            mall: mall,
            price: price,
            feature: feature,
            rating: rating,
            flavor: flavor,
          })
        }
      >
        <Text>수정하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Modifynote", {
            note_id: note_id,
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
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});

export default Noteinfo;
