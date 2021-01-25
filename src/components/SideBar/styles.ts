import { fade, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: '100%',
    height: '100%',
    borderRight: '1px solid rgba(45, 166, 96, 0.2)',
  },
  drawerPaper: {
    width: '100%',
    position: 'relative',
    backgroundColor: theme.palette.sidebarMenu,
    color: 'inherit',
  },
  appsDiv: {
    display: 'flex',
    padding: 0,
  },
  iconColor: {
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  iconButton: {
    padding: 0,
  },
  appsIcon: {
    margin: theme.spacing(3.5, 3.375, 3.375, 3.5),
    '& img': {
      userDrag: 'none',
    },
  },
  switchText: {
    color: theme.palette.text.hint,
    '& span': {
      fontWeight: 700,
      fontSize: '0.875rem',
      margin: theme.spacing(6, 0, 4, 2.375),
    },
  },
  popOverList: {
    background: theme.palette.cards.background,
    minWidth: '17.75rem',
    minHeight: '15.1875rem',
    paddingLeft: theme.spacing(3.5),
    borderRadius: '0.5rem',
    opacity: '98%',
  },
  popOverPaper: {
    marginLeft: theme.spacing(-2),
    marginTop: theme.spacing(-0.2),
  },
  homeLink: {
    textDecoration: 'none',
  },
  clearIconBackground: {
    background: fade(theme.palette.cards.background, 0.9),
  },
  logo: {
    left: theme.spacing(4.375),
  },
  drawerListItem: {
    display: 'flex',
    height: '3.187rem',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.text.primary,
      '& path': {
        fill: theme.palette.text.primary,
      },
    },
  },
  active: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: theme.palette.secondary.contrastText,
    '& path': {
      fill: theme.palette.text.secondary,
    },
  },
  listIcon: {
    paddingLeft: theme.spacing(2),
  },
  listText: {
    marginLeft: theme.spacing(0),
    fontSize: '1rem',
  },
  drawerList: {
    marginTop: theme.spacing(3.75),
    height: '16.68rem',
  },
  kuberaChaosLogo: {
    marginLeft: theme.spacing(2),
    height: '5rem',
    width: '8.5rem',
  },
  info: {
    marginTop: 'auto',
    marginLeft: theme.spacing(5),
    paddingBottom: theme.spacing(3.75),
    display: 'flex',
    flexDirection: 'column',
  },
  logodiv: {
    color: theme.palette.text.primary,
    display: 'flex',
    marginTop: theme.spacing(0.8125),
  },
  mayadataLogo: {
    margin: theme.spacing(-0.75, 0, 0, 1.5),
    height: '2rem',
    width: '6rem',
  },
  versionAndBuildTimeText: {
    margin: 'auto',
    color: theme.palette.text.primary,
    fontSize: '0.75rem',
  },
}));

export default useStyles;
