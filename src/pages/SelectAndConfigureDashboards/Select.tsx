import { Typography } from '@material-ui/core';
import React from 'react';
import BackButton from '../../components/Button/BackButton';
import Scaffold from '../../containers/layouts/Scaffold';
import DashboardList from '../../components/PreconfiguredDashboards/data';
import DashboardCards from '../../views/AnalyticsDashboard/KubernetesDashboards/Cards/dashBoardCards';
import useStyles from './styles';

const DashboardSelectPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Scaffold>
      <div className={classes.root}>
        <div className={classes.button}>
          <BackButton isDisabled={false} />
        </div>
        <Typography className={classes.heading}>
          <strong>Select a dashboard</strong>
        </Typography>
        <Typography className={classes.description}>
          Select a dashboard from given types for real time monitoring.
        </Typography>
        <div className={classes.cards}>
          <DashboardCards dashboards={DashboardList} />
        </div>
      </div>
    </Scaffold>
  );
};

export default DashboardSelectPage;
