import { Button, Input, Screen } from "@/components";
import { SCREENS } from "@/constants";
import { useLoading } from "@/hooks";
import { setUser, useAppDispatch } from "@/redux";
import { createUserPhoneService } from "@/services";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Appbar } from "react-native-paper";

function PhoneSignInScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { showLoading, hideLoading } = useLoading();

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState<any>(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");

  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber: string) {
    showLoading();

    await auth()
      .signInWithPhoneNumber(phoneNumber)
      .then((data) => {
        hideLoading();
        setConfirm(data);
      })
      .catch((error) => {
        hideLoading();
        console.error(error)
        Alert.alert(error?.message);
      });
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
      console.log(JSON.stringify(confirm));

      const id: string = confirm._auth._user.uid;
      const phone: string = confirm._auth._user.phoneNumber;

      showLoading();
      createUserPhoneService(
        id,
        phone,
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
        }
      );
    } catch (error) {
      Alert.alert("invalid code");
    }
  }

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <Screen>
      <Appbar.Header>
        <Appbar.BackAction onPress={onBack} />
        <Appbar.Content title="Phone Signin" />
      </Appbar.Header>
      <View style={{ margin: 20 }}>
        {!confirm ? (
          <>
            <Input
              required
              label="Phone number"
              placeholder="Phone number"
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
            <Button
              block
              title="Phone Number Sign In"
              onPress={() => signInWithPhoneNumber(phone)}
            />
          </>
        ) : (
          <>
            <Input
              required
              label="Code"
              placeholder="Code"
              value={code}
              onChangeText={(text) => setCode(text)}
            />
            <Button title="Confirm Code" onPress={() => confirmCode()} block />
          </>
        )}
      </View>
    </Screen>
  );
}
export default PhoneSignInScreen;
