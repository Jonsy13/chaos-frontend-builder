import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    display: 'flex',
    flexDirection: 'column',
    width: '95%',
    marginLeft: theme.spacing(1.25),
    marginTop: theme.spacing(3),
  },
  header: {
    width: '100%',
    color: theme.palette.text.primary,
    margin: theme.spacing(4.5, 1.5, 2.5, 1.5),
  },
  backdrop: {
    background: theme.palette.modal.backdrop,
    display: 'flex',
    flexDirection: 'column',
  },
  noGithubAccount: {
    margin: 'auto',
    height: '100%',
    width: '25rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSection: {
    width: '100%',
    height: '5.625rem',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    border: '0.0625rem solid',
    borderColor: theme.palette.border.main,
    backgroundColor: theme.palette.sidebarMenu,
  },
  search: {
    fontSize: '1rem',
    marginRight: 'auto',
    borderBottom: `1px solid ${theme.palette.border.main}`,
    marginLeft: theme.spacing(6.25),
  },
  noGitHubText: {
    textAlign: 'center',
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
  },
  githubConfirmed: {
    display: 'flex',
    flexDirection: 'column',
  },
  chartsGroup: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    border: '0.0625rem solid',
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(2),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.palette.border.main,
    backgroundColor: theme.palette.sidebarMenu,
  },
  cardDiv: {
    width: '12.5rem',
    height: '12.5rem',
    border: `1px solid ${theme.palette.border.main}`,
    '&:hover': {
      border: `1.8px solid ${theme.palette.secondary.dark}`,
      cursor: 'pointer',
    },
    borderRadius: theme.spacing(0.5),
    margin: theme.spacing(2),
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    '&:hover': {
      backgroundColor: '#173433',
    },
    height: '100%',
    backgroundColor: theme.palette.cards.background,
  },
  cardImage: {
    marginTop: theme.spacing(1.5),
    width: '5rem',
    height: '5rem',
  },
  categoryName: {
    marginTop: theme.spacing(2),
    fontSize: '1rem',
    color: theme.palette.secondary.dark,
  },
  expName: {
    fontSize: '0.875rem',
  },
  lastSyncText: {
    marginTop: theme.spacing(1.875),
    fontSize: '0.875rem',
  },
}));

export default useStyles;
