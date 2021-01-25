import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headerDiv: {
    margin: theme.spacing(4, 0, 2, 1.5),
  },
  headerText: {
    marginTop: theme.spacing(2),
  },
  headerDesc: {
    fontSize: '1rem',
  },
  mainText: {
    width: '20%',
  },
  mainDetail: {
    width: '100%',
    fontSize: '0.875rem',
  },
  appInfoMainDiv: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing(3.75),
  },
  appInfoDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.spacing(2.5),
  },
  appInfoHeader: {
    fontSize: '0.75rem',
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(1.25),
  },
  inputField: {
    marginLeft: theme.spacing(2.5),
  },
  appInfoText: {
    fontSize: '0.875rem',
    width: '6.25rem',
  },
  appKind: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.spacing(2.5),
  },
  envHeader: {
    fontSize: '0.75rem',
  },
  envName: {
    width: '40%',
    fontSize: '0.875rem',
  },
  customEnvDiv: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing(3.75),
    marginTop: theme.spacing(2.5),
  },
  addEnvBtn: {
    width: '12.5rem',
    marginLeft: theme.spacing(2.5),
    marginTop: theme.spacing(1.5),
  },
  nextBtn: {
    width: '12.5rem',
    marginLeft: 'auto',
    marginTop: theme.spacing(3.75),
    marginBottom: theme.spacing(3.75),
  },
  workflowDiv: {
    width: '95%',
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
  },
  inputDiv: {
    display: 'flex',
    flexDirection: 'row',
    margin: theme.spacing(2.5),
    alignItems: 'center',
  },
  inputDivEnv: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    marginTop: theme.spacing(1.25),
  },
  horizontalLineHeader: {
    border: `1px solid  ${theme.palette.border.main}`,
    width: '97%',
    margin: theme.spacing(3.25, 0, 1.25, 0),
  },
  formControl: {
    height: '2.5rem',
    minWidth: '9rem',
  },
  selectText: {
    height: '2.5rem',
    padding: theme.spacing(0.5),
  },
  selectText1: {
    height: '2.5rem',
    top: theme.spacing(0.875),
    maxWidth: '5rem',
    fontSize: '0.875rem',
    padding: theme.spacing(0.5),
  },
  nextArrow: {
    paddingRight: theme.spacing(0.625),
  },
}));
export default useStyles;
