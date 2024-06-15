import {Dimensions, NativeModules, Platform} from 'react-native';
const {StatusBarManager} = NativeModules;

/** keyboard */
export const KEYBOARD_DID_SHOW_EVENT_NAME = 'keyboardDidShow';
export const KEYBOARD_DID_HIDE_EVENT_NAME = 'keyboardDidHide';

/** dimensions */
export const STATUS_BAR_HEIGHT = StatusBarManager.HEIGHT;
export const HEADER_HEIGHT = STATUS_BAR_HEIGHT + 60;
export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

/** platform */
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';

/** layout */
export const LAYOUT_MARGIN = 16;

export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 24;
