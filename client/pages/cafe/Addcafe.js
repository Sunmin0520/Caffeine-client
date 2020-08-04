import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
} from "react-native";
import axios from "axios";
import Postcode from "react-native-daum-postcode";
import { createStackNavigator } from "@react-navigation/stack";
const MainStack = createStackNavigator();

// const [address, setAddress] = useState("");
// const pushAddress = () => {
//   console.log("강준혁");
//   //console.log(address);
//   //alert(JSON.stringify(address));
//   navigation.navigate("Addcafe");
// };
// useEffect(() => {
//   if (address !== "") {
//     console.log(`우리꺼${address}`);
//     handleAddress();
//   }
// }, [address]);

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
  //새로운 카페를 등록할 수 있습니다.
  const [name, Setname] = useState(null);
  const [address, Setaddress] = useState(null);
  const [sell_beans, Setsell_beans] = useState(true);
  const [instagram_account, Setinstagram_account] = useState(null);
  const [Yes, SetYes] = useState("#ffa9a3");
  const [No, SetNo] = useState("#e0e0e0");
  const [RNPickerSelects, SetRNPickerSelects] = useState(null);
  const [region_id, Setregion_id] = useState(null);

  // const getRegionList = async () => {
  //   const value = await AsyncStorage.getItem("userToken");
  //   axios
  //     .get("http://13.125.247.226:3001/cafes", {
  //       headers: {
  //         Authorization: `Bearer ${value}`,
  //       },
  //     })
  //     .then((res) => {
  //       SetRNPickerSelects(
  //         res.data.map((result) => {
  //           return (
  //             <RNPickerSelect
  //               key={result.id}
  //               onValueChange={(value) => console.log(value)}
  //               placeholder="Select an item..."
  //               items={{
  //                 label: result.id,
  //                 value: result.name,
  //               }}
  //             />
  //           );
  //         })
  //       );
  //     })
  //     .catch(function (error) {
  //       console.log(error); //401{result:"token expired"} 수정예정
  //     });
  // };

  const postCafeCall = async () => {
    const value = await AsyncStorage.getItem("userToken");
    axios
      .post(
        "http://13.125.247.226:3001/cafes",
        {
          region_id: 1,
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
        //status 200 ok
        console.log(res);
        alert(JSON.stringify(res));
      })
      .catch(function (error) {
        console.log(error); //401{result:"token expired"} 수정예정
      });
  };

  const handleSellYes = () => {
    SetNo("#e0e0e0");
    SetYes("#ffa9a3");
    Setsell_beans(true);
  };

  const handleSellNo = () => {
    SetYes("#e0e0e0");
    SetNo("#ffa9a3");
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
    postCafeCall();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textstyle}>새로운 카페 등록</Text>
      <Text style={styles.textstyle}>상호명</Text>
      <TextInput
        style={styles.textstyle}
        placeholder={"상호명을 입력해주세요"}
        onChangeText={(text) => Setname(text)}
        value={name}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ApiScreen", {
              handleAddress: (data) => getapiaddress(data),
            });
            // getapiaddress();
          }}
        >
          <Text>주소</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.textstyle}>{address}</Text>
      {RNPickerSelects}
      {/* 주소 입력  */}
      <TextInput
        style={styles.textstyle}
        //placeholder={"주소 테스트"}
        onChangeText={(text) => Setaddress(text)}
        value={address}
      />
      <Text style={styles.textstyle}>원두를 판매하나요?</Text>
      {/* 판매여부 버튼 생성 */}
      <TouchableOpacity
        onPress={() => {
          handleSellYes();
        }}
      >
        <Text style={styles.textstyle}>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleSellNo();
        }}
      >
        <Text style={styles.textstyle}>No</Text>
      </TouchableOpacity>
      <Text style={styles.textstyle}>인스타그램 계정</Text>
      <TextInput
        style={styles.textstyle}
        placeholder={"계정 아이디만 적어주세요"}
        onChangeText={(text) => Setinstagram_account(text)}
        value={instagram_account}
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Region");
          postCafeCall();
        }}
      >
        <Text style={styles.textstyle}>등록하기</Text>
      </TouchableOpacity>
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
    justifyContent: "center",
  },
  textstyle: {
    justifyContent: "center",
    fontSize: 18,
    margin: 10,
  },
});

export default addcafeScreen;
