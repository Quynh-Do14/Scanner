import {useTheme} from '@/hooks';
import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

export interface ScreenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Screen: React.FC<ScreenProps> = props => {
  const {children, style} = props;
  const {colors} = useTheme();

  return (
    <View style={[{flex: 1, backgroundColor: colors['surface']}, style]}>
      {children}
    </View>
  );
};

export default Screen;
