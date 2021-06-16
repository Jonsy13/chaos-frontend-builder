import { StepIconProps } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import React from 'react';
import { useStepIconStyles } from './styles';

const LitmusStepIcon: React.FC<StepIconProps> = ({ active, completed }) => {
  const classes = useStepIconStyles();

  if (completed) {
    return (
      <div className={`${classes.root} ${classes.completed}`}>
        <Check fontSize="inherit" />
      </div>
    );
  }
  if (active) {
    return <div className={`${classes.root} ${classes.active}`} />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.innerCircle} />
    </div>
  );
};

export { LitmusStepIcon };
