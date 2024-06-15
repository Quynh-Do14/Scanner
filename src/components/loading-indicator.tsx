import {useTheme} from '@/hooks';
import React, {useEffect, useState} from 'react';
import {Circle, G, Svg} from 'react-native-svg';

export interface LoadingIndicatorProps {
  /**
   * Size of the indicator.
   */
  size?: 'small' | 'large';
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = props => {
  const {size = 'small'} = props;

  const {colors} = useTheme();

  const radius = size === 'small' ? 10 : 20;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + 5;

  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRotate(prevRotate => prevRotate + 5);
    }, 10);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Svg
      height={radius * 2}
      width={radius * 2}
      viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
      <G origin={`${halfCircle}, ${halfCircle}`} rotation={rotate}>
        <Circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="transparent"
          stroke={colors.primary}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDashoffset={(circumference / 4) * 3}
          strokeDasharray={`${circumference}, ${circumference}`}
        />
        <Circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="transparent"
          stroke={colors['primary-icon']}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeOpacity=".1"
        />
      </G>
    </Svg>
  );
};

export default LoadingIndicator;
