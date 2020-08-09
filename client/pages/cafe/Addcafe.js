import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";
import Postcode from "react-native-daum-postcode";
import { createStackNavigator } from "@react-navigation/stack";
const MainStack = createStackNavigator();

const ApiScreen = ({ route }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
      <Postcode
        style={{ width: 400 }}
        jsOptions={{ animated: true }}
        onSelected={(data) => {
          route.params.handleAddress(data);
        }}
      />
    </View>
  );
};

const Addcafe = ({ route, navigation }) => {
  const [name, Setname] = useState(null);
  const [address, Setaddress] = useState(null);
  const [sell_beans, Setsell_beans] = useState(true);
  const [instagram_account, Setinstagram_account] = useState(null);
  const [select_region, Setselect_region] = useState(null);
  const [region_id, Setregion_id] = useState(null);
  const [colors, Setcolors] = useState(false);

  const getRegionList = async () => {
    const value = await AsyncStorage.getItem("userToken");
    axios
      .get("http://13.125.247.226:3001/cafes", {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .then((res) => {
        Setselect_region(
          res.data.map((result) => {
            const handlechangeColor = (data) => {
              if (result.id === data) {
                return true;
              } else {
                return false;
              }
            };
            return (
              <TouchableOpacity
                key={result.id}
                onPress={() => {
                  Setregion_id(result.id);
                }}
              >
                <Text
                  style={
                    handlechangeColor(region_id)
                      ? styles.active
                      : styles.nonactive
                  }
                >
                  {result.name}
                </Text>
              </TouchableOpacity>
            );
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const postCafeCall = async () => {
    const value = await AsyncStorage.getItem("userToken");
    axios
      .post(
        "http://13.125.247.226:3001/cafes",
        {
          region_id: region_id,
          name: name,
          address: address,
          sell_beans: sell_beans,
          instagram_account: instagram_account,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${value}`,
          },
        }
      ) // Serverside진행후 수정예정입니다.
      .then((res) => {
        if (res.status === 201) {
          alert("정상 등록되었습니다");
        }
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status === 409) {
          return alert(
            "동일한 주소로 등록된 카페가 있습니다. 다시 한번 확인해주세요"
          );
        } else if (error.response.status === 401) {
          return alert(
            "정상적인 접근이 아닙니다. 로그아웃 후 다시 로그인 해주세요"
          );
        }
      });
  };

  const handleSellYes = () => {
    Setsell_beans(true);
  };

  const handleSellNo = () => {
    Setsell_beans(false);
  };

  const getapiaddress = (data) => {
    console.log(data);
    //const searchAddress = `${data.address} ${data.buildingName}`;
    Setaddress(`${data.address} ${data.buildingName}`);
    // 필요한 값만 가져옴
    navigation.navigate("Addcafe");
  };

  useEffect(() => {
    getRegionList();
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container2}>
        <View style={styles.headlinestyle}>
          <Text style={styles.headtextstyle}>새로운 카페 소개</Text>
        </View>
        <Text style={styles.textstyle}>카페의 이름을 입력해주세요</Text>

        <TextInput
          style={styles.textinputstyle}
          multiline={false}
          maxLength={20}
          placeholder={"카페의 이름을 입력해주세요"}
          onChangeText={(text) => Setname(text)}
          value={name}
        />
        <View style={styles.inputlinestyle}></View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ApiScreen", {
                handleAddress: (data) => getapiaddress(data),
              });
              // getapiaddress();
            }}
          >
            <Text style={styles.addresstextstyle}>주소를 검색해주세요</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.textstyle}>{address}</Text>
        <Text style={styles.textstyle}>지역 카테고리를 선택해주세요</Text>
        <View style={styles.flexwrapstyle}>{select_region}</View>

        <Text style={styles.textstyle}>원두를 판매하나요?</Text>
        <View style={styles.flexwrapstyle}>
          <TouchableOpacity
            onPress={() => {
              handleSellYes();
            }}
          >
            <Text style={sell_beans ? styles.active : styles.nonactive}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleSellNo();
            }}
          >
            <Text style={!sell_beans ? styles.active : styles.nonactive}>
              No
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.textstyle}>카페의 인스타그램 계정</Text>
        <TextInput
          style={styles.textinputstyle}
          multiline={false}
          maxLength={25}
          placeholder={"계정 아이디만 적어주세요"}
          onChangeText={(text) => Setinstagram_account(text)}
          value={instagram_account}
        />
        <View style={styles.inputlinestyle}></View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Region");
            postCafeCall();
          }}
        >
          <Text style={styles.textstyle}>등록하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

function addcafeScreen() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Addcafe" component={Addcafe} />
      <MainStack.Screen name="ApiScreen" component={ApiScreen} />
    </MainStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingLeft: 20,
  },
  container2: {
    alignSelf: "flex-start",
    marginTop: 60,
  },
  textstyle: {
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 20,
  },
  addresstextstyle: {
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "500",
  },
  active: {
    color: "#ffa9a3",
    justifyContent: "center",
    fontSize: 18,
    marginHorizontal: 10,
    marginBottom: 20,
    fontWeight: "bold",
  },
  nonactive: {
    color: "#e0e0e0",
    justifyContent: "center",
    fontSize: 18,
    marginHorizontal: 10,
    marginBottom: 20,
    fontWeight: "bold",
  },
  flexwrapstyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 300,
  },
  headtextstyle: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 10,
    color: "#692702",
  },
  headlinestyle: {
    width: 250,
    borderBottomColor: "#000000",
    borderBottomWidth: 3,
    marginBottom: 10,
  },
  textinputstyle: {
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 10,
    flexWrap: "wrap",
    width: 200,
  },
  inputlinestyle: {
    width: 250,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 30,
  },
});

export default addcafeScreen;
