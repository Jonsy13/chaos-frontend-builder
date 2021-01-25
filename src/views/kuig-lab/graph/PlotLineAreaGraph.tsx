/* eslint-disable import/prefer-default-export */

import {
  AreaClosed,
  AxisBottom,
  AxisLeft,
  AxisRight,
  AxisScale,
  curveMonotoneX,
  GridColumns,
  GridRows,
  Group,
  LinearGradient,
  LinePath,
  MarkerCircle,
} from '@visx/visx';
import React from 'react';
import { AreaGrapher, DataValue } from './base';
import { useStyles } from './styles';
// Initialize some variables
const axisColor = '#fff';

const axisBottomTickLabelProps = {
  textAnchor: 'middle' as const,
  fontFamily: 'Arial',
  fontSize: 10,
  fill: axisColor,
};
const axisLeftTickLabelProps = {
  dx: '-0.25em',
  dy: '0.25em',
  fontFamily: 'Ubuntu',
  fontSize: 10,
  textAnchor: 'end' as const,
  fill: axisColor,
};
const axisRightTickLabelProps = {
  dx: '1.5em',
  dy: '0.25em',
  fontFamily: 'Ubuntu',
  fontSize: 10,
  textAnchor: 'end' as const,
  fill: axisColor,
};

// accessors
const getDate = (d: DataValue) => new Date(d.date * 1000);
const getStockValue = (d: DataValue) => d.value;
let numValue: string = '';
interface AreaChartProps {
  data?: Array<AreaGrapher>;
  xScale: AxisScale<number>;
  yScale: AxisScale<number>;
  closedSeries?: Array<AreaGrapher>;
  openSeries?: Array<AreaGrapher>;
  showGrid?: boolean;
  width: number;
  height: number;
  yMax: number;
  xMax: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  hideBottomAxis?: boolean;
  hideLeftAxis?: boolean;
  hideRightAxis?: boolean;
  top?: number;
  left?: number;
  showPoints: boolean;
}

const PlotLineAreaGraph: React.FC<AreaChartProps> = ({
  height,
  width,
  closedSeries,
  openSeries,
  yMax,
  xMax,
  margin,
  xScale,
  yScale,
  hideBottomAxis = false,
  hideLeftAxis = false,
  hideRightAxis = false,
  top,
  left,
  children,
  showPoints = true,
  showGrid = true,
}) => {
  const classes = useStyles();
  if (width < 10) return null;
  const intToString = (value: number) => {
    const suffixes = ['', 'k', 'm', 'b', 't'];

    const suffixNum = Math.floor(
      Math.floor(Math.abs(value)).toString().length / 3
    );

    const shortValue = parseFloat(
      (suffixNum !== 0 ? value / 1000 ** suffixNum : value).toPrecision(1)
    );
    numValue = shortValue.toString();
    if (shortValue % 1 !== 0) {
      numValue = shortValue.toFixed(1);
    }
    return `${numValue}${suffixes[suffixNum]}`;
  };
  numValue = '';
  return (
    <Group left={left || margin?.left} top={top || margin?.top}>
      {showGrid && (
        <Group>
          <GridRows
            scale={yScale}
            width={xMax}
            className={classes.grid}
            pointerEvents="none"
          />
          <GridColumns
            scale={xScale}
            height={height}
            className={classes.grid}
            pointerEvents="none"
          />
        </Group>
      )}
      {closedSeries &&
        closedSeries.length > 0 &&
        closedSeries.map((linedata, i) => (
          <Group key={`${linedata.metricName}-group`}>
            <LinearGradient
              id={`${i}-linearGragient`}
              from={linedata.baseColor}
              to={linedata.baseColor}
              fromOpacity={0.5}
              toOpacity={0.1}
            />

            <AreaClosed<DataValue>
              key={`${linedata.metricName}-line`}
              data={linedata.data}
              x={(d) => xScale(getDate(d)) || 0}
              y={(d) => yScale(getStockValue(d)) || 0}
              yScale={yScale}
              strokeWidth={2}
              stroke={linedata.baseColor}
              fill={`url(#${i}-linearGragient)`}
              curve={curveMonotoneX}
            />

            {showPoints &&
              linedata.data.map((d) => (
                <g
                  key={`dataPoint-${d.date}-${d.value}-${linedata.metricName}`}
                >
                  <circle
                    cx={xScale(getDate(d))}
                    cy={yScale(getStockValue(d))}
                    r={5}
                    fill={linedata.baseColor}
                    fillOpacity={0.7}
                    pointerEvents="none"
                  />
                </g>
              ))}
          </Group>
        ))}
      {openSeries &&
        openSeries.length > 0 &&
        openSeries.map((openLineData, j) => (
          <g key={`${openLineData.metricName}-group-open`}>
            <MarkerCircle
              id={`${j}-circle`}
              fill={openLineData.baseColor}
              size={2.5}
              refX={2.5}
              fillOpacity={0.6}
            />
            <LinePath<DataValue>
              data={openLineData.data}
              x={(d) => xScale(getDate(d)) ?? 0}
              y={(d) => yScale(getStockValue(d)) ?? 0}
              strokeWidth={2}
              stroke={openLineData.baseColor}
              strokeOpacity={0.7}
              curve={curveMonotoneX}
              markerMid={showPoints ? `url(#${j}-circle)` : undefined}
              markerStart={showPoints ? `url(#${j}-circle)` : undefined}
              markerEnd={showPoints ? `url(#${j}-circle)` : undefined}
            />
          </g>
          // (console.log(lineIndex))
        ))}
      {!hideBottomAxis && (
        <AxisBottom
          top={yMax}
          scale={xScale}
          numTicks={width > 520 ? 6 : 5}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={() => axisBottomTickLabelProps}
        />
      )}
      {!hideLeftAxis && (
        <AxisLeft
          scale={yScale}
          numTicks={4}
          stroke={axisColor}
          tickStroke={axisColor}
          tickFormat={(num) => intToString(num)}
          tickLabelProps={() => axisLeftTickLabelProps}
        />
      )}
      {!hideRightAxis && (
        <AxisRight
          left={width - 40}
          scale={yScale}
          numTicks={4}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={() => axisRightTickLabelProps}
          tickFormat={(num) => intToString(num)}
          orientation="right"
        />
      )}
      {children}
    </Group>
  );
};

export { PlotLineAreaGraph };
