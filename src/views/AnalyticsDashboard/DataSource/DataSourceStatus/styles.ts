import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  active: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.success.light,
  },
  notReady: {
    color: theme.palette.warning.main,
    backgroundColor: theme.palette.warning.main,
  },
  inactive: {
    color: theme.palette.error.dark,
    backgroundColor: theme.palette.error.light,
  },
  state: {
    width: '4.75rem',
    textAlign: 'center',
    borderRadius: 3,
    paddingTop: theme.spacing(0.375),
    paddingBottom: theme.spacing(0.375),
    verticalAlign: 'middle',
    display: 'inline-flex',
  },
  statusFont: {
    fontSize: '0.725rem',
    marginLeft: theme.spacing(2.5),
  },
}));

export default useStyles;
