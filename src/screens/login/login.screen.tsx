import { Button, Icon, Input, Screen, Text } from "@/components";
import { db } from "@/config";
import {
  COLLECTIONS,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  SCREENS,
} from "@/constants";
import { useLoading } from "@/hooks";
import { setUser, useAppDispatch } from "@/redux";
import { loginWithEmailService } from "@/services";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useFormik } from "formik";
import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import { loginWithFacebook } from "../../services/auth/login-with-facebook.service";
import loginStyles from "./styles";

const auth = getAuth();

const LoginScreen: React.FC = () => {
  const styles = loginStyles();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { showLoading, hideLoading } = useLoading();

  const { t } = useTranslation(["translation"], { keyPrefix: "loginScreen" });

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(i18next.t("invalidEmail"))
      .required(i18next.t("emailRequired")),
    password: Yup.string()
      .min(
        MIN_PASSWORD_LENGTH,
        i18next.t("invalidPassword", {
          characters: MIN_PASSWORD_LENGTH,
        })
      )
      .required(i18next.t("passwordRequired")),
  });

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
      onLogin();
    },
  });

  const onLogin = () => {
    showLoading();
    loginWithEmailService(
      values.email,
      values.password,
      (data) => {
        hideLoading();
        dispatch(setUser(data));
        navigation.reset({
          index: 0,
          routes: [{ name: SCREENS.BOTTOM_TAB }],
        });
      },
      (error) => {
        hideLoading();
        console.error(error);

        Alert.alert(error.message);
      }
    );
  };

  const onForotPassword = () => {
    navigation.navigate(SCREENS.RESET_PASS_WORD);
  };

  const onSignUp = () => {
    navigation.navigate(SCREENS.SIGN_UP);
  };

  const onLoginGoogle = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();

      const inputData = {
        fullname: userInfo.user.name,
        image: userInfo.user.photo,
        id: userInfo.user.id,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        method: "google",
        email: userInfo.user.email,
      };

      if (userInfo) {
        showLoading();
        const docRef = doc(db, COLLECTIONS.USERS, inputData.id);
        setDoc(docRef, inputData)
          .then(async () => {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const newData: any = {
                ...docSnap.data(),
              };
              hideLoading();
              dispatch(setUser(newData));
              navigation.reset({
                index: 0,
                routes: [{ name: SCREENS.BOTTOM_TAB }],
              });
            }
          })
          .catch(() => {
            hideLoading();
          });
      }
    } catch (error) {
      // error dev
      hideLoading();
    }
  };

  const onPhoneNumber = () => {
    navigation.navigate(SCREENS.PHONE_NUMBER);
  };

  const onLoginFacebook = () => {
    loginWithFacebook(
      () => {
        showLoading();
      },
      (data) => {
        hideLoading();
        dispatch(setUser(data));
        navigation.reset({
          index: 0,
          routes: [{ name: SCREENS.BOTTOM_TAB }],
        });
      },
      () => {
        hideLoading();
      },
      () => {
        hideLoading();
      }
    );
  };

  return (
    <Screen>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"handled"}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>LOGIN</Text>
            <Text style={styles.subtitle}></Text>
          </View>
          <Input
            required
            label={i18next.t("email")}
            errorMessage={touched.email && errors.email && errors.email}
            value={values.email}
            onChangeText={(text) => {
              setFieldValue("email", text);
              setFieldTouched("email", true, false);
            }}
            onBlur={handleBlur("email")}
            icon="email"
            placeholder={i18next.t("email")}
            keyboardType={"email-address"}
          />
          <Input
            required
            label={i18next.t("password")}
            errorMessage={
              touched.password && errors.password && errors.password
            }
            value={values.password}
            onChangeText={(text) => {
              setFieldValue("password", text);
              setFieldTouched("password", true, false);
            }}
            onBlur={handleBlur("password")}
            icon="password"
            placeholder={i18next.t("password")}
            type="password"
            maxLength={MAX_PASSWORD_LENGTH}
          />
          <Pressable onPress={onForotPassword}>
            <Text style={styles.forgotPassword}>
              {i18next.t("forgotPassword")} ?
            </Text>
          </Pressable>
          <Button
            onPress={handleSubmit}
            title={i18next.t("login")}
            block
            uppercase
          />
          <View style={styles.dividerContent}>
            <View style={styles.divider} />
            <Text style={styles.orWith}>Or</Text>
            <View style={styles.divider} />
          </View>
          <View style={styles.socialWrapper}>
            <Button
              leading={<Icon name={"google"} size={16} />}
              title="Google"
              type="outlined"
              onPress={onLoginGoogle}
            />
            <Button
              leading={<Icon name={"facebook"} size={16} />}
              title="Facebook"
              type="outlined"
              onPress={onLoginFacebook}
            />
          </View>
        </View>
        <View style={{ alignSelf: "center" }}>
          <Button
            title="Phone Number"
            type="outlined"
            onPress={onPhoneNumber}
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.viewSignUp}>
        <Text style={styles.noAccount}>{t("noAccount")}</Text>
        <TouchableOpacity onPress={onSignUp}>
          <Text style={styles.signUp}> {t("signUp")}</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default LoginScreen;
