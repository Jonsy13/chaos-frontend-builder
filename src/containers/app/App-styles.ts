import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 'auto',
    height: '100vh',
    zIndex: 1,
  },
  appFrame: {
    position: 'relative',
    width: '100%',
    height: '100%',
    color: theme.palette.text.primary,
  },
  content: {
    background: theme.palette.background.default,
    width: '100%',
    height: '100vh',
  },
}));

export default useStyles;
