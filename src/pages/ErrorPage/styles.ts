import { makeStyles } from '@material-ui/core/styles';

// Component styles
const useStyles = makeStyles((theme) => ({
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainHeader: {
    height: '100%',
    backgroundImage: 'url(./images/error-background.svg)',
    backgroundSize: 'cover',
  },
  root: {
    height: '100%',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: '10%',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: '5%',
    },
  },
  headerDiv: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    height: '16.25rem',
    textAlign: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  mainText: {
    fontSize: '12.5rem',
    color: theme.palette.text.secondary,
  },

  pageNotFound: {
    position: 'relative',
    color: theme.palette.text.secondary,
    fontSize: '2rem',
  },

  descText: {
    position: 'relative',
    fontSize: '1.125rem',
    maxWidth: '31.75rem',
    color: theme.palette.text.secondary,
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
  },

  goHome: {
    marginLeft: theme.spacing(2),
  },
}));

export default useStyles;
