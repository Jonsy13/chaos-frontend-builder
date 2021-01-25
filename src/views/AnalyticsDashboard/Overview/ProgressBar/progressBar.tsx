import { Avatar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import AnalyticsLinearProgressBar from './lineBar';
import useStyles from './progressBar.styles';

interface ProgressBar {
  title?: string;
  numLeft?: number;
  numCenter?: number;
  numRight?: number;
  bottomText?: string;
  baseColor?: string;
  imageAvatar?: string;
}

const ProgressBar: React.FC<ProgressBar> = ({
  title,
  numLeft = 0,
  numCenter = 0,
  numRight = 0,
  bottomText,
  baseColor,
  imageAvatar,
}) => {
  const classes = useStyles({ color: baseColor });
  return (
    <div className={classes.contentDiv}>
      <Avatar className={classes.avatarStyle}>
        <img
          src={imageAvatar}
          alt="Ellipse Icon"
          className={classes.avatarIcon}
        />
      </Avatar>
      <div className={classes.mainDiv}>
        <Typography variant="subtitle2">
          <strong>{title}:</strong>
        </Typography>
        <div className={classes.runsFlex}>
          <Typography
            variant="caption"
            display="inline"
            className={classes.leftCount}
          >
            {numLeft}
          </Typography>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            className={classes.centerCount}
          >
            {numCenter}
          </Typography>
          <Typography
            variant="caption"
            display="inline"
            className={classes.rightCount}
          >
            {numRight >= 0 ? '+' : ''}
            {numRight}
          </Typography>
        </div>
        <AnalyticsLinearProgressBar
          value={numCenter - (numRight >= 0 ? numRight : -numRight)}
          maxValue={numCenter}
          baseColor={baseColor}
        />
        <Typography
          variant="caption"
          display="inline"
          className={classes.bottomText}
        >
          {bottomText}
        </Typography>
      </div>
    </div>
  );
};

export default ProgressBar;
