import { Typography } from '@material-ui/core';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonOutlined } from 'kubera-ui';
import ButtonFilled from '../../components/Button/ButtonFilled';
import Scaffold from '../../containers/layouts/Scaffold';
import { history } from '../../redux/configureStore';
import useStyles from './styles';

const ErrorPage = () => {
  const classes = useStyles();
  // const BrowserHistory = require('react-router/lib/BrowserHistory').default;
  React.useEffect(() => {
    window.scrollTo(0, 0);
  });
  const { t } = useTranslation();
  return (
    <Scaffold>
      <div className={classes.mainHeader}>
        <div className={classes.rootContainer}>
          <div className={classes.root}>
            <div className={classes.headerDiv}>
              <Typography className={classes.mainText}>
                <strong>
                  {t('error.404')}
                  <br />
                </strong>
              </Typography>
              <Typography className={classes.pageNotFound}>
                {t('error.pageNotFound')}
              </Typography>
              <Typography className={classes.descText}>
                {t('error.pageDoesNotExist')}
              </Typography>

              <div className={classes.button}>
                <ButtonOutlined
                  onClick={() => window.history.back()}
                  disabled={false}
                >
                  <>{t('error.back')}</>
                </ButtonOutlined>
                <div className={classes.goHome}>
                  <ButtonFilled handleClick={() => history.push('/')} isPrimary>
                    <div>{t('error.goHome')}</div>
                  </ButtonFilled>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scaffold>
  );
};

export default ErrorPage;
