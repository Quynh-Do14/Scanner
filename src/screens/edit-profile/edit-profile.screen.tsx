import { Button, Input, Screen } from "@/components";
import { updateUser, useAppDispatch, useAppSelector } from "@/redux";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import i18next from "i18next";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Appbar, Avatar, IconButton } from "react-native-paper";
import * as Yup from "yup";
import editProfileScreenStyles from "./styles";
import { useLoading } from "@/hooks";
import { editUserService } from "@/services";

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { showLoading, hideLoading } = useLoading();
  const styles = editProfileScreenStyles();
  const { t } = useTranslation(["translation"], {
    keyPrefix: "editProfileScreen",
  });
  const dispacth = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required(i18next.t("enterFullname")),
  });

  const initialValues = {
    fullname: user?.fullname,
  };

  const [avatar, setAvatar] = useState(user?.image);

  const {
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    validationSchema: validationSchema,
    initialValues: initialValues,
    onSubmit: (values, actions) => {
      showLoading();
      editUserService(
        user.id,
        {
          fullname: values.fullname,
          image: avatar,
        },
        () => {
          hideLoading();

          dispacth(
            updateUser({
              fullname: values.fullname,
              image: avatar,
            })
          );
          Alert.alert(t("updatedSuccess"));
        },
        (error) => {
          hideLoading();
          Alert.alert(error.message);
        }
      );
    },
  });

  const onBack = () => {
    navigation.goBack();
  };

  const onImagePicker = () => {
    ImagePicker.openPicker({
      includeBase64: true,
      width: 300,
      height: 300,
      cropping: true,
    }).then((image: any) => {
      const imgBase64 = image.data;
      setAvatar(`data:image/jpg;base64,${imgBase64}`);
    });
  };

  return (
    <Screen>
      <Appbar.Header>
        <Appbar.BackAction onPress={onBack} />
        <Appbar.Content title="Edit Profile" />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar.Image source={{ uri: `${avatar}` }} size={100} />
          <IconButton
            iconColor="white"
            icon="camera"
            size={20}
            onPress={onImagePicker}
            style={styles.iconCamera}
          />
        </View>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={"handled"}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Input
            label={i18next.t("fullname")}
            placeholder={i18next.t("fullname")}
            value={values.fullname}
            onChangeText={(text) => {
              setFieldValue("fullname", text);
              setFieldTouched("fullname", true, false);
            }}
            onBlur={handleBlur("fullname")}
            autoCapitalize={"words"}
            errorMessage={
              touched.fullname && errors.fullname ? errors.fullname : undefined
            }
          />
          {user?.email && (
            <Input
              editable={false}
              label={i18next.t("email")}
              value={user?.email}
            />
          )}
          {user?.phone && (
            <Input
              editable={false}
              label={"Phone Number"}
              value={user?.phone}
            />
          )}
          <Button
            block
            title={i18next.t("submit")}
            uppercase
            onPress={handleSubmit}
          />
        </KeyboardAwareScrollView>
      </View>
    </Screen>
  );
};

export default EditProfileScreen;
