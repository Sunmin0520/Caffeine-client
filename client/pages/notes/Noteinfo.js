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
                //flavor onpress를 눌러서 flavor 함수실행 함수는 notes의 모든 노트를 불러온다.
              }}
              // onPress={() => {
              //   filteringFlavor(result.id);
              // }}
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>정말 삭제하시겠습니까?</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                deleteNoteInfo();
                setModalVisible(!modalVisible);
              }}
            >
              <Text>YES</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text>NO</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>삭제하기</Text>
      </TouchableHighlight>
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
    marginBottom: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 60,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 15,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Noteinfo;
