import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Button } from "react-native-paper";

export default function index() {
  const [logo, setLogo] = useState(false);
  const [button, setButton] = useState(false);
  const [text, setText] = useState("Halooo Selamat Datang");
  const [text1, setText1] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLogo(false);
    }, 10000);
    setTimeout(() => {
      setButton(true);
    }, 9000);
    setTimeout(() => {
      setText("di Aplikasi Todo List");
      setTimeout(() => {
        setText("Todo Apps");
      }, 6500);
    }, 3000);
    setTimeout(() => {
      setText1("Silahkan Login/Register Terlebih Dahulu");
    }, 7000);
  }, []);
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          position: "absolute",
          zIndex: 10,
          opacity: !logo ? 100 : 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={styles.image}
          source="https://play-lh.googleusercontent.com/92xIZAW-mdwucFX1v8kyTXlLVgZfLczHv8XCVOH1tFc0M3cTRI4q9qJLUM96PqCrgWjc"
          contentFit="cover"
          transition={1000}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 5 }}>
          {text}{" "}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "blue",
            fontWeight: "bold",
            marginVertical: 5,
          }}
        >
          {text1}{" "}
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            marginVertical: 20,
            opacity: button ? 100 : 0,
          }}
        >
          <Link href={"SignIn"}>
            <Button icon="login" mode="contained-tonal">
              Login
            </Button>
          </Link>
          <Link href={"Register"}>
            <Button icon="logout" mode="contained-tonal">
              Register
            </Button>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    marginVertical: 10,
    padding: 15,
    cursor: "pointer",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    // flex: 1,
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: "#0553",
  },
});
