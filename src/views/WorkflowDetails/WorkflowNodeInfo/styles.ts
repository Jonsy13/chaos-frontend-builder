import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    marginTop: '1rem',
  },
  bold: {
    // margin: theme.spacing(1,0,1,0),
    fontWeight: 500,
  },
  header: {
    color: theme.palette.secondary.dark,
  },
  nodeSpacing: {
    width: '40%',
    margin: '1rem 1rem',
  },
  heightMaintainer: {
    display: 'flex',
    // margin: '0rem 0rem 1rem 0rem',
    lineHeight: '2rem',
    justifyContent: 'space-between'
  },
  footerButton: {
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(3, 4, 4, 0),
  },
  nodeDetails: {
    display: 'flex'
  },
  textMargin: {
    margin: theme.spacing(1,0,1,0)
  }
}));

export default useStyles;
