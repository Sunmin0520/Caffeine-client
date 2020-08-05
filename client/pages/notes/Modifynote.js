import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  AsyncStorage,
} from "react-native";
import StarRating from "react-native-star-rating";
import axios from "axios";

const Modifynote = ({ navigation, route }) => {
  const user_id = route.params.user_id;
  const note_id = route.params.note_id;

  const [name, onChangeName] = useState(route.params.name);
  const [origin, onChangeOrigin] = useState(route.params.origin);
  const [mall, onChangeMall] = useState(route.params.mall);
  const [price, onChangePrice] = useState(route.params.price);
  const [feature, onChangeFeature] = useState(route.params.feature);
  const [rating, onChangeRating] = useState(route.params.rating);
  const [flavor, onChangeFlavor] = useState([]);
  const [arrayflavor, setarrayflavor] = useState([]);

  function onCheckboxBtnClick(selectedNum) {
    const index = flavor.indexOf(selectedNum);
    if (index < 0) {
      flavor.push(selectedNum);
    } else {
      flavor.splice(index, 1);
    }
    onChangeFlavor([...flavor]);
  }

  const putNoteInfo = async () => {
    const value = await AsyncStorage.getItem("userToken");
    axios
      .put(
        `http://13.125.247.226:3001/notes/${note_id}`,
        {
          user_id: user_id,
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
        navigation.navigate("Notelist");
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
        value={`${name}`}
      />
      <Text>원산지</Text>
      <TextInput
        style={{ height: 30, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => onChangeOrigin(text)}
        value={`${origin}`}
      />
      <Text>flavor</Text>
      <View style={styles.container}>
        {arrayflavor.map((result) => (
          <TouchableOpacity
            key={result.id}
            style={{
              alignItems: "center",
              borderWidth: 1,
              width: 80,
              padding: 2,
            }}
            onPress={() => onCheckboxBtnClick(result.id)}
            flavor={(num) => onChangeFlavor(num)}
          >
            <Text>{result.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* <View style={styles.container}>
        <TouchableOpacity
          style={styles.flavorbutton}
          onPress={() => onCheckboxBtnClick(1)}
          flavor={(num) => onChangeFlavor(num)}
        >
          <Text>레몬</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.flavorbutton}
          onPress={() => onCheckboxBtnClick(2)}
          flavor={(num) => onChangeFlavor(num)}
        >
          <Text>사과</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.flavorbutton}
          onPress={() => onCheckboxBtnClick(3)}
          flavor={(num) => onChangeFlavor(num)}
        >
          <Text>포도</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.flavorbutton}
          onPress={() => {
            console.log(flavor);
          }}
        >
          <Text>콘솔테스트</Text>
        </TouchableOpacity>
      </View> */}

      <Text>구매처</Text>
      <TextInput
        style={{ height: 30, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => onChangeMall(text)}
        value={`${mall}`}
      />

      <Text>가격</Text>
      <TextInput
        style={{ height: 30, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => onChangePrice(text)}
        value={`${price}`}
      />

      <Text>특징</Text>
      <TextInput
        style={{ height: 30, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => onChangeFeature(text)}
        value={`${feature}`}
      />

      <Text>평점</Text>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={rating}
        selectedStar={(rating) => onChangeRating(rating)}
        fullStarColor={"#FEBF34"}
      />

      <TouchableOpacity style={styles.button} onPress={putNoteInfo}>
        <Text>저장하기</Text>
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

export default Modifynote;
