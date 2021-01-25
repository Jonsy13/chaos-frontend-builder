import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    marginTop: '1rem',
  },
  header: {
    color: theme.palette.secondary.dark,
  },
  bold: {
    fontWeight: 500,
  },
  workflowSpacing: {
    margin: '1rem 1rem',
  },
  divider: {
    background: theme.palette.text.disabled,
    height: '0.2rem',
  },
  heightMaintainer: {
    lineHeight: '2rem',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

export default useStyles;
