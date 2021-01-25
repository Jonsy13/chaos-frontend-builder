import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '12.125rem',
    height: '14.5rem',
    borderRadius: '0.1875rem',
    boxSizing: 'border-box',
    background: '#173433',
    margin: theme.spacing(1.25, 1.25, 0, 0),
  },
  isActive: {
    border: `0.0625rem solid${theme.palette.highlight}`,
    boxShadow: `0 0 0.9375rem ${theme.palette.highlight}40`,
  },
  cardHeader: {
    textAlign: 'right',
    marginBottom: theme.spacing(1.5),
  },
  centerSection: {
    textAlign: 'center',
  },
  typeBtn: {
    height: '1.3125rem',
    minWidth: '4.125rem',
    width: 'auto',
    fontSize: '0.5625rem',
    color: theme.palette.primary.contrastText,
  },
  divider: {
    margin: theme.spacing(1.25, 0, 0.625, 0),
    background: theme.palette.primary.dark,
  },
  isGreen: {
    background: theme.palette.primary.dark,
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
  isRed: {
    background: theme.palette.error.dark,
    '&:hover': {
      background: theme.palette.error.dark,
    },
  },
  isYellow: {
    background: theme.palette.warning.main,
    '&:hover': {
      background: theme.palette.warning.main,
    },
  },
  pathName: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: '1rem',
    marginTop: theme.spacing(1.375),
  },
  experiments: {
    fontSize: '0.75rem',
    color: theme.palette.text.disabled,
    marginTop: theme.spacing(0.625),
  },
  gitHubBtn: {
    borderRadius: '0.25rem',
    color: theme.palette.primary.contrastText,
  },
}));

export default useStyles;
