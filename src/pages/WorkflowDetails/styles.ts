import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(3),
  },

  // Back Button
  button: {
    margin: theme.spacing(4, 0, 0, 0),
  },

  // WorkflowName Header
  heading: {
    margin: theme.spacing(2, 0, 0, 0),
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },

  // Second Heading
  heading1 :{
    margin: theme.spacing(2, 0, 0, 0),
    fontSize: '1rem',
  },

  // AppBar and Tabs
  appBar: {
    background: 'transparent',
    boxShadow: 'none',
  },

  // Graphical View
  workflowGraph: {
    height: '40vh',
    width: '100%',
  },

  graphView: {
    padding: '0.5rem 0.5rem',
    height: '100%',
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(-1.5),
    backgroundColor: theme.palette.modal.background
  },

  nodeTable: {
    marginLeft: theme.spacing(-1.5),
  },

}));

export default useStyles;
