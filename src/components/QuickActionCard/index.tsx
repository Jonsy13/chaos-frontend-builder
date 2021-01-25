import { List, ListItem, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useActions from '../../redux/actions';
import * as TabActions from '../../redux/actions/tabs';
import { RootState } from '../../redux/reducers';
import useStyles from './style';

interface QuickActionCardProps {
  analyticsHome: boolean;
  nonAdmin: boolean;
}

const QuickActionItems: React.FC = ({ children }) => {
  const classes = useStyles();
  return <ListItem className={classes.listItems}>{children}</ListItem>;
};

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  analyticsHome,
  nonAdmin,
}) => {
  const classes = useStyles();
  const userRole = useSelector((state: RootState) => state.userData.userRole);
  const tabs = useActions(TabActions);
  const { t } = useTranslation();

  return (
    <div data-cy="quickActionCardComponent" className={classes.quickActionCard}>
      <Card className={classes.quickActionCard} elevation={0}>
        <Typography className={classes.mainHeader}>
          {t('quickActionCard.quickActions')}
        </Typography>
        <List>
          {!nonAdmin && analyticsHome && (
            <QuickActionItems>
              <img src="./icons/calendarWorkflowIcon.svg" alt="Calender" />
              <Link to="/create-workflow" className={classes.listItem}>
                {t('quickActionCard.scheduleWorkflow')}
              </Link>
            </QuickActionItems>
          )}
          {analyticsHome && (
            <QuickActionItems>
              <img src="./icons/target.svg" alt="agent" />
              <Link to="/agent-connect" className={classes.listItem}>
                {t('quickActionCard.connectNewAgent')}
              </Link>
            </QuickActionItems>
          )}
          {userRole === 'Owner' && (
            <QuickActionItems>
              <div className={classes.imgDiv}>
                <img src="./icons/teamMember.svg" alt="team" />
              </div>
              <Link
                to="/settings"
                className={classes.listItem}
                onClick={() => tabs.changeSettingsTabs(1)}
              >
                {t('quickActionCard.inviteTeamMember')}
              </Link>
            </QuickActionItems>
          )}
          <QuickActionItems>
            <div className={classes.imgDiv}>
              <img src="./icons/survey.svg" alt="survey" />
            </div>
            <a
              href="https://forms.gle/Zrd2qqTa8TqfR7ZB8"
              className={classes.listItem}
              target="_"
            >
              {t('quickActionCard.quickSurvey')}
            </a>
          </QuickActionItems>
          <QuickActionItems>
            <div className={classes.imgDiv}>
              <img src="./icons/docs.svg" alt="docs" />
            </div>
            <a
              href="https://kubera-docs.mayadata.io"
              className={classes.listItem}
              target="_"
            >
              {t('quickActionCard.readDocs')}
            </a>
          </QuickActionItems>
        </List>
      </Card>
    </div>
  );
};

export default QuickActionCard;
