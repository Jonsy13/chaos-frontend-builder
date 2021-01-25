import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  // Choose A Workflow Component Styles
  rootcontainer: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(4),
    margin: '0 auto',
    width: '80%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  check: {
    margin: theme.spacing(10, 0, 0, 20),
    '&:hover': {
      shadow: theme.palette.secondary.dark,
    },
  },
  // External agent styles
  selectText: {
    height: '2.9rem',
    paddingLeft: theme.spacing(1),

    '& .MuiSelect-icon': {
      color: theme.palette.text.secondary,
    },
  },
  formControl: {
    marginRight: theme.spacing(2.5),
    height: '2.5rem',
    minWidth: '14rem',
  },

  heading: {
    marginLeft: theme.spacing(20),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    textAlign: 'left',
    fontSize: 36,
    lineHeight: '130.02%',
    color: theme.palette.text.secondary,
  },
  headchaos: {
    textAlign: 'left',
    margin: theme.spacing(0, 0, 1, 20),
    color: theme.palette.text.secondary,
  },
  headcluster: {
    marginLeft: theme.spacing(20),
    textAlign: 'left',
  },
  radiobutton: {
    marginLeft: theme.spacing(20),
    textAlign: 'left',
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(18),
  },
  buttonDiv: {
    marginTop: theme.spacing(6),
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: '1rem',
  },
  marginTemporary: {
    marginTop: theme.spacing(1.5),
  },
}));

export default useStyles;
