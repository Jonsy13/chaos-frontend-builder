import { useTheme } from '@material-ui/core';
import { Line } from 'rc-progress';
import React from 'react';

interface LinearProgressBarProps {
  value: number;
  maxValue: number;
  baseColor?: string;
}

const AnalyticsLinearProgressBar: React.FC<LinearProgressBarProps> = ({
  value,
  maxValue,
  baseColor,
}) => {
  const { palette } = useTheme();

  const width: number = 2;
  const resultValue = (value / maxValue) * 100;

  return (
    <Line
      percent={resultValue}
      strokeWidth={width}
      trailWidth={width}
      strokeColor={palette.disabledBackground}
      trailColor={baseColor}
    />
  );
};

export default AnalyticsLinearProgressBar;
