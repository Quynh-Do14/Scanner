import {makeStyles} from '@/utils';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import LoadingIndicator from './loading-indicator';
import Text from './text';

const LOADING_SIZE = 100;

export interface LoadingOverlayProps {
  visible?: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = props => {
  const {visible = false} = props;
  const styles = useStyles();

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.loading}>
        <LoadingIndicator size="large" />
        <Text style={styles.label}>{'loading ...'}</Text>
      </View>
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors['backdrop'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors['surface'],
    width: LOADING_SIZE,
    height: LOADING_SIZE,
    borderRadius: theme.radii['medium'],
  },
  label: {
    marginTop: theme.spacing(2),
  },
}));

export default LoadingOverlay;
