import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import useStyles from './styles';

interface StatusProps {
  status: string;
}

const DataSourceStatus: React.FC<StatusProps> = ({ status }) => {
  const classes = useStyles();
  const [label, setLabel] = React.useState(' ');

  useEffect(() => {
    if (status === 'Active') {
      return setLabel(classes.active);
    }
    if (status === 'Not Ready') {
      return setLabel(classes.notReady);
    }
    return setLabel(classes.inactive);
  }, [status]);

  return (
    <>
      <div className={`${label} ${classes.state}`}>
        <Typography className={classes.statusFont}>{status}</Typography>
      </div>
    </>
  );
};
export default DataSourceStatus;
