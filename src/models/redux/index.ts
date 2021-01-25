import { DashboardSelectionAction } from './dashboards';
import { DataSourceSelectionAction } from './dataSource';
import { MyHubAction } from './myhub';
import { NodeSelectionAction } from './nodeSelection';
import { TabAction } from './tabs';
import { TemplateSelectionAction } from './template';
import { UserAction } from './user';
import { WorkflowAction } from './workflow';

export type Action =
  | UserAction
  | WorkflowAction
  | NodeSelectionAction
  | TabAction
  | TemplateSelectionAction
  | DataSourceSelectionAction
  | DashboardSelectionAction
  | MyHubAction;
