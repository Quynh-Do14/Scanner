import {makeStyles} from '@/utils';
import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleProp,
  StyleSheet,
  TextStyle,
} from 'react-native';

export interface TextProps extends RNTextProps {
  children?: string | React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const Text: React.FC<TextProps> = props => {
  const {children, style, ...rest} = props;
  const styles = useStyles(props);

  return (
    <RNText {...rest} style={StyleSheet.flatten([styles.normalText, style])}>
      {children ?? ''}
    </RNText>
  );
};

const useStyles = makeStyles(theme => ({
  normalText: {
    color: theme.colors['primary-text'],
    fontFamily: theme.fonts['medium'],
    fontSize: theme.fontSizes['body-medium'],
  },
}));

export default Text;
