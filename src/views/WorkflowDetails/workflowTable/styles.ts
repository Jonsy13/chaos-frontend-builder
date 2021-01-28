import {
  createStyles,
  makeStyles,
  TableCell,
  Theme,
  withStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  // Header Section Properties
  headerSection: {
    width: '100%',
    height: '5.625rem',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
  },
  root: {
    backgroundColor: theme.palette.background.paper,
  },

  descHeader: {
    padding: theme.spacing(4, 4, 0, 4),
  },

  headerFlex: {
    display: 'flex',
  }, 

  headerItemFlex: {
    width: '25%',
  },

  headerMiniItemFlex: {
    width: '50%'
  },

  headerMiniItemText: {
    color: theme.palette.text.disabled,
  },

  descTextBold: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },

  textBold:{
    fontSize: '1rem',
    fontStyle: 'bold',
    marginBottom: theme.spacing(2),
  },

  applicationDetails:{
    display: 'flex',
  },

  viewLogs: {
    marginLeft: theme.spacing(1),
    color: theme.palette.highlight
  },

  arrowMargin: {
    marginLeft: theme.spacing(1),
  },

  // Table and Table Data Properties
  headerText: {
    marginLeft: theme.spacing(3.75),
    color: theme.palette.text.disabled,
    paddingBottom: theme.spacing(0.625),
  },
  tableMain: {
    marginTop: theme.spacing(4.25),
    border: `1px solid ${theme.palette.cards.background}`,
    backgroundColor: theme.palette.cards.background,
    '&::-webkit-scrollbar': {
      width: '0.2em',
    },
    '&::-webkit-scrollbar-track': {
      webkitBoxShadow: `inset 0 0 6px ${theme.palette.common.black}`,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.secondary.dark,
    },
    '&:not(:last-child)': {
      borderBottom: 0,
    },
  },
  tableHead: {
    height: '4.6875rem',
    '& p': {
      fontSize: '0.8125rem',
      fontWeight: 'bold',
    },
    '& th': {
      backgroundColor:theme.palette.cards.background,
      color: theme.palette.text.secondary,
    },
  },

  workflowName: {
    borderRight: `1px solid ${theme.palette.border.main}`,
    color: theme.palette.text.hint,
  },
  
  sortDiv: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1.25),
  },
  workflowNameData: {
    maxWidth: '16.625rem',
  },
  tableRows: {
    padding: theme.spacing(4),
    color: theme.palette.text.hint,
    height: '4.6875rem',
  },
  regularity: {
    color: theme.palette.text.primary,
    opacity: 0.6,
  },
  targetCluster: {
    color: theme.palette.text.primary,
    opacity: 0.6,
  },
  clusterStartDate: {
    paddingLeft: theme.spacing(10),
  },
  regularityData: {
    maxWidth: '16rem',
    paddingLeft: theme.spacing(0.2),
  },
  stepsData: {
    paddingLeft: theme.spacing(3.75),
  },
  expInfo: {
    fontWeight: 400,
    fontSize: 13,
  },
  expInfoActive: {
    color: theme.palette.primary.dark,
    fontWeight: 400,
    fontSize: 13,
  },
  expInfoActiveIcon: {
    color: theme.palette.primary.dark,
  },
  showExp: {
    paddingLeft: theme.spacing(1),
    color: theme.palette.text.primary,
    opacity: 0.6,
  },
  clusterData: {
    paddingTop: theme.spacing(1.25),
  },
  optionBtn: {
    marginLeft: theme.spacing(-6.25),
  },
  menuCell: {
    width: '3.125rem',
  },
  timeDiv: {
    display: 'flex',
    flexDirection: 'row',
  },
  dark: {
    color: theme.palette.text.disabled,
  },

  // Menu option with icon
  expDiv: {
    display: 'flex',
    flexDirection: 'row',
  },
  btnImg: {
    width: '0.8125rem',
    height: '0.8125rem',
    marginTop: theme.spacing(0.375),
  },
  btnText: {
    paddingLeft: theme.spacing(1.625),
  },
  downloadText: {
    paddingLeft: theme.spacing(1.2),
  },
  downloadBtn: {
    marginTop: theme.spacing(0.375),
    marginLeft: theme.spacing(-0.375),
    width: '1.2rem',
    height: '1.2rem',
  },
  // Experiment Weights PopOver Property
  weightDiv: {
    width: '15.1875rem',
    padding: theme.spacing(3.125, 2.6),
  },
  weightInfo: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: theme.spacing(0.625),
  },
  points: {
    marginLeft: 'auto',
    color: (props) =>
      props >= 4 && props <= 6
        ? theme.palette.warning.main
        : props >= 7
        ? theme.palette.primary.dark
        : theme.palette.error.dark,
    fontWeight: 500,
  },
  headerIcon: {
    color: theme.palette.text.primary,
    opacity: 0.6,
  },
  // Modal
  modalDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5),
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(15),
    },
  },
  successful: {
    fontSize: '2.2rem',
    fontWeight: 'bold',
  },
  small: {
    fontSize: '1.8rem',
  },
  modalHeader: {
    fontSize: '2.125rem',
    fontWeight: 400,
    marginBottom: theme.spacing(2),
    width: '31.25rem',
  },
  modalConfirm: {
    fontSize: '1.25rem',
    marginBottom: theme.spacing(5),
    width: '31.25rem',
  },
  modalBtns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '16rem',
  },
  pagination: {
    marginTop: theme.spacing(-0.25),
    borderTop: `1px solid ${theme.palette.border.main}`,
    width: '100%'
    
  },
  closeButton: {
    borderColor: theme.palette.border.main,
  },

  status: {
    display: 'flex',
    flexDirection: 'row',
  },
  icon:{
    marginRight: theme.spacing(1),
  },
  runningSmallIcon: {
    animation: 'runningNodeSpinAnimationSmall 2s ease-in-out infinite',
  },
  '@global': {
    '@keyframes runningNodeSpinAnimationSmall': {
      from: {
        transform: `rotate(0deg)`,
      },
      to: {
        transform: `rotate(360deg)`,
      },
    },
  },
}));

export default useStyles;

export const useOutlinedInputStyles = makeStyles((theme: Theme) => ({
  root: {
    '& $notchedOutline': {
      borderColor: theme.palette.border.main,
    },
    '&:hover $notchedOutline': {
      borderColor: theme.palette.border.main,
    },
    '&$focused $notchedOutline': {
      borderColor: theme.palette.border.main,
    },
    height: '2.5rem',
    color: theme.palette.text.primary,
  },
  focused: {},
  notchedOutline: {},
}));

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      borderBottom: `1px solid ${theme.palette.border.main}`,
    },
  })
)(TableCell);
