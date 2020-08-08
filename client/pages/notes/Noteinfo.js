import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  AsyncStorage,
  Alert,
  Modal,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import StarRating from "react-native-star-rating";
import axios from "axios";
//import Modal from "react-native-modal";

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
  const [modalVisible, setModalVisible] = useState(false);

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
  const deleteNoteInfo = async () => {
    const value = await AsyncStorage.getItem("userToken");
    axios
      .delete(
        `http://13.125.247.226:3001/notes/${note_id}`,
        // {
        //   note_id: note_id, //params 적으면안되는것 같습니다.
        // },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${value}`,
          },
        },
      )
      .then((res) => {
        //console.log(res.data.flavor);
        //console.log();
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const filteringFlavor = (data) => {
  //   console.log(data);
  // };

  useEffect(() => {
    getNoteInfo();
    getflavorinfo();
    //deleteNoteInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.headtextstyle}>{name}</Text>
      </View>
      <ScrollView>
        <View style={styles.container3}>
          <Text style={styles.topText}>원산지</Text>
          <Text style={styles.bottomText}>{origin}</Text>
        </View>
        <View style={styles.container3}>
          <Text style={styles.topText}>구입한 곳</Text>
          <Text style={styles.bottomText}>{mall}</Text>
        </View>
        <View style={styles.container3}>
          <Text style={styles.topText}>가격</Text>
          <Text style={styles.bottomText}>{price}원 / 100g </Text>
        </View>
        <View style={styles.container3}>
          <Text style={styles.topText}>특징</Text>
          <Text style={styles.bottomText}>{feature}</Text>
        </View>
        <View style={styles.container3}>
          <Text style={styles.topText}>플레이버 노트</Text>
          <View style={styles.container4}>
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
                  style={styles.flavorbutton}
                  // onPress={() => {
                  //   filteringFlavor(result.id);
                  // }}
                >
                  <Text>{result.name}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>

        <View style={styles.container3}>
          <Text style={styles.topText}>평점</Text>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={rating}
            fullStarColor={"#FEBF34"}
            starSize={40}
            starStyle={styles.rating}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
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
          <Text style={styles.bottonTextWhite}>수정하기</Text>
        </TouchableOpacity>

        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.bottonTextWhite}>삭제하기</Text>
        </TouchableHighlight>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>정말 삭제하시겠습니까?</Text>
            <Text style={styles.modalWarningText}>
              삭제시, 복구할 수 없습니다.
            </Text>
            <TouchableHighlight
              style={styles.yesButton}
              onPress={() => {
                deleteNoteInfo();
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.bottonTextWhite}>YES</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.noButton}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.modalNotext}>NO</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 30,
    // flexDirection: "row",
    // flexWrap: "wrap",
  },
  container2: {
    marginTop: 20,
    marginBottom: 10,
    width: 300,
    borderBottomColor: "#000000",
    borderBottomWidth: 5,
  },
  container3: {
    marginTop: 12,
    paddingBottom: 5,
    width: 300,
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
  headtextstyle: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 10,
    color: "#692702",
  },
  topText: {
    fontWeight: "800",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
    marginRight: 7,
  },
  bottomText: {
    fontWeight: "400",
    fontSize: 15,
    width: 300,
    marginRight: 20,
  },
  rating: { marginTop: 4 },
  footer: {
    flexDirection: "row",
    flexWrap: "wrap",
    bottom: 0,
    alignContent: "center",
  },

  button: {
    alignItems: "center",
    backgroundColor: "#7B6D64",
    borderRadius: 5,
    padding: 10,
    width: 160,
    height: 45,
    margin: 5,
  },
  bottonTextWhite: {
    fontWeight: "400",
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
  flavorbutton: {
    alignItems: "center",
    width: 70,
    padding: 2,
    margin: 2,
    borderRadius: 5,
    backgroundColor: "#E9E2E2",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 280,
    height: 220,
  },
  yesButton: {
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#7B6D64",
    padding: 8,
    width: 200,
    height: 40,
    margin: 5,
    marginTop: 10,
  },
  modalText: {
    fontWeight: "800",
    fontSize: 15,
    marginBottom: 10,
    marginRight: 7,
  },
  noButton: {
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#D7D2CB",
    padding: 8,
    width: 200,
    height: 40,
    margin: 5,
  },
  modalWarningText: {
    fontWeight: "300",
    color: "red",
    fontSize: 10,
  },
  modalNotext: {
    fontWeight: "400",
    fontWeight: "bold",
    color: "#7F736B",
    fontSize: 16,
  },
});

export default Noteinfo;
