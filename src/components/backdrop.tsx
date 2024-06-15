import {STATUS_BAR_HEIGHT} from '@/constants';
import {useTheme} from '@/hooks';
import {makeStyles} from '@/utils';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export interface BackdropProps {
  revealed?: boolean;
  header?: React.ReactNode;
  backLayer?: React.ReactNode;
  children?: React.ReactNode;
}

const Backdrop: React.FC<BackdropProps> = props => {
  const {revealed, header, backLayer, children} = props;

  const styles = useStyles();
  const theme = useTheme();

  const animated = useSharedValue(revealed ? 1 : 0);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(animated.value, [0, 1], [0, 150]);
    return {
      transform: [{translateY}],
    };
  });

  useEffect(() => {
    animated.value = withTiming(revealed ? 1 : 0, {
      duration: 200,
    });
  }, [revealed]);

  return (
    <View style={[styles.container]}>
      <View>{header}</View>
      <View>{backLayer}</View>
      <Animated.View
        style={[styles.frontLayer, {top: STATUS_BAR_HEIGHT}, animatedStyle]}>
        {children}
      </Animated.View>
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors['primary'],
    paddingTop: STATUS_BAR_HEIGHT,
  },
  frontLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors['surface'],
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    height: 1000,
  },
}));

export default Backdrop;
