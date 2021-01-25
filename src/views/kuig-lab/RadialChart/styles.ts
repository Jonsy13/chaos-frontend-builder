import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  rectBase: {
    fill: theme.palette.background.paper,
  },
  radicalArc: {
    opacity: 0.9,
    transform: 'scale(1)',
    '&:hover': {
      opacity: 1,
      transform: 'scale(1.02)',
    },
  },
  centerDataValue: {
    fontFamily: 'Ubuntu',
    fontSize: '3rem',
    fontStyle: 'normal',
    fontWeight: 500,
    textAlign: 'left',
    fill: 'white',
  },
  tableRow: {
    '& td': {
      borderBottom: 'none !important',
    },
  },
}));
export default useStyles;
