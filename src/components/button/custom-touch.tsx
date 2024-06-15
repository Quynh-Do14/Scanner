import {useTheme} from '@/hooks';
import React from 'react';
import {
  Platform,
  StyleProp,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

interface CustomTouchProps extends TouchableOpacityProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const CustomTouch: React.FC<CustomTouchProps> = (props) => {
  const {children, style, ...rest} = props;
  const {colors} = useTheme();

  if (Platform.OS == 'ios')
    return (
      <TouchableOpacity activeOpacity={0.8} {...rest} style={style}>
        {children}
      </TouchableOpacity>
    );

  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(colors.background, false)}
      useForeground={false}
      {...rest}>
      <View style={style}>{children}</View>
    </TouchableNativeFeedback>
  );
};

export default CustomTouch;
