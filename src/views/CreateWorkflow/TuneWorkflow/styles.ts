import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    border: `0.0625rem solid ${theme.palette.border.main}`,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '0.1875rem',
    height: '100%',
    width: '80%',
    margin: '0 auto',
    borderColor: 'rgba(0, 0, 0, 0.05)',
    flexDirection: 'column',
    padding: theme.spacing(0, 3.125, 5, 0),
  },

  buttomPadding: {
    paddingBottom: theme.spacing(4),
  },

  tuneDiv: {
    paddingRight: theme.spacing(3.75),
  },

  heading: {
    marginTop: theme.spacing(6),
    fontFamily: 'Ubuntu',
    fontSize: '1.5rem',
    marginLeft: theme.spacing(2),
  },

  description: {
    width: '50rem',
    marginTop: theme.spacing(3),
    fontFamily: 'Ubuntu',
    fontSize: '1rem',
    marginLeft: theme.spacing(2),
  },

  descriptionextended: {
    width: '50rem',
    marginTop: theme.spacing(0),
    fontFamily: 'Ubuntu',
    fontSize: '1rem',
    marginLeft: theme.spacing(2),
  },

  horizontalLine: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(-2),
    marginRight: theme.spacing(4),
    background: theme.palette.border.main,
  },

  editorfix: {
    marginTop: theme.spacing(1),
    width: '100%',
  },
}));

export default useStyles;
