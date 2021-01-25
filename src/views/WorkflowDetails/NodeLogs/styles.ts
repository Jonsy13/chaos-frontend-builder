import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2,0,0,0),
    width: '100%'
  },
  logsHeading: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginLeft: "1rem",
  },

  logs: {
    padding: theme.spacing(1.5),
    overflowY: 'scroll',
    [theme.breakpoints.up('lg')]: {
      height: '15rem',
    },
    margin: "1rem 1rem",
    height: '20rem',
    background: theme.palette.common.black,
    color: theme.palette.text.secondary,
    textAlign: 'left',
  },
  closeButton: {
    borderColor: theme.palette.border.main,
  },
  text: {
    fontSize: '1rem',
  },
}));

export default useStyles;
