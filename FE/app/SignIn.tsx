import { View, Text, Button, Alert, Pressable } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { Link, router } from "expo-router";
import api from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

export default function SignIn() {
  const [show, setShow] = useState<boolean>(false);
  const [valueLogin, setValueLogin] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const Login = await api.post("/auth/login", valueLogin);
      AsyncStorage.setItem("token", Login.data.token);
      // console.log("🚀 ~ handleLogin ~ Login:", Login.data.token);

      router.push("/todo");
      return Login;
      // return router.push("/todo");
    } catch (error) {
      Alert.alert("Gagal Login", "Silahkan cek Password atau Email Anda!!!!");
      console.log("🚀 ~ handleRegist ~ error:", error);
    }
  };
  return (
    <>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <View
          style={{
            backgroundColor: "#0081f1",
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            marginTop: 35,
            height: "auto",
            width: "100%",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 150,
              height: 150,
              objectFit: "contain",
              // borderRadius: 100,
            }}
            source={"https://cdn-icons-png.flaticon.com/256/4681/4681580.png"}
            contentFit="cover"
            transition={1000}
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
              paddingVertical: 10,
              color: "white",
            }}
          >
            Silahkan Login......
          </Text>
        </View>
        <View style={{ width: "80%" }}>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                marginTop: 20,
                fontSize: 30,
                marginVertical: 20,
                color: "#0081f1",
              }}
            >
              Login
            </Text>
          </View>
          <Text style={{ fontWeight: "bold" }}>Email</Text>
          <TextInput
            mode="flat"
            // value="ryan@gmail.com"
            onChangeText={(email) => setValueLogin({ ...valueLogin, email })}
            placeholder="ryanmoh@mail.com"
            cursorColor="#0081f1"
            underlineColor="#0081f1"
            activeUnderlineColor="#0081f1"
            textColor="black"
            style={{ backgroundColor: "transparent", marginBottom: 10 }}
          />
          <Text style={{ fontWeight: "bold" }}>Password</Text>
          <TextInput
            mode="flat"
            onChangeText={(password) =>
              setValueLogin({ ...valueLogin, password })
            }
            // value="123456"
            placeholder="*******"
            cursorColor="#0081f1"
            underlineColor="#0081f1"
            activeUnderlineColor="#0081f1"
            textColor="black"
            secureTextEntry={!show}
            keyboardType={!show ? "default" : "visible-password"}
            style={{ backgroundColor: "transparent" }}
          />
          <Pressable>
            <View
              style={{
                alignItems: "flex-end",
                width: "100%",
              }}
            >
              {!show ? (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    gap: 5,
                  }}
                >
                  <Text onPress={() => setShow(true)}>Show Password</Text>
                  <Ionicons name="eye" size={24} />
                </View>
              ) : (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    gap: 5,
                  }}
                >
                  <Text onPress={() => setShow(false)}>Hide Password</Text>
                  <Ionicons name="eye-off" size={24} />
                </View>
              )}
            </View>
          </Pressable>
        </View>
        <View style={{ width: "80%" }}>
          <View
            style={{
              alignItems: "flex-end",
              width: "100%",
              marginTop: 20,
              marginBottom: 5,
            }}
          >
            <Text>
              Dont' Have an account?{" "}
              <Link href={"Register"} style={{ color: "#0081f1" }}>
                Register
              </Link>
            </Text>
          </View>
          <Button title="Login" onPress={handleLogin}></Button>
        </View>
      </View>
    </>
  );
}
