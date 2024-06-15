import { SCREENS } from "@/constants";
import { Document } from "@/types";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  [SCREENS.EDIT_PROFILE]: undefined;
  [SCREENS.LOGIN]: undefined;
  [SCREENS.SIGN_UP]: undefined;
  [SCREENS.RESET_PASS_WORD]: undefined;
  [SCREENS.BOTTOM_TAB]: undefined;
  [SCREENS.SEARCH]: undefined;
  [SCREENS.CHANGE_PASSWORD]: undefined;
  [SCREENS.PHONE_NUMBER]: undefined;
  [SCREENS.DOCUMENT_EDITOR]:
    | {
        item: Document;
      }
    | undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type ResetPasswordScreenRouteProp = RouteProp<
  RootStackParamList,
  SCREENS.RESET_PASS_WORD
>;

export type DocumentEditorScreenRouteProp = RouteProp<
  RootStackParamList,
  SCREENS.DOCUMENT_EDITOR
>;
