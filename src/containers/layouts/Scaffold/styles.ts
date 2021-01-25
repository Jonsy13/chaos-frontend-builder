import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    overflow: 'hidden',
    height: '100vh',
    width: '100%',
    color: theme.palette.text.primary,
    display: 'grid',
    gridTemplateColumns: '15.375rem auto',
    gridTemplateRows: '5em auto',
    gridTemplateAreas: '"sidebar header" "sidebar content"',

    // Scrollbar
    '& ::-webkit-scrollbar': {
      width: '0.4rem',
    },
    '& ::-webkit-scrollbar-track': {
      webkitBoxShadow: `inset 0 0 8px ${theme.palette.common.black}`,
    },
    '& ::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: 8,
    },
    '& img': {
      userDrag: 'none',
    },
  },
  header: {
    gridArea: 'header',
  },
  content: {
    gridArea: 'content',
    padding: theme.spacing(5, 7.5),
    overflowY: 'auto',
  },
  sidebar: {
    gridArea: 'sidebar',
  },
}));

export default useStyles;
