import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(3),
  },
  graphView: {
    padding: '0.5rem 0.5rem',
    height: '100%',
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.modal.background
  },
  icon: {
    margin: theme.spacing(-0.4, 1),
    width: '1rem',
  },
  experimentDetails:{
    width: '40%',
  },
  button: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(4, 0, 0, 0),
  },
  heading: {
    margin: theme.spacing(2, 0, 0, 0),
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  heading1 :{
    margin: theme.spacing(2, 0, 0, 0),
    fontSize: '1rem',
  },
  workflowGraph: {
    height: '30vh',
    width: '100%',
  },
  workflowDetails: {
    // marginTop: "1rem",
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.cards.background
  },
  loaderDiv: {
    height: '100%',
  },
  appBar: {
    background: 'transparent',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
  },
  btnOutline: {
    height: '2.2rem',
  },
  logsPanel:{
    width: "100%"
  }
}));

export default useStyles;
