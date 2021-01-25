// this is a file will be removed later

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { LegendData } from '../graph/base';
import { useStyles } from './styles-legend';

const colorArr = ['#52F995', '#F6B92B', '#CA2C2C'];
const colorCount = 3;
export type LegendProps = {
  data?: Array<LegendData>;
  heading?: Array<string>;
  width?: number;
  height?: number;
};

const LegendTable: React.FC<LegendProps> = ({
  data,
  heading,
  width = 200,
  height = 70,
}) => {
  const classes = useStyles({ width, height });
  return (
    <TableContainer className={classes.table}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow className={classes.tableRow}>
            {heading &&
              heading.map((element) => (
                <TableCell
                  key={`${element}-heading-cell`}
                  className={`${classes.tableFont} ${classes.tableHeading}`}
                >
                  {element}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={classes.tableRow}>
            {data &&
              data.map((element, index) => (
                <TableCell
                  key={`${element.value}-${Math.random() * 100} `}
                  className={classes.tableCell}
                >
                  <div className={classes.tableDataRow}>
                    <span
                      className={classes.dot}
                      style={{ backgroundColor: colorArr[index % colorCount] }}
                    >
                      {' '}
                    </span>

                    <Typography className={classes.tableFont}>
                      {element.value}
                    </Typography>
                  </div>
                </TableCell>
              ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export { LegendTable };
