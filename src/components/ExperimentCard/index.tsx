import React from 'react';
import {
  Button,
  CardContent,
  Card,
  Divider,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import useStyles from './style';

interface ExperimentCardInterface {
  status: string;
  active: string;
}

interface Parameter {
  type: string;
  text: string;
  color: string;
}

const ExperimentCard: React.FC<ExperimentCardInterface> = ({
  status,
  active,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  let data: Parameter = { type: '', text: '', color: classes.isGreen };
  const activeClass = active === 'true' ? classes.isActive : '';
  if (status === 'connected') {
    data = {
      type: t('experimentCard.connected'),
      text: t('experimentCard.view'),
      color: classes.isGreen,
    };
  } else if (status === 'needforconnect') {
    data = {
      type: t('experimentCard.needforkConnect'),
      text: t('experimentCard.forkConnect'),
      color: classes.isRed,
    };
  } else if (status === 'forked') {
    data = {
      type: t('experimentCard.alreadyForked'),
      text: t('experimentCard.connect'),
      color: classes.isYellow,
    };
  }
  return (
    <Card component="div" className={`${classes.card} ${activeClass}`}>
      <CardContent component="div" className={classes.centerSection}>
        <div className={classes.cardHeader}>
          <Button
            variant="contained"
            className={`${classes.typeBtn} ${data.color}`}
          >
            {data.type}
          </Button>
        </div>
        <img src="./icons/unionGit.svg" alt="slider" />
        <Typography component="p" className={classes.pathName}>
          {t('experimentCard.pathName')}
        </Typography>
        <Typography component="p" className={classes.experiments}>
          {t('experimentCard.experiments')}
        </Typography>
        <Divider className={classes.divider} />
        <Button
          variant="contained"
          fullWidth
          className={`${classes.gitHubBtn} ${data.color}`}
        >
          {data.text}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExperimentCard;
