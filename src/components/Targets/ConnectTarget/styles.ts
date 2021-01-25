import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.border.main}`,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 3,
    paddingBottom: theme.spacing(4),
    margin: theme.spacing(4, 0, 2, 4),
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2.5),
    marginLeft: theme.spacing(2),
  },
  backBotton: {
    paddingTop: theme.spacing(5),
    marginLeft: theme.spacing(2),
  },
  mark: {
    marginTop: theme.spacing(14),
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    textalign: 'center',
    color: theme.palette.text.secondary,
  },
  headWorkflow: {
    fontsize: '3rem',
    lineheight: '170%',
    textalign: 'center',
    marginTop: theme.spacing(4),
  },
  connectTarget: {
    display: 'flex',
    flexDirection: 'row',
    margin: theme.spacing(4, 8, 0, 0),
  },
  loader: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(6),
    textalign: 'center',
    marginLeft: theme.spacing(10),
  },
  connectdevice: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
  },
  stepsDiv: {
    marginLeft: theme.spacing(8),
    width: '50rem',
    height: '10rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
    color: theme.palette.text.secondary,
  },
  buttonModal: {
    display: 'flex',
    marginTop: theme.spacing(6),
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  connectText: {
    fontSize: '1rem',
  },
  loaderMargin: {
    marginRight: theme.spacing(2),
  },
  rightMargin: {
    margin: 'auto',
  },
  /* back Button */
  backButon: {
    display: 'flex',
    flexDirection: 'row',
    textTransform: 'none',
  },
  arrow: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(0.3),
  },
  text: {
    marginRight: theme.spacing(1),
    opacity: 0.5,
  },
  textLink: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    fontSize: '1rem',
  },
  docLink: {
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.secondary.dark,
    },
  },
}));

export default useStyles;
