import { makeStyles } from '@material-ui/core';

interface StyleProps {
  color?: string;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '18rem',
    height: '4rem',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
  },
  heading: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1rem',
    marginTop: theme.spacing(3.75),
    marginLeft: theme.spacing(-6),
  },
  contentDiv: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: theme.spacing(1.5),
    marginTop: theme.spacing(2.5),
    marginRight: theme.spacing(3),
  },
  mainDiv: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(2.5),
    width: '13rem',
  },
  leftCount: {
    marginBottom: theme.spacing(0),
    marginTop: theme.spacing(0.5),
    color: theme.palette.text.secondary,
    fontSize: theme.typography.fontSize,
    fontWeight: 400,
  },
  rightCount: (props: StyleProps) => ({
    marginBottom: 0,
    marginTop: theme.spacing(0.5),
    color: props.color,
    fontSize: theme.typography.fontSize,
    fontWeight: 400,
  }),
  centerCount: (props: StyleProps) => ({
    marginBottom: 0,
    marginTop: theme.spacing(-1),
    color: props.color,
    fontSize: '1.5rem',
    fontWeight: 700,
  }),
  bottomText: {
    marginBottom: 0,
    marginTop: theme.spacing(0.5),
    color: theme.palette.text.primary,
    fontSize: theme.typography.fontSize,
    fontWeight: 400,
  },
  workflow: {
    marginLeft: theme.spacing(4.375),
    marginTop: theme.spacing(3.125),
  },
  avgDesc: {
    marginLeft: theme.spacing(4.375),
    marginTop: theme.spacing(1.875),
    opacity: 0.6,
  },
  avatarStyle: (props: StyleProps) => ({
    backgroundColor: props.color,
    width: '4rem',
    height: '4rem',
    marginTop: theme.spacing(0.625),
  }),
  avatarIcon: (props: StyleProps) => ({
    width: '2rem',
    height: '1.5rem',
    background: props.color, // custom color
  }),
  runsFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

export default useStyles;
