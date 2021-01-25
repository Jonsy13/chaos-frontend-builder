/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@material-ui/core';

interface StyleProps {
  color?: string;
  width?: number;
  height?: number;
  align?: string;
}

const useStyles = makeStyles(() => ({
  rectBase: {
    fill: '#1C2126',
  },
  table: (props: StyleProps) => ({
    display: 'flex',
    width: props.width,
    height: props.height,
    backgroundColor: '#1C2126',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '6px',
      height: '6px',
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: 'rgba(10, 24, 24, 0.9)',
      borderRadius: '5px',
    },

    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'rgba(10, 24, 24, 0.9)',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(82,249,149,0.6)',
      borderRadius: '5px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: 'rgba(82,249,149,0.9)',
    },
  }),
  tableCell: {
    border: 'none',
    maxWidth: '30%',
    minWidth: '10%',
    maxHeight: '10%',
  },
  tableDataRow: {
    '& td': {
      borderBottom: 'none !important',
    },
    float: 'left',
    display: 'flex',
    alignItems: 'flex-start',
  },
  tableFont: {
    fontFamily: 'Ubuntu',
    fontSize: '1rem',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '16px',
    borderBottom: 'none',
    letterSpacing: '0em',
    paddingLeft: '0.5em',
    textAlign: 'left',
  },
  tableHeading: {
    paddingLeft: '1.5em',
    fontSize: '0.9rem',
    color: '#0098DD',
    whiteSpace: 'nowrap',
    fontWeight: 500,
  },
  tableRow: {
    height: '2rem',
    '& td': {
      borderBottom: 'none !important',
    },
  },
  dot: {
    height: '10px',
    width: '10px',
    borderRadius: '50%',
    display: 'inline-block',
  },
}));
export { useStyles };
