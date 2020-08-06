import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  AsyncStorage,
} from "react-native";
import StarRating from "react-native-star-rating";
import axios from "axios";

const Addnote = ({ navigation, route }) => {
  const [name, onChangeName] = useState("");
  const [origin, onChangeOrigin] = useState("");
  const [mall, onChangeMall] = useState("");
  const [price, onChangePrice] = useState("");
  const [feature, onChangeFeature] = useState("");
  const [rating, onChangeRating] = useState(0);
  const [flavor, onChangeFlavor] = useState([]);
  const [arrayflavor, setarrayflavor] = useState([]);

  const handleFlavorColor = (data) => {
    //data는 flavor의 id값
    if (flavor.includes(data)) {
      return true;
    } else {
      return false;
    }
  };

  function onCheckboxBtnClick(selectedNum) {
    const index = flavor.indexOf(selectedNum);
    if (index < 0) {
      flavor.push(selectedNum);
    } else {
      flavor.splice(index, 1);
    }
    onChangeFlavor([...flavor]);
  }

  const postAddnote = async () => {
    const value = await AsyncStorage.getItem("userToken");
    axios
      .post(
        "http://13.125.247.226:3001/notes",
        {
          name: name,
          origin: origin,
          mall: mall,
          price: price,
          flavor: flavor,
          feature: feature,
          rating: rating,
        },
        //withCredentials는 origin이 다른 http 통신에서는 request header에 쿠키가 자동으로 들어가지 않기 때문에 client쪽에서 설정해주어야 하는 옵션
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${value}`,
          },
        },
      )
      .then((result) => {
        console.log(result);
        //name 빈칸이 안되도록하기
        navigation.goBack();
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
    getflavorinfo();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F5" }}>
      <Text>원두이름</Text>
      <TextInput
        style={{ height: 30, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => onChangeName(text)}
      />
      <Text>원산지</Text>
      <TextInput
        style={{ height: 30, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => onChangeOrigin(text)}
      />
      <Text>flavor</Text>
      <View style={styles.container}>
        {arrayflavor.map((result) => (
          <TouchableOpacity
            key={result.id}
            style={
              handleFlavorColor(result.id)
                ? styles.flavorbuttonPress
                : styles.flavorbutton
            }
            onPress={() => {
              onCheckboxBtnClick(result.id);
            }}
            flavor={(num) => onChangeFlavor(num)}
          >
            <Text>{result.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text>구매처</Text>
      <TextInput
        style={{ height: 30, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => onChangeMall(text)}
      />

      <Text>가격</Text>
      <TextInput
        style={{ height: 30, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(number) => onChangePrice(number)}
      />

      <Text>특징</Text>
      <TextInput
        style={{ height: 30, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => onChangeFeature(text)}
      />

      <Text>평점</Text>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={rating}
        selectedStar={(rating) => onChangeRating(rating)}
        fullStarColor={"#FEBF34"}
      />

      <TouchableOpacity style={styles.button} onPress={postAddnote}>
        <Text>등록하기</Text>
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
  flavorbutton: {
    backgroundColor: "#F8F8F5",
    alignItems: "center",
    borderWidth: 1,
    width: 80,
    padding: 2,
  },
  flavorbuttonPress: {
    backgroundColor: "yellow",
    alignItems: "center",
    borderWidth: 1,
    width: 80,
    padding: 2,
  },
});

export default Addnote;
