import {useTheme} from '@/hooks';
import {ThemeColors} from '@/types';
import React from 'react';
import {Pressable} from 'react-native';
import {IconButtonProps} from 'react-native-vector-icons/Icon';
import {IconMap, IconNames, getIconType} from './helper';

interface ComponentProps {
  children: React.ReactNode;
}

export interface IconProps extends IconButtonProps {
  name: IconNames;
  onPress?: () => void;
}

const Icon: React.FC<IconProps> = (props) => {
  const {colors} = useTheme();
  const {name, onPress, ...rest} = props;

  const iconName = IconMap[name].name;
  const iconType = IconMap[name].type;

  const keyIconColor: keyof ThemeColors | undefined = IconMap[name]?.color;
  const iconColor = keyIconColor
    ? colors[keyIconColor]
    : colors['secondary-icon'];

  const IconComponent = getIconType(iconType);

  const Component: React.FC<ComponentProps> = ({children}) => {
    return onPress ? (
      <Pressable onPress={onPress}>{children}</Pressable>
    ) : (
      children
    );
  };

  return (
    <Component>
      <IconComponent name={iconName} size={22} color={iconColor} {...rest} />
    </Component>
  );
};

export default Icon;
