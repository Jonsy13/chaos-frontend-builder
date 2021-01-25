/* eslint-disable no-return-assign */
import { IconButton, Popover, Typography } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppsIcon from '@material-ui/icons/Apps';
import ClearIcon from '@material-ui/icons/Clear';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import useActions from '../../redux/actions';
import * as TabActions from '../../redux/actions/tabs';
import { history } from '../../redux/configureStore';
import { RootState } from '../../redux/reducers';
import { ReactComponent as AnalyticsIcon } from '../../svg/analytics.svg';
import { ReactComponent as HomeIcon } from '../../svg/home.svg';
import { ReactComponent as MyHubIcon } from '../../svg/myhub.svg';
import { ReactComponent as SettingsIcon } from '../../svg/settings.svg';
import { ReactComponent as AgentsIcon } from '../../svg/targets.svg';
import { ReactComponent as WorkflowsIcon } from '../../svg/workflows.svg';
import useStyles from './styles';

interface CustomisedListItemProps {
  handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  label: string;
  selected: boolean;
}

const CustomisedListItem: React.FC<CustomisedListItemProps> = ({
  children,
  handleClick,
  label,
  selected,
}) => {
  const classes = useStyles();
  return (
    <ListItem
      button
      selected={selected}
      onClick={handleClick}
      className={`${classes.drawerListItem} ${selected ? classes.active : ''}`}
    >
      <ListItemIcon className={classes.listIcon}>{children}</ListItemIcon>
      <ListItemText primary={label} className={classes.listText} />
    </ListItem>
  );
};

const SideBar: React.FC = () => {
  const classes = useStyles();
  const userRole = useSelector((state: RootState) => state.userData.userRole);
  const tabs = useActions(TabActions);
  const { t } = useTranslation();
  const pathName = useLocation().pathname.split('/')[1];
  const version = process.env.REACT_APP_KB_CHAOS_VERSION;
  const buildTime = moment
    .unix(Number(process.env.REACT_APP_BUILD_TIME))
    .format('DD MMM YYYY HH:mm:ss');

  // set State
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  // Handle clicks
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Drawer
      data-cy="sidebarComponent"
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.appsDiv}>
        <IconButton
          onClick={handleClick}
          classes={{
            root: classes.iconButton,
            label: `${open && classes.clearIconBackground}`,
          }}
        >
          <div className={`${classes.appsIcon}`}>
            {open ? (
              <ClearIcon className={classes.iconColor} />
            ) : (
              <AppsIcon className={classes.iconColor} />
            )}
          </div>
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          className={classes.popOverPaper}
        >
          <div className={classes.popOverList}>
            <List component="nav">
              <ListItemText
                className={classes.switchText}
                primary={t('sidebar.switch')}
              />
              <ListItem button onClick={() => (window.location.href = '/')}>
                <ListItemIcon>
                  <img src="./icons/popoverKubera.svg" alt="Kubera Chaos" />
                </ListItemIcon>
              </ListItem>
              <ListItem
                button
                onClick={() => (window.location.href = '/propel/')}
              >
                <ListItemIcon>
                  <img src="./icons/popoverPropel.svg" alt="Kubera Propel" />
                </ListItemIcon>
              </ListItem>
            </List>
          </div>
        </Popover>
        <Link to="/" className={classes.homeLink}>
          <img
            className={classes.kuberaChaosLogo}
            src="./icons/kuberaChaosWhiteLogo.svg"
            alt="Kubera Chaos Logo"
          />
        </Link>
      </div>

      <List className={classes.drawerList}>
        <CustomisedListItem
          key="home"
          handleClick={() => {
            history.push('/');
          }}
          label="Home"
          selected={pathName === ''}
        >
          <HomeIcon />
        </CustomisedListItem>
        <div data-cy="workflows">
          <CustomisedListItem
            key="workflow"
            handleClick={() => {
              history.push('/workflows');
              tabs.changeWorkflowsTabs(0);
            }}
            label="Workflows"
            selected={pathName === 'workflows'}
          >
            <WorkflowsIcon />
          </CustomisedListItem>
        </div>
        <div data-cy="myHub">
          <CustomisedListItem
            key="myhub"
            handleClick={() => {
              history.push('/myhub');
            }}
            label="My Hubs"
            selected={pathName === 'myhub'}
          >
            <MyHubIcon />
          </CustomisedListItem>
        </div>
        <CustomisedListItem
          key="agents"
          handleClick={() => {
            history.push('/agents');
          }}
          label="Agents"
          selected={pathName === 'agents'}
        >
          <AgentsIcon />
        </CustomisedListItem>
        <CustomisedListItem
          key="analytics"
          handleClick={() => {
            history.push('/analytics');
          }}
          label="Analytics"
          selected={pathName === 'analytics'}
        >
          <AnalyticsIcon />
        </CustomisedListItem>
        {userRole === 'Owner' && (
          <CustomisedListItem
            key="settings"
            handleClick={() => {
              history.push('/settings');
            }}
            label="Settings"
            selected={pathName === 'settings'}
          >
            <SettingsIcon />
          </CustomisedListItem>
        )}
      </List>
      <div className={classes.info}>
        <div className={classes.logodiv}>
          <Typography>{t('sidebar.by')}</Typography>
          <img
            className={classes.mayadataLogo}
            src="./icons/maya_data_logo.svg"
            alt="MayaData Logo"
          />
        </div>
        <br />

        <div>
          <Typography className={classes.versionAndBuildTimeText}>
            <b>Version: </b> {version}
          </Typography>
          <Typography className={classes.versionAndBuildTimeText}>
            <b>Build Time: </b> {buildTime}
          </Typography>
        </div>
      </div>
    </Drawer>
  );
};

export default SideBar;
