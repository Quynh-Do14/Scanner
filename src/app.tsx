import { LoadingOverlay } from "@/components";
import "@/config";
import { initI18n } from "@/locales";
import { RootNavigator } from "@/navigation";
import { persistor, store, useAppSelector } from "@/redux";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

GoogleSignin.configure({
  webClientId:
    "370918636805-uj4s1r556qsmjuncevc1i84c71f74p3r.apps.googleusercontent.com",
  offlineAccess: true,
});

const AppContainer = () => {
  const loadingVisible = useAppSelector((state) => state.app.loading);

  useEffect(() => {
    initI18n();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <RootNavigator />
        {loadingVisible && <LoadingOverlay visible={true} />}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      {/* <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      /> */}
      <PersistGate persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
};

export default App;
