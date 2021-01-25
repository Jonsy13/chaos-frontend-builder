import { combineReducers } from 'redux';
import { AgentData } from '../../models/redux/agent';
import { InfoButtonData } from '../../models/redux/button';
import { DashboardData } from '../../models/redux/dashboards';
import { DataSourceData } from '../../models/redux/dataSource';
import { HubDetails } from '../../models/redux/myhub';
import { SelectedNode } from '../../models/redux/nodeSelection';
import { TabState } from '../../models/redux/tabs';
import { TemplateData } from '../../models/redux/template';
import { UserData } from '../../models/redux/user';
import { WorkflowData } from '../../models/redux/workflow';
import * as agentReducer from './agent';
import * as infoButtonReducer from './button';
import * as dashboardReducer from './dashboards';
import * as dataSourceReducer from './dataSource';
import * as hubDetails from './myhub';
import * as nodeSelectionReducer from './nodeSelection';
import * as tabsReducer from './tabs';
import * as templateReducer from './template';
import * as userReducer from './user';
import * as workflowReducer from './workflow';

export interface RootState {
  userData: UserData;
  workflowData: WorkflowData;
  selectedNode: SelectedNode;
  tabNumber: TabState;
  toggleInfoButton: InfoButtonData;
  selectTemplate: TemplateData;
  configureAgent: AgentData;
  selectDataSource: DataSourceData;
  selectDashboard: DashboardData;
  hubDetails: HubDetails;
}

export default () =>
  combineReducers({
    ...userReducer,
    ...workflowReducer,
    ...nodeSelectionReducer,
    ...tabsReducer,
    ...templateReducer,
    ...agentReducer,
    ...dataSourceReducer,
    ...dashboardReducer,
    ...hubDetails,
    ...infoButtonReducer,
  });
