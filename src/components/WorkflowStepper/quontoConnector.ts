import StepConnector from '@material-ui/core/StepConnector';
import { Theme, withStyles } from '@material-ui/core/styles';

const QontoConnector = withStyles((theme: Theme) => ({
  alternativeLabel: {
    top: 10,
    marginLeft: theme.spacing(-1),
    marginRight: theme.spacing(-1),
  },
  active: {
    '& $line': {
      borderImage: `linear-gradient(to right, ${theme.palette.horizontalStepper.active} , ${theme.palette.text.secondary})`,
      borderImageSlice: 1,
    },
  },
  completed: {
    '& $line': {
      borderColor: theme.palette.primary.light,
    },
  },
  line: {
    borderColor: theme.palette.text.secondary,
    borderTopWidth: 3,
    borderRadius: 1,
  },
}))(StepConnector);

export default QontoConnector;
