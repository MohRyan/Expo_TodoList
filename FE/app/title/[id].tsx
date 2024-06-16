import { View, Text, Button, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import api from "@/api";
import { Ionicons } from "@expo/vector-icons";
import { Checkbox, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function id() {
  const local = useGlobalSearchParams();
  const [addTodo, setAddTodo] = useState<boolean>(false);
  const [dataTodo, setDataTodo] = useState([]);
  // console.log("🚀 ~ id ~ dataTodo:", dataTodo);
  const [dataTitle, setDataTitle] = useState<{ title: string }>({
    title: "",
  });
  const [dataPostTodo, setDataPostTodo] = useState<{ description: string }>({
    description: "",
  });
  const [isChecked, setChecked] = useState(null);

  // console.log("🚀 ~ id ~ dataTitle:", dataTitle);
  // console.log("🚀 ~ id ~ local:", local);
  const getDataTitle = async () => {
    const res = await api.get(`/title/${local.id}`);
    setDataTitle({
      title: res.data.data.title,
    });
  };
  const getDataTodo = async () => {
    const res = await api.get(`/todo/${local.id}`);
    setDataTodo(res.data);
  };
  useEffect(() => {
    getDataTitle();
    getDataTodo();
  }, []);

  const handlePostTodo = async () => {
    const token = await AsyncStorage.getItem("token");
    const res = await api.post(`/todo/${local.id}`, dataPostTodo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getDataTodo();
    setAddTodo(false);
    return res;
  };
  return (
    <View
      style={{
        marginTop: 35,
        flex: 1,
        width: "100%",
        position: "relative",
        alignItems: "center",
      }}
    >
      <View style={{ position: "absolute", right: 15, top: 25 }}>
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
            onPress={() => setAddTodo(!addTodo)}
            name="add-outline"
            size={addTodo ? 40 : 32}
            style={{
              transform: addTodo ? "rotate(45deg)" : "rotate(0deg)",
            }}
            color="white"
          />
        </View>
      </View>
      <View
        style={{
          height: 70,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0081f1",
          borderBottomEndRadius: 70,
          borderBottomStartRadius: 70,
          position: "relative",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
          {dataTitle.title}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          display: addTodo ? "flex" : "none",
        }}
      >
        <TextInput
          mode="flat"
          onChangeText={(description) =>
            setDataPostTodo({ ...dataPostTodo, description })
          }
          placeholder="Add Title Todo in Here"
          cursorColor="#0081f1"
          underlineColor="#0081f1"
          activeUnderlineColor="#0081f1"
          textColor="black"
          style={{ backgroundColor: "transparent", textAlign: "center" }}
        />
        <Button onPress={handlePostTodo} title="Add Todo"></Button>
      </View>
      <View
        style={{ marginTop: 15, alignItems: "center", width: "100%", flex: 1 }}
      >
        {dataTodo.length === 0 ? (
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Todo Belum Ada.....!!!!
            </Text>
          </View>
        ) : dataTodo.length < 0 ? (
          ""
        ) : (
          <FlatList
            data={dataTodo}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <>
                <CardTodo
                  getDataTodo={getDataTodo}
                  isChecked={isChecked}
                  item={item}
                  setChecked={setChecked}
                />
              </>
            )}
          />
        )}
      </View>
    </View>
  );
}

const CardTodo = ({ item, getDataTodo, isChecked, setChecked }: any) => {
  const handleDeleteTodo = async () => {
    try {
      const res = await api.delete(`/todo/${item.id}`);
      getDataTodo();
      return res;
    } catch (error) {
      console.log("🚀 ~ handleDeleteTitle ~ error:", error);
    }
  };
  const [todoUpdate, setTodoUpdate] = useState<boolean>(false);
  const [dataUpdateTodo, setDataUpdateTodo] = useState<{ description: string }>(
    {
      description: "",
    }
  );

  const handleUpdateTodo = async () => {
    const res = await api.patch(`/todo/${item.id}`, dataUpdateTodo);
    getDataTodo();
    setTodoUpdate(false);
    return res;
  };

  const handleUpdateCheckboxTodo = async () => {
    const res = await api.patch(`/todo/${item.id}`, { status: isChecked });
    getDataTodo();
    // console.log("🚀 ~ handleUpdateCheckboxTodo ~ res:", res.data.data.status);
  };
  return (
    <>
      <View
        style={{
          width: "100%",
          display: todoUpdate ? "flex" : "none",
        }}
      >
        <TextInput
          mode="flat"
          onChangeText={(description) =>
            setDataUpdateTodo({ ...dataUpdateTodo, description })
          }
          // value={item.description}
          placeholder={item.description}
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
          <Button onPress={handleUpdateTodo} title="Update Todo"></Button>
          <Button
            color={"red"}
            onPress={() => setTodoUpdate(false)}
            title="Batalkan"
          ></Button>
        </View>
      </View>
      <View
        style={{
          width: 320,
          // backgroundColor: "green",
          display: !todoUpdate ? "flex" : "none",
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
            <Checkbox
              onPress={() => (
                handleUpdateCheckboxTodo(),
                setChecked(!item.status ? true : false)
              )}
              status={item.status ? "checked" : "unchecked"}
              // value={!isChecked}
              // onValueChange={handleUpdateCheckboxTodo}
              // color={isChecked ? "#0081f1" : undefined}
            />

            <View
              style={{
                width: "70%",
              }}
            >
              <Text style={{ fontSize: 17, flexWrap: "wrap" }}>
                {item.description}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Ionicons
                onPress={handleDeleteTodo}
                name="trash-outline"
                size={24}
              />
              <Ionicons
                onPress={() => setTodoUpdate(true)}
                name="create-outline"
                size={24}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
