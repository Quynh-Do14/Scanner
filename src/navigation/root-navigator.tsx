import { SCREENS } from "@/constants";
import {
  ChangePasswordScreen,
  DocumentEditorScreen,
  EditProfileScreen,
  LoginScreen,
  PhoneNumberScreen,
  ResetPasswordScreen,
  SearchScreen,
  SignUpScreen,
} from "@/screens";
import { NavigationContainer } from "@react-navigation/native";
import {
  StackNavigationOptions,
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";
import BottomTabStack from "./bottom-tab-stack";
import { RootStackParamList } from "./types";
import { useAppSelector } from "@/redux";

const Stack = createStackNavigator<RootStackParamList>();
const options: StackNavigationOptions = {
  headerShown: false,
};

const RootNavigator = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={options}
        initialRouteName={isAuthenticated ? SCREENS.BOTTOM_TAB : SCREENS.LOGIN}
      >
        <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
        <Stack.Screen name={SCREENS.BOTTOM_TAB} component={BottomTabStack} />
        <Stack.Screen name={SCREENS.SEARCH} component={SearchScreen} />
        <Stack.Screen
          name={SCREENS.RESET_PASS_WORD}
          component={ResetPasswordScreen}
        />
        <Stack.Screen
          name={SCREENS.CHANGE_PASSWORD}
          component={ChangePasswordScreen}
        />
        <Stack.Screen
          name={SCREENS.PHONE_NUMBER}
          component={PhoneNumberScreen}
        />
        <Stack.Screen name={SCREENS.SIGN_UP} component={SignUpScreen} />
        <Stack.Screen
          name={SCREENS.DOCUMENT_EDITOR}
          component={DocumentEditorScreen}
        />
        <Stack.Screen
          name={SCREENS.EDIT_PROFILE}
          component={EditProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
