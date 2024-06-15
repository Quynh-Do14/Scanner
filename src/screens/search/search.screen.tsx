import { NeedPass, Screen, Text } from "@/components";
import { SCREENS } from "@/constants";
import { useAppSelector } from "@/redux";
import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { FlatList } from "react-native";
import { Divider, TextInput } from "react-native-paper";
import ListItem from "./components/list-item";
import { Document } from "@/types";

const SearchScreen: React.FC = () => {
  const documentData = useAppSelector((state) => state.document);
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  const filterData = useMemo(() => {
    if (search) {
      const newArr = [...documentData];
      return newArr.filter((e) =>
        e.title?.toLowerCase().includes(search.toLowerCase())
      );
    } else return [];
  }, [documentData, search]);

  const [visibleNeedPass, setVisibleNeedPass] = useState(false);

  const [currentDoc, setCurrentDoc] = useState<Document>();
  return (
    <Screen>
      <TextInput
        dense
        autoFocus
        value={search}
        onChangeText={(text) => {
          setSearch(text);
        }}
      />
      {documentData.length !== 0 ? (
        <FlatList
          data={filterData}
          renderItem={({ item, index }) => {
            return (
              <ListItem
                item={item}
                key={index}
                onPress={() => {
                  if (item.password) {
                    setVisibleNeedPass(true);
                    setCurrentDoc(item);
                  } else {
                    navigation.navigate(SCREENS.DOCUMENT_EDITOR, {
                      item: item,
                    });
                  }
                }}
              />
            );
          }}
          ItemSeparatorComponent={() => <Divider />}
        />
      ) : (
        <Text style={{ alignSelf: "center", marginTop: 30 }}>Empty</Text>
      )}
      {visibleNeedPass && (
        <NeedPass
          currentPass={currentDoc?.password}
          visible={visibleNeedPass}
          onCancel={() => {
            setVisibleNeedPass(false);
          }}
          onConfirm={() => {
            setVisibleNeedPass(false);
            currentDoc &&
              navigation.navigate(SCREENS.DOCUMENT_EDITOR, {
                item: currentDoc,
              });
          }}
        />
      )}
    </Screen>
  );
};

export default SearchScreen;
