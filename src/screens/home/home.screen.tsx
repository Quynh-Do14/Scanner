import { NeedPass, Screen, Text } from "@/components";
import { SCREENS } from "@/constants";
import { useAppSelector } from "@/redux";
import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { Appbar, Divider, FAB } from "react-native-paper";
import ListItem from "./components/list-item";
import homeScreenStyles from "./styles";

import { Document } from "@/types";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const documentData = useAppSelector((state) => state.document);

  const styles = homeScreenStyles();

  const onFab = () => {
    navigation.navigate(SCREENS.DOCUMENT_EDITOR);
  };

  const [sortAsc, setSortAsc] = useState(true);

  const onSort = () => {
    setSortAsc(!sortAsc);
  };

  const onSearch = () => {
    navigation.navigate(SCREENS.SEARCH);
  };

  const filterData = useMemo(() => {
    const newArr = [...documentData];
    if (sortAsc) return newArr;
    return newArr.reverse();
  }, [sortAsc, documentData]);

  const [visibleNeedPass, setVisibleNeedPass] = useState(false);

  const [currentDoc, setCurrentDoc] = useState<Document>();

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return `#${randomColor}`;
  };

  return (
    <>
      <Screen>
        <Appbar.Header>
          <Appbar.Content title="Home" />
          <Appbar.Action icon="magnify" onPress={onSearch} />
          <Appbar.Action
            icon={sortAsc ? "sort-ascending" : "sort-descending"}
            onPress={onSort}
          />
        </Appbar.Header>
        {documentData.length !== 0 ? (
          <FlatList
            data={filterData}
            renderItem={({ item, index }) => {
              return (
                <View style={{ backgroundColor: generateColor() }}>
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
                </View>
              );
            }}
            ItemSeparatorComponent={() => <Divider />}
          />
        ) : (
          <Text style={{ alignSelf: "center", marginTop: 30 }}>Empty</Text>
        )}
        <FAB icon="camera" style={styles.fab} onPress={onFab} />
      </Screen>
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
    </>
  );
};

export default HomeScreen;
