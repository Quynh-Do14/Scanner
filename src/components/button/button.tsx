import {useTheme} from '@/hooks';
import {ThemeColors} from '@/types';
import {makeStyles} from '@/utils';
import React from 'react';
import {StyleProp, TextStyle, View} from 'react-native';
import CustomTouch from './custom-touch';
import Text from '../text';

export type ButtonColorType = keyof Pick<
  ThemeColors,
  'primary' | 'secondary' | 'success' | 'warning' | 'error'
>;

export interface ButtonProps {
  title?: string;
  onPress?: () => void;
  type?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  color?: ButtonColorType;
  disabled?: boolean;
  block?: boolean;
  loading?: boolean;
  uppercase?: boolean;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  titleStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = props => {
  const {
    title,
    onPress,
    block,
    disabled,
    type = 'contained',
    color = 'primary',
    uppercase,
    size = 'medium',
    leading,
  } = props;

  const styles = useStyles();

  const {colors, spacing} = useTheme();

  const buttonColor = () => {
    if (type === 'contained') return colors[color];
    return 'transparent';
  };

  const buttonTextColor = () => {
    if (type === 'contained') return colors['light'];
    return colors[color];
  };

  const buttonBorderColor = () => {
    if (type === 'outlined') return colors[color];
    return 'tranparent';
  };

  const buttonHeight = () => {
    const heights: Record<typeof size, number> = {
      small: 32,
      medium: 40,
      large: 48,
    };
    return heights[size];
  };

  const buttonPadding = () => {
    const spaces: Record<typeof size, number> = {
      small: spacing(2),
      medium: spacing(3),
      large: spacing(4),
    };
    return spaces[size];
  };

  const borderWidth = type === 'outlined' ? 1 : 0;

  return (
    <View style={!block && styles.block}>
      <CustomTouch
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.container,
          disabled && styles.disabledButton,
          {
            backgroundColor: buttonColor(),
            borderColor: buttonBorderColor(),
            borderWidth,
            height: buttonHeight(),
            paddingHorizontal: buttonPadding(),
          },
        ]}>
        {leading}
        <Text
          style={[
            styles.title,
            {
              color: buttonTextColor(),
              textTransform: uppercase ? 'uppercase' : 'none',
            },
          ]}>
          {title}
        </Text>
      </CustomTouch>
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  block: {
    flexDirection: 'row',
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing(4),
    borderRadius: 16,
    flexDirection: 'row',
  },
  title: {
    color: theme.colors['light'],
    marginHorizontal: theme.spacing(2),
  },
  disabledButton: {},
}));

export default Button;
