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

// const getflavor = () => {
//   axios
//     .get("http://localhost:3001/flavors")
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

const Addnote = ({ navigation, route }) => {
  //const user_id = route.params.user_id;

  const [lemonColor, onchangelemonColor] = useState("#F8F8F5");
  const [grapeColor, onchangegrapeColor] = useState("#F8F8F5");
  const [appleColor, onchangeappleColor] = useState("#F8F8F5");
  const [pressed, onchangepressed] = useState(false);
  const [grapepressed, onchangegrapepressed] = useState(false);
  const [applepressed, onchangeapplepressed] = useState(false);
  const [name, onChangeName] = useState("");
  const [origin, onChangeOrigin] = useState("");
  const [mall, onChangeMall] = useState("");
  const [price, onChangePrice] = useState(0);
  const [feature, onChangeFeature] = useState("");
  const [rating, onChangeRating] = useState(0);
  //const [flavor, onChangeFlavor] = useState([]);
  const [flavor, onChangeFlavor] = useState([]);

  //const id = route.params.user_id;

  const myNoteFlavor = [];

  function onCheckboxBtnClick(selectedNum) {
    const index = flavor.indexOf(selectedNum);
    if (index < 0) {
      flavor.push(selectedNum);
    } else {
      flavor.splice(index, 1);
    }
    onChangeFlavor([...flavor]);
  }
  const changeLemonColor = () => {
    if (!pressed) {
      onchangelemonColor("yellow");
      onchangepressed(true);
    } else {
      onchangelemonColor("#F8F8F5");
      onchangepressed(false);
    }
  };

  const changeAppleColor = () => {
    if (!applepressed) {
      onchangeappleColor("red");
      onchangeapplepressed(true);
    } else {
      onchangeappleColor("#F8F8F5");
      onchangeapplepressed(false);
    }
  };

  const changeGrapeColor = () => {
    if (!grapepressed) {
      onchangegrapeColor("#806B98");
      onchangegrapepressed(true);
    } else {
      onchangegrapeColor("#F8F8F5");
      onchangegrapepressed(false);
    }
  };

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
        navigation.navigate("Notelist");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   getflavor();
  // });

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
        <TouchableOpacity
          style={{
            backgroundColor: lemonColor,
            flex: 1,
            alignItems: "center",
            borderWidth: 1,
            padding: 2,
          }}
          onPress={() => {
            onCheckboxBtnClick(1);
            changeLemonColor();
          }}
          flavor={(num) => onChangeFlavor(num)}
        >
          <Text>레몬</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: appleColor,
            flex: 1,
            alignItems: "center",
            borderWidth: 1,
            padding: 2,
          }}
          onPress={() => {
            onCheckboxBtnClick(2);
            changeAppleColor();
          }}
          flavor={(num) => onChangeFlavor(num)}
        >
          <Text>사과</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: grapeColor,
            flex: 1,
            alignItems: "center",
            borderWidth: 1,
            padding: 2,
          }}
          onPress={() => {
            onCheckboxBtnClick(3);
            changeGrapeColor();
          }}
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

      <TouchableOpacity style={styles.postbutton} onPress={postAddnote}>
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
  flavorbutton: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    padding: 2,
  },
  postbutton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});

export default Addnote;
