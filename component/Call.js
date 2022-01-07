import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
  Button,
  Alert,
  TextPropTypes,
} from "react-native";

export default function Call() {
  const [text, setText] = useState("");
  const [isCall, setCall] = useState(null);
  const [time, setTime] = useState(0);
  const formatTime = (timer) => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
  
    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }
  
  const objTime = React.useMemo(() => {
    let time = 0;

    let obj = 0;
    function run() {
      obj = setInterval(() => setTime(time++), 1000);
    }
    function stop() {
      setTime(0);
      time = 0;
      clearInterval(obj);
    }
    return { run, stop };
  }, []);

  const onClick = (e) => {
    const checkNumber = () => {
      let patten = /^[0-9\-\+]{9,15}$/;
      return text.match(patten);
    };
    if (text != "" && checkNumber()) {
      setCall(true);

      objTime.run();
    }
    console.log(text);
  };
  const onTermited = (e) => {
    setCall(false);
    setText("");
    objTime.stop();
  };

  return (
    <View style={{ padding: 50 }}>
      <TextInput
        style={{ width: "100%", height: "80%", backgroundColor: 'white', fontSize: 20}}
        placeholder="Input numberPhone!"
        onChangeText={(text) => setText(text)}
        value={text}
      />
      <View style={{ marginTop: 50 , marginLeft:'30%'}} >
      {isCall ?<View> <Text style={styles.outnumber}>{`${text}`} </Text> <Text style={styles.outTime}>{formatTime(`${time}`)} </Text></View> : <Text></Text>}
      </View>
      <View style={{ marginTop: 50 }}>
        {isCall ? (
          <Button
            color={"red"}
            title=" TEMINATED"
            onPress={() => {
              onTermited();
            }}
          />
        ) : (
          <Button
            title=" CALL"
            onPress={() => {
              onClick();
            }}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  outnumber:{
  marginTop: 30,
  alignItems: "center",
  justifyContent: "center",
  fontSize:20,
  color:"white"
},
outTime:{
  marginTop: 20,
  alignItems: "center",
  justifyContent: "center",
  fontSize:20,
  color:"white"
},
});
