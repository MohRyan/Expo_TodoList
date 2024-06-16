import { View, Text, Button, Pressable } from "react-native";
import React, { useState } from "react";
// import { Button, TextInput } from "react-native-paper";
import { TextInput } from "react-native-paper";
import api from "@/api";
import axios from "axios";
import { Link, router } from "expo-router";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

export default function Register() {
  const [show, setShow] = useState<boolean>(false);
  const [valueRegis, setValueRegis] = useState<{
    fullname: string;
    email: string;
    password: string;
  }>({
    fullname: "",
    email: "",
    password: "",
  });

  const handleRegist = async () => {
    try {
      const Regist = await api.post("/auth/register", valueRegis);

      router.push("/SignIn");
      return Regist;
    } catch (error) {
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
            // height: "auto",
            paddingTop: 50,
            marginBottom: 20,
            width: "100%",
            // justifyContent: "space-around",
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
            source={"https://cdn-icons-png.flaticon.com/256/6811/6811271.png"}
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
            Silahkan Register......
          </Text>
        </View>

        <View style={{ width: "80%" }}>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                marginTop: 5,
                fontSize: 30,
                marginVertical: 5,
                color: "#0081f1",
              }}
            >
              Register
            </Text>
          </View>
          <Text style={{ fontWeight: "bold" }}>Fullname</Text>
          <TextInput
            //   value={""}
            mode="flat"
            cursorColor="#0081f1"
            underlineColor="#0081f1"
            activeUnderlineColor="#0081f1"
            textColor="black"
            onChangeText={(fullname) =>
              setValueRegis({ ...valueRegis, fullname })
            }
            placeholder="Moh Ryan K H"
            style={{ backgroundColor: "transparent", marginBottom: 5 }}
          />
          <Text style={{ fontWeight: "bold" }}>Email</Text>
          <TextInput
            mode="flat"
            cursorColor="#0081f1"
            underlineColor="#0081f1"
            activeUnderlineColor="#0081f1"
            textColor="black"
            placeholder="ryanmoh@mail.com"
            onChangeText={(email) => setValueRegis({ ...valueRegis, email })}
            style={{ backgroundColor: "transparent", marginBottom: 5 }}
          />
          <Text style={{ fontWeight: "bold" }}>Password</Text>
          <TextInput
            onChangeText={(password) =>
              setValueRegis({ ...valueRegis, password })
            }
            placeholder="Buat password sesuka hati anda"
            style={{ backgroundColor: "transparent", marginBottom: 5 }}
            cursorColor="#0081f1"
            underlineColor="#0081f1"
            secureTextEntry={!show}
            keyboardType={!show ? "default" : "visible-password"}
            activeUnderlineColor="#0081f1"
            textColor="black"
            mode="flat"
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
                  <Ionicons
                    onPress={() => setShow(true)}
                    name="eye"
                    size={24}
                  />
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
                  <Ionicons
                    onPress={() => setShow(false)}
                    name="eye-off"
                    size={24}
                  />
                </View>
              )}
            </View>
          </Pressable>
          <View>
            <View
              style={{
                alignItems: "flex-end",
                width: "100%",
                marginTop: 20,
                marginBottom: 5,
              }}
            >
              <Text>
                Have an account?{" "}
                <Link href={"SignIn"} style={{ color: "#0081f1" }}>
                  Log in
                </Link>
              </Text>
            </View>
            <Button title="Register" onPress={handleRegist}></Button>
          </View>
        </View>
      </View>
    </>
  );
}
