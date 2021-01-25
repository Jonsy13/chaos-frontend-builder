import { Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from './styles';
import Scaffold from '../../../containers/layouts/Scaffold';
import BackButton from '../../Button/BackButton';

const ConnectTarget = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Scaffold>
      <section className="Header section">
        <div className={classes.backBotton}>
          <BackButton isDisabled={false} />
          <div className={classes.header}>
            <Typography variant="h4">
              {t('targets.connectHome.connectText')}
            </Typography>
          </div>
        </div>
      </section>
      <section className="Connect new target">
        <div className={classes.mainDiv}>
          <div className={classes.connectTarget}>
            <div className={classes.stepsDiv}>
              <Typography className={classes.connectdevice}>
                {t('targets.newTarget.head')}
              </Typography>
              <Typography className={classes.connectText}>
                {t('targets.newTarget.head1')}
              </Typography>
              <Typography className={classes.connectText}>
                {t('targets.newTarget.head2')}
              </Typography>
              <Typography className={classes.connectText}>
                {t('targets.newTarget.head3')}
              </Typography>
              <Typography>
                <div className={classes.textLink}>
                  {t('targets.newTarget.head4')}
                  <a
                    className={classes.docLink}
                    href="https://kubera-docs.mayadata.io/en/free-pro-team@latest/kubera-chaos/adding-new-clusters"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://kubera-docs.mayadata.io/en/free-pro-team@latest/kubera-chaos/adding-new-clusters
                  </a>
                </div>
              </Typography>
            </div>
            <div className={classes.rightMargin}>
              <img src="./icons/targetsC.svg" alt="down arrow icon" />
            </div>
          </div>
        </div>
      </section>
    </Scaffold>
  );
};
export default ConnectTarget;
