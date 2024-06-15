import {useAppSelector} from '@/redux';
import {
  darkColors,
  fontSizes,
  fonts,
  lightColors,
  lineHeights,
  radii,
  spacing,
  zIndices,
} from '@/styles';
import {useColorScheme} from 'react-native';

const useTheme = () => {
  const colorScheme = useColorScheme();
  const mode = useAppSelector(state => state.app.mode);

  const colorMode = () => {
    switch (mode) {
      case 'light':
        return lightColors;
      case 'dark':
        return darkColors;
      case 'system':
        if (colorScheme == 'light') return lightColors;
        else return darkColors;
    }
  };

  const theme = {
    mode: mode,
    colors: colorMode(),
    fonts: fonts,
    fontSizes: fontSizes,
    lineHeights: lineHeights,
    radii,
    spacing: (num: number) => {
      return spacing(num);
    },
    zIndices: zIndices,
  };
  return theme;
};

export default useTheme;
