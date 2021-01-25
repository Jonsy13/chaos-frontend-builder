import { Box, Tab, Tabs, Typography } from '@material-ui/core';
import useTheme from '@material-ui/core/styles/useTheme';
import React from 'react';
import { useSelector } from 'react-redux';
import Scaffold from '../../containers/layouts/Scaffold';
import useActions from '../../redux/actions';
import * as TabActions from '../../redux/actions/tabs';
import { RootState } from '../../redux/reducers';
import TeamingTab from '../../views/Settings/TeamingTab/Team';
import useStyles from './styles';

interface TabPanelProps {
  children: React.ReactNode;
  index: any;
  value: any;
}

// TabPanel is used to implement the functioning of tabs
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box style={{ marginLeft: 15 }}>{children}</Box>}
    </div>
  );
}

// tabProps returns 'id' and 'aria-control' props of Tab
function tabProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Settings: React.FC = () => {
  const classes = useStyles();

  const settingsTabValue = useSelector(
    (state: RootState) => state.tabNumber.settings
  );

  const tabs = useActions(TabActions);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    tabs.changeSettingsTabs(newValue);
  };

  const theme = useTheme();

  return (
    <Scaffold>
      <Typography variant="h3" className={classes.Head}>
        Settings
      </Typography>
      <div className={classes.tab}>
        <Tabs
          data-cy="settingsTabPanel"
          value={settingsTabValue}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: theme.palette.secondary.dark,
            },
          }}
        >
          <Tab data-cy="teaming" label="Team" {...tabProps(0)} />
        </Tabs>
      </div>
      <div data-cy="teamTabPanel">
        <TabPanel value={settingsTabValue} index={0}>
          <TeamingTab />
        </TabPanel>
      </div>
    </Scaffold>
  );
};

export default Settings;
