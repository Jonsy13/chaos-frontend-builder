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
  input: {
    '&:-webkit-autofill': {
      WebkitTextFillColor: theme.palette.text.secondary,
      WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset`,
    },
  },
  popOver: {
    marginTop: theme.spacing(5),
  },
  search: {
    fontSize: '1rem',
    marginRight: 'auto',
    borderBottom: `1px solid ${theme.palette.border.main}`,
    marginLeft: theme.spacing(6.25),
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
    height: '2.5rem',
    minWidth: '9rem',
    border: `0.1px solid ${theme.palette.border.main}`,
    borderRadius: 4,
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
    height: '28.219rem',
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
  tableRows: {
    padding: theme.spacing(4),
    color: theme.palette.text.hint,
    height: '4.6875rem',
  },
  dataRow: {
    height: '4.6875rem',
  },
  headerStatus: {
    paddingLeft: theme.spacing(7),
    color: theme.palette.text.primary,
    opacity: 0.6,
  },
  workflowCell: {
    borderRight: `1px solid ${theme.palette.border.main}`,
  },
  workflowName: {
    color: theme.palette.text.primary,
    opacity: 0.6,
  },
  sortDiv: {
    paddingLeft: theme.spacing(1.5),
  },
  headData: {
    color: theme.palette.text.primary,
    opacity: 0.6,
  },
  tableDataStatus: {
    paddingLeft: theme.spacing(5),
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
    paddingLeft: theme.spacing(4),
  },
  workflowNameDataColor: {
    color: theme.palette.text.primary,
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
    paddingLeft: theme.spacing(5),
  },
  stepsDataTime: {
    paddingLeft: theme.spacing(7),
  },
  stepsDataschedule: {
    paddingLeft: theme.spacing(8),
  },
  disconnect: {
    paddingLeft: theme.spacing(3),
  },
  optionBtn: {
    marginLeft: 'auto',
  },
  timeDiv: {
    display: 'flex',
    flexDirection: 'row',
  },
  success: {
    color: theme.palette.primary.dark,
  },
  iconButton: {
    width: '2rem',
    height: '2rem',
  },
  tableCell: {
    display: 'flex',
    flexDirection: 'row',
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
  // date picker
  datePickerColor: {
    color: theme.palette.secondary.dark,
  },
  // Table status
  check: {
    width: '5.9125rem',
    textAlign: 'center',
    borderRadius: 3,
    paddingTop: theme.spacing(0.375),
    paddingBottom: theme.spacing(0.375),
    color: theme.palette.primary.dark,
  },
  active: {
    color: theme.palette.primary.dark,
    background: theme.palette.success.light,
  },
  notactive: {
    color: theme.palette.error.dark,
    backgroundColor: theme.palette.error.light,
  },
  pending: {
    background: theme.palette.warning.light,
    color: theme.palette.warning.main,
  },
  statusFont: {
    fontSize: '0.725rem',
  },
  // Delete Cluster Modal
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(7.5),
    marginBottom: theme.spacing(7.5),
  },
  // styles for text
  text: {
    width: '31.93rem',
    height: '5.875rem',
    marginTop: theme.spacing(3.75),
    marginBottom: theme.spacing(3.75),
  },
  typo: {
    fontSize: '2rem',
  },
  textSecond: {
    width: '29.06rem',
    height: '1.6875rem',
    marginTop: theme.spacing(1.875),
    marginBottom: theme.spacing(3.75),
  },
  typoSub: {
    fontSize: '1rem',
  },
  // for yes or no buttons
  buttonGroup: {
    display: 'flex',
    marginTop: theme.spacing(2.5),
    justifyContent: 'space-between',
    gap: '1rem',
  },
  // delete user
  delDiv: {
    maxWidth: '8.56rem',
    display: 'flex',
    marginTop: theme.spacing(3),
    color: theme.palette.error.dark,
  },
  bin: {
    marginRight: theme.spacing(1.485),
  },
  otherTC: {
    maxWidth: '15.375rem',
  },
  deleteCluster: {
    display: 'flex',
    flexDirection: 'column',
  },
  customTooltip: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.text.primary,
    fontSize: '0.775rem',
  },
  error: {
    borderColor: theme.palette.error.main,
    '&:hover': {
      borderColor: theme.palette.error.main,
      boxShadow: '',
    },
    '&$focused': {
      backgroundColor: theme.palette.text.secondary,
      borderColor: theme.palette.error.main,
      color: theme.palette.error.main,
    },
  },
  pagination: {
    marginTop: theme.spacing(-0.25),
    borderTop: `1px solid ${theme.palette.border.main}`,
  },
  closeButton: {
    borderColor: theme.palette.border.main,
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
