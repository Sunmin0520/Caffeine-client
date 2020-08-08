import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  AsyncStorage,
  ScrollView,
} from "react-native";
import StarRating from "react-native-star-rating";
import axios from "axios";

const Modifynote = ({ navigation, route }) => {
  const user_id = route.params.user_id;
  const note_id = route.params.note_id;
  // const flavor = route.params.flavor;

  const [name, onChangeName] = useState(route.params.name);
  const [origin, onChangeOrigin] = useState(route.params.origin);
  const [mall, onChangeMall] = useState(route.params.mall);
  const [price, onChangePrice] = useState(route.params.price);
  const [feature, onChangeFeature] = useState(route.params.feature);
  const [rating, onChangeRating] = useState(route.params.rating);
  const [flavor, onChangeFlavor] = useState(route.params.flavor);
  const [arrayflavor, setarrayflavor] = useState([]);
  const [flavorColor, onchangeflavorColor] = useState("#F8F8F5");
  const [selectFlavor, onchangeSelectFlavor] = useState(false);
  //색을 지정해주는 함수를 작성 (모든 flavor에 적용되도록함)
  //if문을 사용하여 flavor 배열 안에 들어있는 flavor들만 갈색으로 바뀌도록 해준다.
  //else 는 그냥 원본색을 놔둔다.
  const handleFlavorColor = (data) => {
    //data는 flavor의 id값
    console.log(flavor);
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
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.headtextstyle}>원두 기록 수정하기</Text>
      </View>
      <ScrollView>
        <View style={styles.container3}>
          <Text style={styles.topText}>원두이름</Text>
          <TextInput
            placeholder="원두이름을 입력해주세요"
            style={styles.textInput}
            onChangeText={(text) => onChangeName(text)}
            value={`${name}`}
          />
        </View>
        <View style={styles.container3}>
          <Text style={styles.topText}>원산지</Text>
          <TextInput
            placeholder="원산지를 입력해주세요"
            style={styles.textInput}
            onChangeText={(text) => onChangeOrigin(text)}
            value={`${origin}`}
          />
        </View>
        <View style={styles.container3}>
          <Text style={styles.topText}>구매처</Text>
          <TextInput
            placeholder="구매처를 입력해주세요"
            style={styles.textInput}
            onChangeText={(text) => onChangeMall(text)}
            value={`${mall}`}
          />
        </View>
        <View style={styles.container3}>
          <Text style={styles.topText}>100g 당 가격</Text>
          <TextInput
            placeholder="가격을 입력해주세요"
            style={styles.textInput}
            onChangeText={(text) => onChangePrice(text)}
            value={`${price}`}
          />
        </View>
        <View style={styles.container3}>
          <Text style={styles.topText}>특징</Text>
          <TextInput
            placeholder="특징을 입력해주세요"
            style={[styles.textInput, { height: 60 }]}
            onChangeText={(text) => onChangeFeature(text)}
            value={`${feature}`}
            multiline
            numberOfLines={3}
          />
        </View>
        <View style={styles.container3}>
          <Text style={styles.topText}>플레이버 노트</Text>
          <View style={styles.container4}>
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
        </View>
        <View style={styles.container3}>
          <Text style={styles.topText}>평점</Text>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={rating}
            selectedStar={(rating) => onChangeRating(rating)}
            fullStarColor={"#FEBF34"}
            starSize={40}
            starStyle={styles.rating}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButtonstyle} onPress={putNoteInfo}>
          <Text style={styles.addNotestyle}>저장하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row",
    // flexWrap: "wrap",
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
  headtextstyle: {
    marginTop: 40,
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 10,
    color: "#692702",
  },
  container3: {
    marginTop: 12,
    paddingBottom: 5,
    width: 320,
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
  },
  container4: {
    marginTop: 5,
    paddingBottom: 5,
    width: 300,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  topText: {
    fontWeight: "800",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
    marginRight: 7,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  flavorbutton: {
    alignItems: "center",
    width: 70,
    padding: 2,
    margin: 2,
    borderRadius: 5,
    borderColor: "#E9E2E2",
    borderWidth: 3,
  },
  flavorbuttonPress: {
    alignItems: "center",
    width: 70,
    padding: 2,
    margin: 2,
    borderRadius: 5,
    borderColor: "#E9E2E2",
    borderWidth: 3,
    backgroundColor: "#E9E2E2",
  },
  footer: {
    margin: 3,
    bottom: 0,
    alignSelf: "flex-start",
  },
  addButtonstyle: {
    backgroundColor: "#7B6D64",
    justifyContent: "center",
    borderRadius: 3,
    padding: 10,
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
  rating: { marginTop: 4 },
  textInput: {
    height: 30,
    paddingLeft: 6,
    backgroundColor: "#f7f7f7",
    borderRadius: 5,
  },
});

export default Modifynote;
