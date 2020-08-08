import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Regionlist from "./Regionlist";
import Region from "./Region";
import Cafeinfo from "./Cafeinfo";
import Addreview from "./Addreview";
import addcafeScreen from "./Addcafe";
import Addcafe from "./Addcafe";
import Bookmark from "./Bookmark";

const Stack = createStackNavigator();

function Cafes() {
  return (
    <Stack.Navigator
      style={{ marginTop: 25 }}
      tabBarOptions={{
        style: {
          backgroundColor: "white",
        },
        indicatorStyle: { backgroundColor: "#DB7093" },
      }}
      screenOptions={{
        headerStyle: {},
        headerTintColor: "#fff",
        headerBackTitleVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name="Regionlist" component={Regionlist} />
      <Stack.Screen name="Region" component={Region} />
      <Stack.Screen name="Cafeinfo" component={Cafeinfo} />
      <Stack.Screen name="Addreview" component={Addreview} />
      <Stack.Screen name="addcafeScreen" component={addcafeScreen} />
      <Stack.Screen name="Addcafe" component={Addcafe} />
      <Stack.Screen name="Bookmark" component={Bookmark} />
    </Stack.Navigator>
  );
}

export default Cafes;
