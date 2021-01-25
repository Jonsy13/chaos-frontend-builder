import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  tab: {
    marginLeft: theme.spacing(1.875),
    borderBottom: `1px solid ${theme.palette.border.main}`,
  },
  Head: {
    margin: theme.spacing(4.5, 1.5, 2.5, 1.5),
  },
}));
export default useStyles;
