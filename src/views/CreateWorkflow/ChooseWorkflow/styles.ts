import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: theme.spacing(4, 2),
    margin: '0 auto',
    width: '88%',
    height: '100%',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      width: '87%',
    },
  },

  // Inner Container
  innerContainer: {
    margin: theme.spacing(4, 'auto'),
    width: '95%', // Inner width of the container
  },

  // Header Div
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '1.2rem',
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.4rem',
    },
  },
  subtitle: {
    margin: theme.spacing(2, 0),
    [theme.breakpoints.up('lg')]: {
      fontSize: '1rem',
      margin: theme.spacing(4, 0),
    },
  },

  // Divider
  divider: {
    border: 'none',
    backgroundColor: theme.palette.disabledBackground,
    height: '0.1rem',
  },

  // Selection Radio Buttons
  m5: {
    marginTop: theme.spacing(5),
  },
  accordion: {
    border: 'none',
    boxShadow: 'none',
    '& .MuiAccordionSummary-root': {
      marginLeft: '-1rem',
      border: 'none',
      height: '0.5rem',
    },

    '& .MuiAccordionDetails-root': {
      position: 'relative',
      marginLeft: '-1rem',
      border: 'none',
    },
  },

  // Accordion Expanded Body [Content]
  predefinedWorkflowDiv: {
    height: window.screen.height < 1080 ? '15rem' : '20rem',
    overflowY: 'scroll',
  },
  predefinedWorkflowCard: {
    backgroundColor: theme.palette.cards.background,
    lineHeight: '5rem', // Making the div content vertically aligned
    padding: theme.spacing(0, 5),
    margin: theme.spacing(1, 0),

    '& #body': {
      width: '40rem',
      display: 'flex',
      justifyContent: 'space-between',
    },

    '& #left-div': {
      width: '15rem',
      display: 'flex',
      marginLeft: theme.spacing(2),
    },

    '& #right-div': {
      width: '20rem',
      display: 'flex',
    },
  },
  experimentIcon: {
    width: '3rem',
    height: '3rem',
  },
  predefinedWorkflowName: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1.5),
  },
  blur: {
    height: '4rem',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    background: theme.palette.background.paper,
    opacity: '0.8',
    filter: 'blur(1rem)',
  },
}));

export default useStyles;
