import { View, Text, FlatList, Pressable, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Image } from "expo-image";
import Checkbox from "expo-checkbox";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetUserByToken from "@/api/call/getUserByToken";
import api from "@/api";
import { TextInput } from "react-native-paper";

export default function todo() {
  const [plus, setPlus] = useState<boolean>(false);
  const [addTitle, setAddTitle] = useState<boolean>(false);
  const [accesToken, setAccesToken] = useState<string | null>("");
  const [nameUserLogin, setNameUserLogin] = useState("");
  const [dataTitle, setDataTitle] = useState([]);
  const [dataPostTitle, setDataPostTitle] = useState<{ title: string }>({
    title: "",
  });

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    setAccesToken(token);
    const res = await api.get("/users/byToken", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNameUserLogin(res.data.fullname);
  };

  const getDataTitle = async () => {
    const token = await AsyncStorage.getItem("token");

    const res = await api.get("/title", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDataTitle(res.data);
  };

  useEffect(() => {
    getToken();
    getDataTitle();
  }, []);

  const handlePostTitle = async () => {
    const res = await api.post("/title", dataPostTitle, {
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    });
    getDataTitle();
    setAddTitle(false);
    setPlus(false);
    return res;
  };

  return (
    <View style={{ position: "relative", flex: 1, marginTop: 35, margin: 0 }}>
      <StatusBar
        style="light"
        networkActivityIndicatorVisible
        backgroundColor={"#0081f1"}
        animated
      ></StatusBar>
      <View
        style={{
          height: 200,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0081f1",
          borderBottomEndRadius: 50,
          borderBottomStartRadius: 50,
          position: "relative",
        }}
      >
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
          }}
          //   source="https://cdn-icons-png.flaticon.com/128/4139/4139981.png"
          source="https://images.unsplash.com/photo-1504593811423-6dd665756598?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
          contentFit="cover"
          transition={1000}
        />
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 25,
            marginTop: 20,
          }}
        >
          {nameUserLogin}
        </Text>
        <View style={{ position: "absolute", left: 10, top: 15 }}>
          <Ionicons
            // onPress={() => setPlus(!plus)}
            name="ellipsis-vertical"
            size={32}
            style={{
              transform: "rotate(180deg)",
            }}
            color="white"
          />
        </View>
      </View>

      <View
        style={{
          width: "100%",
          display: addTitle ? "flex" : "none",
        }}
      >
        <TextInput
          mode="flat"
          onChangeText={(title) =>
            setDataPostTitle({ ...dataPostTitle, title })
          }
          placeholder="Add Title Todo in Here"
          cursorColor="#0081f1"
          underlineColor="#0081f1"
          activeUnderlineColor="#0081f1"
          textColor="black"
          style={{ backgroundColor: "transparent", textAlign: "center" }}
        />
        <Button onPress={handlePostTitle} title="Add Title Todo"></Button>
      </View>

      <View
        style={{ marginTop: 15, alignItems: "center", width: "100%", flex: 1 }}
      >
        <FlatList
          data={dataTitle}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <CardTodo getDataTitle={getDataTitle} item={item} />
          )}
        />
      </View>

      {/* Logout */}
      <View style={{ position: "absolute", left: 10, bottom: 15 }}>
        <View
          style={{
            backgroundColor: "#0081f1",
            width: 55,
            height: 55,
            borderRadius: 100,
            zIndex: 10,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Ionicons
            // onPress={() => setPlus(!plus)}
            name="log-out-outline"
            size={32}
            style={{
              transform: "rotate(180deg)",
            }}
            color="white"
          />
        </View>
      </View>

      {/* Add Todo */}
      <View style={{ position: "absolute", right: 15, bottom: 15 }}>
        <View
          style={{
            backgroundColor: "#0081f1",
            width: 55,
            height: 55,
            borderRadius: 100,
            zIndex: 10,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Ionicons
            onPress={() => setPlus(!plus)}
            name="add-outline"
            size={plus ? 40 : 32}
            style={{
              transform: plus ? "rotate(45deg)" : "rotate(0deg)",
            }}
            color="white"
          />
        </View>
        <View
          style={{
            backgroundColor: "#0060d1",
            width: 55,
            height: plus ? 155 : 0,
            position: "absolute",
            borderRadius: 100,
            zIndex: 5,
            bottom: 25,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View style={{ justifyContent: "space-evenly", height: 135 }}>
            <Ionicons
              onPress={() => (setAddTitle(!addTitle), setPlus(true))}
              name="add-circle-outline"
              size={addTitle ? 33 : 32}
              style={{
                transform: addTitle ? "rotate(45deg)" : "rotate(0deg)",
              }}
              color={addTitle ? "red" : "white"}
            />
            <Ionicons
              onPress={() => setPlus(!plus)}
              name="images-outline"
              size={32}
              color="white"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

interface ICardTodo {
  title: string;
  description: string;
  image: string[];
}

const CardTodo = ({ item, getDataTitle }: any) => {
  const [titleUpdate, setTitleUpdate] = useState<boolean>(false);
  const [dataUpdateTitle, setDataUpdateTitle] = useState<{ title: string }>({
    title: "",
  });
  const handleDeleteTitle = async () => {
    try {
      const res = await api.delete(`/title/${item.id}`);
      getDataTitle();
      return res;
    } catch (error) {
      console.log("🚀 ~ handleDeleteTitle ~ error:", error);
    }
  };

  const handleUpdateTitle = async () => {
    const res = await api.patch(`/title/${item.id}`, dataUpdateTitle);
    getDataTitle();
    setTitleUpdate(false);
    return res;
  };
  return (
    <>
      {titleUpdate ? (
        <View
          style={{
            width: "100%",
            // display: titleUpdate ? "flex" : "none",
          }}
        >
          <TextInput
            mode="flat"
            onChangeText={(title) =>
              setDataUpdateTitle({ ...dataUpdateTitle, title })
            }
            placeholder={item.title}
            cursorColor="#0081f1"
            underlineColor="#0081f1"
            activeUnderlineColor="#0081f1"
            textColor="black"
            style={{ backgroundColor: "transparent", textAlign: "center" }}
          />
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              marginTop: 10,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button onPress={handleUpdateTitle} title="Update Title"></Button>
            <Button
              color={"red"}
              onPress={() => setTitleUpdate(false)}
              title="Batalkan"
            ></Button>
          </View>
        </View>
      ) : (
        <Link
          href={`/title/${item.id}`}
          // style={{ display: !titleUpdate ? "flex" : "none" }}
        >
          <View
            style={{
              width: 320,
              // backgroundColor: "green",

              borderCurve: "continuous",
              borderBottomWidth: 2,
              marginVertical: 5,
              borderRadius: 20,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", paddingLeft: 20 }}
                >
                  {item.title}
                </Text>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <Ionicons
                    onPress={handleDeleteTitle}
                    name="trash-outline"
                    size={24}
                  />
                  <Ionicons
                    // onPress={handleUpdateTitle}
                    onPress={() => setTitleUpdate(true)}
                    name="create-outline"
                    size={24}
                  />
                </View>
              </View>
            </View>
          </View>
        </Link>
      )}
    </>
  );
};
