import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Addnote from "./Addnote";
import Notelist from "./Notelist";
import Noteinfo from "./Noteinfo";
import Modifynote from "./Modifynote";

const Stack = createStackNavigator();

function Notes() {
  return (
    <Stack.Navigator
      style={{ marginTop: 25 }}
      tabBarOptions={{
        style: {
          backgroundColor: "white",
        },
        indicatorStyle: { backgroundColor: "#DB7093" },
      }}
    >
      <Stack.Screen name="Notelist" component={Notelist} />
      <Stack.Screen name="Noteinfo" component={Noteinfo} />
      <Stack.Screen name="Modifynote" component={Modifynote} />
      <Stack.Screen name="Addnote" component={Addnote} />
    </Stack.Navigator>
  );
}

export default Notes;
