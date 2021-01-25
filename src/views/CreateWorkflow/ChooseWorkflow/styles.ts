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
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 3.125, 4, 3.125),
  },

  cards: {
    paddingLeft: theme.spacing(1.875),
    paddingRight: theme.spacing(1.875),
  },

  heading: {
    marginTop: theme.spacing(6),
    fontFamily: 'Ubuntu',
    fontSize: '1.5rem',
    marginLeft: theme.spacing(2),
  },

  modalHeading: {
    marginTop: theme.spacing(1.5),
    fontFamily: 'Ubuntu',
    fontSize: '2.25rem',
  },
  down: {
    marginBottom: theme.spacing(2),
  },
  description: {
    width: '90%',
    marginTop: theme.spacing(3.25),
    fontFamily: 'Ubuntu',
    fontSize: '1rem',
    marginLeft: theme.spacing(2),
  },

  horizontalLine: {
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(4.5),
    background: theme.palette.border.main,
  },

  paddedTop: {
    marginTop: theme.spacing(5),
  },

  totalWorkflows: {
    fontSize: '1rem',
    fontWeight: 500,
  },

  inputDiv: {
    marginTop: theme.spacing(5),
  },

  saved: {
    width: '25rem',
    marginTop: theme.spacing(6),
    fontFamily: 'Ubuntu',
    lineHeight: '130%',
    fontWeight: 500,
    fontSize: '1rem',
    color: theme.palette.primary.dark,
  },

  testType: {
    fontSize: '1rem',
    fontFamily: 'Ubuntu',
    paddingRight: theme.spacing(1.25),
  },

  resizeName: {
    fontSize: '0.875rem',
  },

  modalContainerBody: {
    position: 'relative',
    width: '70%',
    margin: 'auto',
  },

  modal: {
    padding: theme.spacing(5),
  },

  closeButton: {
    borderColor: theme.palette.border.main,
  },

  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
  },

  selectionName: {
    fontFamily: 'Ubuntu',
    fontSize: '1rem',
  },

  cancelButton: {
    marginLeft: theme.spacing(-2),
  },
  saveButton: {
    marginRight: theme.spacing(-2),
  },
}));

export default useStyles;
