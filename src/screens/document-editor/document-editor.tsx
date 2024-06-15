import { Input, Screen, Text } from "@/components";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  FlatList,
  PermissionsAndroid,
  Platform,
  View,
} from "react-native";
import DocumentScanner from "react-native-document-scanner-plugin";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Appbar, IconButton } from "react-native-paper";
import TextRecognition from "react-native-text-recognition";
import Dock from "./components/dock";

import { WINDOW_WIDTH } from "@/constants";
import { DocumentEditorScreenRouteProp } from "@/navigation";
import {
  createDocument,
  deleteDocument,
  updateDocument,
  useAppDispatch,
} from "@/redux";
import { Document } from "@/types";
import { makeStyles } from "@/utils";
import moment from "moment";

import RNHTMLtoPDF from "react-native-html-to-pdf";
import { RichEditor } from "react-native-pell-rich-editor";
import Share from "react-native-share";
import AddPassword from "./components/add-password";

const DocumentEditorScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const styles = useStyles();

  const flatlistRef = useRef<FlatList>(null);

  const route = useRoute<DocumentEditorScreenRouteProp>();

  const item = route.params?.item;

  const [scannedImage, setScannedImage] = useState<Array<string>>(
    item?.images ?? []
  );

  const [value, setValue] = useState<Array<string>>(
    item?.content ? [...item?.content] : [""]
  );

  const [pass, setPass] = useState(item?.password);

  const currentList = useRef(0);

  const [visibleModalAdd, setVisibleModalAdd] = useState(false);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(
    !item ? true : false
  );

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          "Discard changes?",
          "You have unsaved changes. Are you sure to discard them and leave the screen?",
          [
            { text: "Don't leave", style: "cancel", onPress: () => {} },
            {
              text: "Discard",
              style: "destructive",
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]
        );
      }),
    [navigation, hasUnsavedChanges]
  );

  const [title, setTitle] = useState(
    !item
      ? `${"scanner "}${moment(new Date()).format("MMM DD, YYYY hh:mm:ss")}`
      : item.title
  );

  const richText = useRef<any>([]);

  const onBack = () => {
    navigation.goBack();
  };

  const onCreateNewPage = async () => {
    await setValue(value.concat(""));
    await setScannedImage(scannedImage.concat(""));
    flatlistRef.current?.scrollToEnd();
    setHasUnsavedChanges(true);
  };

  const onPassPress = () => {
    setVisibleModalAdd(true);
  };

  const createLocalPDF = async (filename?: string) => {
    const newValue = value.filter((e) => e !== "");

    let htmlContent = "";
    for (let i = 0; i < newValue.length; i++) {
      htmlContent += `${newValue[i]}`;
    }

    let options = {
      html: `${htmlContent}`,
      fileName: filename ? filename : "Share",
      directory: "Documents",
    };

    return await RNHTMLtoPDF.convert(options);
  };

  const onSharePress = async () => {
    // const totalPages = value.length;
    // const promises = [];
    // for (let pageNumber = 0; pageNumber < totalPages; pageNumber++) {
    //   promises.push(richText.current[pageNumber]?.getContentHtml());
    // }

    // Promise.all(promises)
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log(error + " err");
    //   });

    let file: any = await createLocalPDF();

    Share.open({
      title: "This is my Share",
      message: "Message:",
      url: `${"file://"}${file?.filePath}`,
      subject: "Share",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  const onCreatePDF = async () => {
    let file: any = await createLocalPDF(title);
    const url = `${file?.filePath}`;

    Alert.alert("File Saved", `Path: ${url}`, [
      {
        text: "Share",
        onPress: () => {
          Share.open({
            title: "This is my Share",
            message: "Message:",
            url: `${"file://"}${file?.filePath}`,
            subject: file.filename,
          })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              err && console.log(err);
            });
        },
      },
      {
        text: "Ok",
        onPress: () => {},
      },
    ]);
  };

  const onSave = async () => {
    if (title && title.trim() !== "") {
      if (item) {
        // update
        const updateDoc: Document = {
          createdAt: item.createdAt,
          updatedAt: new Date(),
          content: value,
          title: title,
          password: pass,
          images: scannedImage,
        };
        dispatch(updateDocument(updateDoc));
        navigation.goBack();
      } else {
        // create
        const newDoc: Document = {
          createdAt: new Date(),
          updatedAt: new Date(),
          content: value,
          title: title,
          images: scannedImage,
        };
        if (pass) {
          newDoc.password = pass;
        }
        dispatch(createDocument(newDoc));
        navigation.goBack();
      }
    } else {
      Alert.alert("Alert", "Please! Enter title");
    }
  };

  const scanDocument = async () => {
    // prompt user to accept camera permission request if they haven't already
    if (
      Platform.OS === "android" &&
      (await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      )) !== PermissionsAndroid.RESULTS.GRANTED
    ) {
      Alert.alert(
        "Error",
        "User must grant camera permissions to use document scanner."
      );
      return;
    }

    // start the document scanner
    const { scannedImages }: any = await DocumentScanner.scanDocument();

    // get back an array with scanned image file paths
    if (scannedImages.length >= 0) {
      // set the img src, so we can view the first scanned image

      const currentTotalPagesIndex = value.length - 1;
      const currentIndex = currentList.current;

      if (currentIndex == currentTotalPagesIndex) {
        // at last + 1
        const newValue = scannedImage.map((e, index) => {
          if (index == currentTotalPagesIndex) {
            return scannedImages[0];
          } else return e;
        });
        setScannedImage(newValue.concat(""));
      } else {
        // update current index
        const newValue = scannedImage.map((e, index) => {
          if (index == currentIndex) {
            return scannedImages[0];
          } else return e;
        });
        setScannedImage(newValue);
      }
    }
  };

  useEffect(() => {
    !item && scanDocument();
  }, []);

  useEffect(() => {
    scannedImage.length !== 0 &&
      scannedImage[currentList.current] !== "" &&
      handleRecognizeText(scannedImage[currentList.current]);
  }, [scannedImage]);

  const handleRecognizeText = async (file: any) => {
    try {
      const results = await TextRecognition.recognize(file);

      const htmlParagraphs = results.map(
        (str, index) => `<p key="${index}">${str}</p>`
      );

      // Join the HTML paragraphs to form the final HTML content
      const finalHtml: any = htmlParagraphs.join("");

      const currentTotalPagesIndex = value.length - 1;
      const currentIndex = currentList.current;

      // setHasUnsavedChanges(true);
      if (currentIndex == currentTotalPagesIndex) {
        // at last + 1
        const newValue = value.map((e, index) => {
          if (index == currentTotalPagesIndex) {
            return finalHtml;
          } else return e;
        });
        setValue(newValue.concat(""));
      } else {
        // update current index
        const newValue = value.map((e, index) => {
          if (index == currentIndex) {
            return finalHtml;
          } else return e;
        });
        setValue(newValue);
      }
    } catch (error) {
      console.error("Error recognizing text:", error);
    }
  };

  const onDelete = () => {
    Alert.alert("Alert", "Are you sure delete?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          item && dispatch(deleteDocument(item));
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Screen>
      <Appbar.Header>
        <Appbar.BackAction onPress={onBack} />
        <Appbar.Content title="" />
        {item && <Appbar.Action icon="delete" onPress={onDelete} />}
        <Appbar.Action icon="content-save" onPress={onSave} />
      </Appbar.Header>
      <Input
        placeholder="Enter title..."
        value={title}
        onChangeText={(text) => {
          setTitle(text);
          setHasUnsavedChanges(true);
        }}
      />
      <Animated.FlatList
        ref={flatlistRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        data={value}
        snapToInterval={WINDOW_WIDTH}
        renderItem={({ item, index }) => {
          return (
            <View style={{ width: WINDOW_WIDTH }}>
              <KeyboardAwareScrollView style={{ flex: 1 }}>
                {value[index] ? (
                  <RichEditor
                    initialContentHTML={`${value[index]}`}
                    ref={(ref) => (richText.current[index] = ref)}
                    onChange={(descriptionText) => {
                      const newValue = value.map((e, idx) => {
                        if (index == idx) {
                          return descriptionText;
                        } else return e;
                      });
                      setValue(newValue);
                      setHasUnsavedChanges(true);
                    }}
                    androidLayerType="software"
                  />
                ) : (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      paddingTop: 100,
                    }}
                  >
                    <Text>Add new pages</Text>
                    <IconButton
                      icon="camera"
                      size={20}
                      mode="contained"
                      onPress={() => {
                        currentList.current = index;
                        scanDocument();
                      }}
                    />
                  </View>
                )}
              </KeyboardAwareScrollView>
              <Text style={{ textAlign: "center" }}>{`${"Page "}${
                index + 1
              }${"/"}${value.length}`}</Text>
            </View>
          );
        }}
      />
      <Dock
        onCreateNewPage={onCreateNewPage}
        onPass={onPassPress}
        onShare={onSharePress}
        onCreatePDF={onCreatePDF}
      />
      {visibleModalAdd && (
        <AddPassword
          value={pass}
          visible={visibleModalAdd}
          onCancel={() => {
            setVisibleModalAdd(false);
          }}
          onConfirm={(text) => {
            setPass(text);
            setVisibleModalAdd(false);
            setHasUnsavedChanges(true);
          }}
        />
      )}
    </Screen>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: "80%",
    alignSelf: "center",
    backgroundColor: theme.colors["surface"],
    borderRadius: 10,
    justifyContent: "center",
    margin: 10,
    padding: 20,
  },
  secureTitle: {
    marginBottom: 10,
  },
}));

export default DocumentEditorScreen;
