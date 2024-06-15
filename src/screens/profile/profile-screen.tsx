import { Screen, Text } from "@/components";
import { SCREENS } from "@/constants";
import { removeUser, useAppDispatch, useAppSelector } from "@/redux";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, View } from "react-native";
import { Appbar, Avatar, List } from "react-native-paper";
import profileScreenStyles from "./styles";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager } from "react-native-fbsdk-next";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();
const ProfileScreen: React.FC = () => {
  const styles = profileScreenStyles();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const handleGoogleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      removeInforAndGoBack();
    } catch (error) {
      handleGoogleSignOut();
    }
  };

  const handleFacebookSignout = async () => {
    try {
      LoginManager.logOut();
      removeInforAndGoBack();
    } catch (error) {
      handleFacebookSignout();
    }
  };

  const removeInforAndGoBack = () => {
    dispatch(removeUser());
    navigation.reset({
      index: 0,
      routes: [{ name: SCREENS.LOGIN }],
    });
  };

  const handleConfirmSignOut = () => {
    switch (user?.method) {
      case "google":
        handleGoogleSignOut();
        break;
      case "facebook":
        handleFacebookSignout();
        break;
      case "phone":
        removeInforAndGoBack();
        break;
      case "email":
        removeInforAndGoBack();
        signOut(auth);
        break;
      default:
        removeInforAndGoBack();
    }
  };

  const onSignOut = async () => {
    Alert.alert("Alert", "Do you really want to log out?", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Ok",
        onPress: () => {
          handleConfirmSignOut();
        },
      },
    ]);
  };

  const onEditProfile = () => {
    navigation.navigate(SCREENS.EDIT_PROFILE);
  };

  const onChangePassword = () => {
    navigation.navigate(SCREENS.CHANGE_PASSWORD);
  };

  return (
    <Screen>
      <Appbar.Header>
        <Appbar.Content title="Profile" />
        <Appbar.Action icon={"circle-edit-outline"} onPress={onEditProfile} />
        <Appbar.Action icon={"logout"} onPress={onSignOut} />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.card}>
          <Avatar.Image source={{ uri: `${user?.image}` }} size={100} />
          {user?.phone && <Text style={styles.fullname}>{user?.phone}</Text>}
          {user?.fullname && (
            <Text style={styles.fullname}>{user?.fullname}</Text>
          )}
          {user?.email && <Text>{user?.email}</Text>}
        </View>
        <List.Item
          onPress={onChangePassword}
          title="Change Password"
          left={(props) => <List.Icon {...props} icon="lock" />}
        />
      </View>
    </Screen>
  );
};

export default ProfileScreen;
