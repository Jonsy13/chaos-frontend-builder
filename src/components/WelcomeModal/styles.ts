import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  /* CSS for Modal Page Component */
  heading: {
    fontSize: '2rem',
    textalign: 'center',
    marginTop: theme.spacing(3),
    color: theme.palette.text.primary,
  },
  infoHeading: {
    fontfamily: theme.typography.fontFamily,
    fontsize: '2rem',
    textalign: 'center',
    color: theme.palette.text.primary,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  modal: {
    overflow: 'hidden',
  },
  insideModal: {
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(20),
    },
    padding: theme.spacing(6),
  },
  mark: {
    marginTop: theme.spacing(6),
    textAlign: 'center',
  },
}));
export default useStyles;
