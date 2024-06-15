import {ThemeColors} from '@/types';

export type IconType =
  | 'ant-design'
  | 'entypo'
  | 'evilicon'
  | 'feather'
  | 'font-awesome'
  | 'font-awesome-5'
  | 'fontisto'
  | 'foundation'
  | 'ionicon'
  | 'material'
  | 'material-community'
  | 'octicon'
  | 'zocial'
  | 'simple-line-icon';

export const getIconType = (type: IconType) => {
  switch (type) {
    case 'zocial':
      return require('react-native-vector-icons/Zocial').default;
    case 'octicon':
      return require('react-native-vector-icons/Octicons').default;
    case 'material':
      return require('react-native-vector-icons/MaterialIcons').default;
    case 'material-community':
      return require('react-native-vector-icons/MaterialCommunityIcons')
        .default;
    case 'ionicon':
      return require('react-native-vector-icons/Ionicons').default;
    case 'foundation':
      return require('react-native-vector-icons/Foundation').default;
    case 'evilicon':
      return require('react-native-vector-icons/EvilIcons').default;
    case 'entypo':
      return require('react-native-vector-icons/Entypo').default;
    case 'font-awesome':
      return require('react-native-vector-icons/FontAwesome').default;
    case 'font-awesome-5':
      return require('react-native-vector-icons/FontAwesome5').default;
    case 'simple-line-icon':
      return require('react-native-vector-icons/SimpleLineIcons').default;
    case 'feather':
      return require('react-native-vector-icons/Feather').default;
    case 'ant-design':
      return require('react-native-vector-icons/AntDesign').default;
    case 'fontisto':
      return require('react-native-vector-icons/Fontisto').default;
    default:
      return require('react-native-vector-icons/MaterialIcons').default;
  }
};

export type IconNames =
  | 'back'
  | 'info'
  | 'camera'
  | 'image'
  | 'mic'
  | 'send'
  | 'eye'
  | 'eye-off'
  | 'chevron-right'
  | 'home'
  | 'contacts'
  | 'notifications'
  | 'profile'
  | 'settings'
  | 'email'
  | 'password'
  | 'logo'
  | 'close'
  | 'arrow-next'
  | 'check'
  | 'google'
  | 'facebook';

export const IconMap: Record<
  IconNames,
  {
    name: string;
    type: IconType;
    color?: keyof ThemeColors;
  }
> = {
  back: {
    name: 'chevron-thin-left',
    type: 'entypo',
    color: 'light',
  },
  info: {
    name: '',
    type: 'ant-design',
  },
  camera: {
    name: 'camera-iris',
    type: 'material-community',
    color: 'primary',
  },
  image: {
    name: 'image',
    type: 'ionicon',
    color: 'primary',
  },
  mic: {
    name: 'mic',
    type: 'ionicon',
    color: 'primary',
  },
  send: {
    name: 'send',
    type: 'ionicon',
    color: 'primary',
  },
  eye: {
    name: 'eye',
    type: 'ionicon',
  },
  'eye-off': {
    name: 'eye-off',
    type: 'ionicon',
  },
  'chevron-right': {
    name: 'chevron-thin-right',
    type: 'entypo',
    color: 'primary',
  },
  home: {
    name: 'home',
    type: 'ant-design',
  },
  contacts: {
    name: 'contacts',
    type: 'ant-design',
  },
  notifications: {
    name: 'notifications-outline',
    type: 'ionicon',
  },
  profile: {
    name: 'person-circle-outline',
    type: 'ionicon',
  },
  settings: {
    name: 'ellipsis1',
    type: 'ant-design',
    color: 'light',
  },
  email: {
    name: 'mail-outline',
    type: 'ionicon',
  },
  password: {
    name: 'lock',
    type: 'simple-line-icon',
  },
  logo: {
    name: 'colours',
    type: 'entypo',
    color: 'light',
  },
  close: {
    name: 'close',
    type: 'ant-design',
    color: 'light',
  },
  'arrow-next': {
    name: 'chevron-thin-right',
    type: 'entypo',
  },
  check: {
    name: 'check',
    type: 'ant-design',
    color: 'primary',
  },
  google: {
    name: 'google',
    type: 'font-awesome',
    color: undefined,
  },
  facebook: {
    name: 'facebook',
    type: 'font-awesome',
    color: undefined,
  },
};
