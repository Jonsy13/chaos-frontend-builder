/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-return-assign */
import { Arc, Group, LinearGradient, Text } from '@visx/visx';
import React, { useEffect, useState } from 'react';
import { LegendData } from '../graph/base';
import { RadialChartProps } from './base';
import { LegendTable } from './LegendTable';
import useStyles from './styles';

const green = '#52F995';
const red = '#CA2C2C';

const color = ['#52F995', '#F6B92B', '#CA2C2C'];

export type ChordProps = {
  width: number;
  height: number;
  legendTableHeight?: number;
  centerSize?: number;
  events?: boolean;
  showOuterArc?: boolean;
  semiCircle?: boolean;
  showArc?: boolean;
  showLegend?: boolean;
  radialData: RadialChartProps[];
};

const RadialChart = ({
  width,
  height,
  radialData,
  centerSize = 30,
  showOuterArc = true,
  semiCircle = true,
  showArc = true,
  legendTableHeight = 90,
  showLegend = true,
}: ChordProps) => {
  let legenddata: Array<LegendData> = [{ value: [] }];
  const classes = useStyles();
  const total = radialData
    ? radialData.reduce(
        (previousValue, currentValue) => previousValue + currentValue.value,
        0
      )
    : 0;
  const [centerDataValue, setCenterDataValue] = useState<string>('0');
  useEffect(() => {
    if (total !== parseInt(centerDataValue, 10)) {
      setCenterDataValue(total.toString());
    }
  }, [total]);
  const circleOrient = semiCircle ? 1 : 2;
  const scalerArc: number = circleOrient * Math.PI;

  const startAngle: number = -(Math.PI / 2);
  let currentAngle: number = startAngle;
  const outerRadius =
    (circleOrient === 1 ? Math.max(width, height) : Math.min(width, height)) *
      0.5 -
    centerSize;
  const innerRadius = outerRadius - centerSize;

  const radialArc = radialData
    ? radialData.map((elem) => {
        return {
          value: (total ? elem.value / total : 0) * scalerArc,
          lable: elem.lable,
        };
      })
    : [{ value: NaN, lable: '' }];

  legenddata = legenddata.splice(0);
  if (radialData) {
    radialData.map((element, index) => {
      if (element.value !== undefined)
        legenddata[index] = {
          value: [element.lable],
        };
    });
  }
  return width < 10 ? null : (
    <div className="chords">
      <svg width={width} height={height}>
        <LinearGradient
          id="gpinkorange"
          from={green}
          to={red}
          vertical={false}
        />

        <Group top={circleOrient === 1 ? height : height / 2} left={width / 2}>
          {showArc &&
            total > 0 &&
            radialArc &&
            radialArc.map((elem, i) => (
              <Arc
                className={classes.radicalArc}
                cornerRadius={2}
                padAngle={0.02}
                key={`RadialArc-${elem.lable}`}
                data
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                fill={color[i % 3]}
                startAngle={currentAngle}
                endAngle={(currentAngle += elem.value)}
                onMouseEnter={() =>
                  setCenterDataValue(radialData[i].value.toString())
                }
                onMouseLeave={() => setCenterDataValue(total.toString())}
              />
            ))}
          {(currentAngle = Math.PI)}
          {showArc && total === 0 && (
            <Arc
              cornerRadius={2}
              padAngle={0.02}
              data
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              fill="#2B333B"
              startAngle={startAngle}
              endAngle={circleOrient === 1 ? Math.PI / 2 : 2 * Math.PI}
            />
          )}
          {showOuterArc && (
            <Arc
              cornerRadius={2}
              padAngle={0.02}
              data
              innerRadius={outerRadius + 10}
              outerRadius={outerRadius + 15}
              fill={total === 0 ? '#2B333B' : 'url(#gpinkorange)'}
              startAngle={startAngle}
              endAngle={circleOrient * Math.PI}
            />
          )}
          <Group
            id="test-text"
            left={-14 * centerDataValue.toString().length}
            top={circleOrient === 1 ? -8 : 16}
          >
            <Text className={classes.centerDataValue}>{centerDataValue}</Text>
          </Group>
        </Group>
      </svg>
      {showLegend && (
        <LegendTable
          data={legenddata}
          heading={['']}
          width={width}
          height={legendTableHeight}
        />
      )}
    </div>
  );
};

export { RadialChart };
