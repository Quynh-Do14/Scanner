import {useTheme} from '@/hooks';
import {DefaultTheme} from '@/types';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

const makeStyles: <
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
  V,
>(
  styles: T | ((theme: DefaultTheme, props: V) => T),
) => (props?: V) => T = (styles: any) => props => {
  const theme = useTheme();
  return useMemo(() => {
    const css = typeof styles === 'function' ? styles(theme, props) : styles;
    return StyleSheet.create(css);
  }, [props, theme]);
};

export default makeStyles;
