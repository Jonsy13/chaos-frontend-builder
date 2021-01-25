import { makeStyles } from '@material-ui/core';

interface StyleProps {
  isDisabled?: boolean;
}

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  backdrop: {
    background: theme.palette.modal.backdrop,
    display: 'flex',
    flexDirection: 'column',
  },

  root: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },

  mainDiv: {
    padding: theme.spacing(3.75, 8),
    borderRadius: 3,
    backgroundColor: theme.palette.background.paper,
    width: '50rem',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      width: '20rem',
    },
  },

  userName: {
    fontSize: '2.5rem',
    marginTop: theme.spacing(1.75),
    marginBottom: theme.spacing(2.75),
  },

  headingDiv: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },

  arrowForwardIcon: {
    color: theme.palette.highlight,
    marginLeft: theme.spacing(17.5),
    marginTop: theme.spacing(12.5),
  },

  mainHeading: {
    color: theme.palette.primary.dark,
    fontSize: '1.5625rem',
    marginBottom: theme.spacing(0.625),
  },

  mainResult: {
    color: theme.palette.text.primary,
    fontSize: '1.5625rem',
    maxWidth: '25rem',
    marginBottom: theme.spacing(3.125),
  },

  mainDesc: {
    color: theme.palette.text.primary,
    fontSize: '1.125rem',
    maxWidth: '36rem',
  },

  imageDiv: {
    margin: 'auto',
    '& img': {
      userDrag: 'none',
      height: '200%',
      width: '200%',
    },
  },

  contentDiv: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(3.75),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },

  statsHeading: {
    fontSize: '1.5625rem',
    marginBottom: theme.spacing(3.75),
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(5),
  },

  quickActionDiv: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginLeft: theme.spacing(3),
    background: 'inherit',
  },

  cardDiv: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  predefinedBtn: {
    marginTop: theme.spacing(4.5),
  },

  btnHeaderDiv: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },

  seeAllBtn: {
    marginTop: theme.spacing(1.5),
    marginRight: theme.spacing(6),
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(0.2),
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(3.8),
    },
  },

  btnSpan: {
    display: 'flex',
    flexDirection: 'row',
  },

  btnText: {
    paddingRight: theme.spacing(1.25),
    textDecoration: 'none',
    color: theme.palette.secondary.dark,
  },

  createCardAction: {
    width: '15.375rem',
    color: (props: StyleProps) =>
      props.isDisabled
        ? theme.palette.text.disabled
        : theme.palette.text.primary,
    borderRadius: '0.1875rem',
    padding: theme.spacing(3.75),
    height: '22.5rem',
  },

  createCardTitle: {
    color: (props: StyleProps) =>
      props.isDisabled ? theme.palette.text.disabled : theme.palette.highlight,
    fontWeight: 700,
    marginTop: theme.spacing(10),
    fontSize: '1.5rem',
    lineHeight: '130%',
  },

  createCardHeading: {
    fontSize: '0.875rem',
  },

  createCard: {
    [theme.breakpoints.down('md')]: {
      marginRight: theme.spacing(3.75),
    },
    marginLeft: theme.spacing(5),
    pointerEvents: (props: StyleProps) => (props.isDisabled ? 'none' : 'all'),
    boxShadow: (props: StyleProps) =>
      props.isDisabled ? '' : `0px 4px 12px ${theme.palette.highlight}40`,
    border: (props: StyleProps) =>
      props.isDisabled
        ? `1px solid ${theme.palette.text.disabled}`
        : `1px solid ${theme.palette.highlight}`,
    boxSizing: 'border-box',
  },

  noAgentFlex: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(-3),
  },

  zeroImageDiv: {
    marginRight: theme.spacing(5),
    '& img': {
      userDrag: 'none',
      height: '125%',
      width: '125%',
    },
  },

  mainDescArrow: {
    color: theme.palette.text.primary,
    fontSize: '1.125rem',
    maxWidth: '36rem',
    margin: theme.spacing(15.5, 0, 0, 2.5),
  },

  mainDescDown: {
    color: theme.palette.text.primary,
    fontSize: '1.125rem',
    maxWidth: '36rem',
    marginTop: theme.spacing(15),
  },
}));

export default useStyles;
