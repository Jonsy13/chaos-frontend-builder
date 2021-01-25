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
    borderColor: theme.palette.cards.background,
    backgroundColor: theme.palette.background.paper,
  },

  search: {
    fontSize: 14,
    marginRight: 'auto',
    borderBottom: `1px solid ${theme.palette.border.main}`,
    marginLeft: theme.spacing(6.25),
  },

  input: {
    '&:-webkit-autofill': {
      WebkitTextFillColor: theme.palette.text.secondary,
      WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset`,
    },
  },
  // Form Select Properties
  formControl: {
    margin: theme.spacing(0.5),
    marginRight: theme.spacing(2.5),
    minWidth: '9rem',
  },

  selectText: {
    color: theme.palette.border.main,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0.4),
  },

  selectDate: {
    display: 'flex',
    flexDirection: 'row',
    height: '2.5rem',
    minWidth: '9rem',
    border: '0.1px solid',
    borderRadius: 4,
    borderColor: theme.palette.border.main,
    marginRight: theme.spacing(3.75),
    textTransform: 'none',
  },
  displayDate: {
    marginLeft: theme.spacing(1),
    width: '100%',
    color: theme.palette.text.primary,
  },

  // Table and Table Data Properties
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  tableMain: {
    marginTop: theme.spacing(4.25),
    border: `1px solid ${theme.palette.background.paper}`,
    backgroundColor: theme.palette.background.paper,
    height: '29.219rem',
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
    '& p': {
      fontWeight: 'bold',
      fontSize: '0.8125rem',
    },
    '& th': {
      fontWeight: 'bold',
      fontSize: '0.8125rem',
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.background.paper,
    },
  },
  headerStatus: {
    paddingLeft: theme.spacing(8),
    color: theme.palette.text.primary,
    opacity: 0.6,
  },
  workflowName: {
    borderRight: `1px solid ${theme.palette.border.main}`,
    color: theme.palette.text.hint,
  },
  sortDiv: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing(1.25),
  },
  headData: {
    color: theme.palette.text.primary,
    opacity: 0.6,
  },
  tableDataStatus: {
    paddingLeft: theme.spacing(8.5),
  },
  progressBar: {
    width: '6.5rem',
  },
  steps: {
    marginLeft: theme.spacing(5.625),
  },
  workflowNameData: {
    maxWidth: '15.625rem',
    borderRight: `1px solid ${theme.palette.border.main}`,
  },
  targetCluster: {
    paddingLeft: theme.spacing(3.75),
    color: theme.palette.text.primary,
    opacity: 0.6,
  },
  clusterName: {
    marginLeft: theme.spacing(4),
  },
  reliabiltyData: {
    width: '8.125rem',
  },
  stepsData: {
    paddingLeft: theme.spacing(3.75),
  },
  optionBtn: {
    marginLeft: 'auto',
  },
  timeDiv: {
    display: 'flex',
    flexDirection: 'row',
  },
  failed: {
    color: theme.palette.error.main,
  },
  success: {
    color: theme.palette.primary.dark,
  },
  headerIcon: {
    color: theme.palette.text.primary,
    opacity: 0.6,
  },
  // Menu option with icon
  expDiv: {
    display: 'flex',
    flexDirection: 'row',
    cursor: 'pointer',
  },
  btnImg: {
    width: '0.8125rem',
    height: '0.8125rem',
    marginTop: theme.spacing(0.375),
  },
  btnText: {
    paddingLeft: theme.spacing(1.625),
  },
  paddedTypography: {
    paddingTop: theme.spacing(1.5),
    color: theme.palette.text.primary,
    opacity: 0.6,
  },
  pagination: {
    marginTop: theme.spacing(-0.25),
    borderTop: `1px solid ${theme.palette.border.main}`,
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
