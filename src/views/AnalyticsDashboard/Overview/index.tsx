/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
import { useMutation, useQuery } from '@apollo/client';
import {
  AppBar,
  IconButton,
  Paper,
  Table,
  TableRow,
  Tabs,
  Typography,
  useTheme,
} from '@material-ui/core';
import ExpandMoreTwoToneIcon from '@material-ui/icons/ExpandMoreTwoTone';
import * as _ from 'lodash';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import YAML from 'yaml';
import ButtonFilled from '../../../components/Button/ButtonFilled';
import DashboardTemplatesList from '../../../components/PreconfiguredDashboards/data';
import { StyledTab, TabPanel } from '../../../components/Tabs';
import {
  GET_CLUSTER,
  LIST_DASHBOARD,
  SCHEDULE_DETAILS,
  UPDATE_PANEL,
  WORKFLOW_DETAILS,
  WORKFLOW_EVENTS,
  WORKFLOW_LIST_DETAILS,
} from '../../../graphql';
import {
  Artifact,
  CronWorkflowYaml,
  Parameter,
  Template,
  WorkflowYaml,
} from '../../../models/chaosWorkflowYaml';
import { ChaosEngineNamesAndNamespacesMap } from '../../../models/dashboardsData';
import { Clusters, ClusterVars } from '../../../models/graphql/clusterData';
import {
  DashboardList,
  ListDashboardResponse,
  ListDashboardVars,
  Panel,
  PanelGroup,
  PanelGroupResponse,
  PanelOption,
  PanelResponse,
  PromQuery,
  UpdatePanelInput,
} from '../../../models/graphql/dashboardsDetails';
import {
  ScheduleDataVars,
  Schedules,
  ScheduleWorkflow,
} from '../../../models/graphql/scheduleData';
import {
  ExecutionData,
  Workflow,
  WorkflowDataVars,
  WorkflowRun,
  WorkflowSubscription,
} from '../../../models/graphql/workflowData';
import {
  WorkflowList,
  WorkflowListDataVars,
} from '../../../models/graphql/workflowListData';
import useActions from '../../../redux/actions';
import * as DashboardActions from '../../../redux/actions/dashboards';
import * as DataSourceActions from '../../../redux/actions/dataSource';
import * as TabActions from '../../../redux/actions/tabs';
import * as TemplateSelectionActions from '../../../redux/actions/template';
import * as WorkflowActions from '../../../redux/actions/workflow';
import { history } from '../../../redux/configureStore';
import { RootState } from '../../../redux/reducers';
import { ReactComponent as Arrow } from '../../../svg/arrow.svg';
import formatDate from '../../../utils/formatDate';
import getEngineNameAndNamespace from '../../../utils/promUtils';
import { sortNumAsc } from '../../../utils/sort';
import { validateWorkflowParameter } from '../../../utils/validate';
import {
  generateChaosQuery,
  getWorkflowParameter,
} from '../../../utils/yamlUtils';
import { AreaGrapher } from '../../kuig-lab/graph/base';
import { LineAreaGraph } from '../../kuig-lab/graph/LineAreaGraph';
import { RadialChart } from '../../kuig-lab/RadialChart/RadialChart';
import ProgressBar from './ProgressBar/progressBar';
import useStyles, { StyledTableCell } from './styles';

interface WorkflowRunStats {
  running: number;
  succeeded: number;
  failed: number;
}
interface ClusterDataType {
  created_at: number;
  lastAlive_at: number;
}

const filterUndefinedData = (data: AreaGrapher[]): AreaGrapher[] =>
  data
    ? data
        .filter((elem) => elem && elem.data && elem.data.length)
        .filter((elem) =>
          elem.data.filter(
            (d) =>
              d &&
              d.date &&
              typeof d.date === 'number' &&
              typeof d.value === 'number'
          )
        )
    : data;

const Overview: React.FC = () => {
  const template = useActions(TemplateSelectionActions);
  const workflowAction = useActions(WorkflowActions);
  const handleCreateWorkflow = () => {
    workflowAction.setWorkflowDetails({
      isCustomWorkflow: false,
      customWorkflows: [],
    });
    template.selectTemplate({ selectedTemplateID: 0, isDisable: true });
    history.push('/create-workflow');
  };
  const theme = useTheme();
  const { t } = useTranslation();
  const overviewDashboardTabValue = useSelector(
    (state: RootState) => state.tabNumber.overviewDashboard
  );
  const tabs = useActions(TabActions);
  const dashboard = useActions(DashboardActions);
  const dataSource = useActions(DataSourceActions);
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    tabs.changeOverviewDashboardTabs(newValue);
  };

  const classes = useStyles();
  const selectedProjectID = useSelector(
    (state: RootState) => state.userData.selectedProjectID
  );
  const [workflowRunStats, setWorkflowRunStats] = React.useState<
    WorkflowRunStats
  >({
    running: 0,
    succeeded: 0,
    failed: 0,
  });

  const [updatePanel] = useMutation<UpdatePanelInput>(UPDATE_PANEL, {
    onError: () => {
      console.log('error updating dashboard details');
    },
  });

  // Apollo query to get the scheduled data
  const { data: schedulesData } = useQuery<Schedules, ScheduleDataVars>(
    SCHEDULE_DETAILS,
    {
      variables: {
        projectID: selectedProjectID,
      },
    }
  );

  const filteredScheduleData = schedulesData?.getScheduledWorkflows
    .slice()
    .sort((a: ScheduleWorkflow, b: ScheduleWorkflow) => {
      const x = parseInt(a.updated_at, 10);
      const y = parseInt(b.updated_at, 10);
      return sortNumAsc(y, x);
    });

  // Apollo query to get the dashboard data
  const { data: dashboardsList } = useQuery<DashboardList, ListDashboardVars>(
    LIST_DASHBOARD,
    {
      variables: {
        projectID: selectedProjectID,
      },
    }
  );

  const filteredDashboardData = dashboardsList?.ListDashboard
    ? dashboardsList?.ListDashboard.slice().sort(
        (a: ListDashboardResponse, b: ListDashboardResponse) => {
          const x = parseInt(a.updated_at, 10);
          const y = parseInt(b.updated_at, 10);
          return sortNumAsc(y, x);
        }
      )
    : [];

  // Apollo query to get the scheduled workflow data
  const { data: workflowScheduleWiseRunsList } = useQuery<
    WorkflowList,
    WorkflowListDataVars
  >(WORKFLOW_LIST_DETAILS, {
    variables: { projectID: selectedProjectID, workflowIDs: [] },
    fetchPolicy: 'cache-and-network',
    pollInterval: 50,
  });

  // Apollo query to get the cluster data
  const { data: clusterList } = useQuery<Clusters, ClusterVars>(GET_CLUSTER, {
    variables: { project_id: selectedProjectID },
    fetchPolicy: 'cache-and-network',
    pollInterval: 50,
  });

  // Query to get workflows
  const { subscribeToMore, data } = useQuery<Workflow, WorkflowDataVars>(
    WORKFLOW_DETAILS,
    {
      variables: { projectID: selectedProjectID },
      fetchPolicy: 'cache-and-network',
    }
  );

  // Using subscription to get realtime data
  useEffect(() => {
    subscribeToMore<WorkflowSubscription>({
      document: WORKFLOW_EVENTS,
      variables: { projectID: selectedProjectID },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const modifiedWorkflows = prev.getWorkFlowRuns.slice();
        const newWorkflow = subscriptionData.data.workflowEventListener;

        // Updating the query data
        let i = 0;
        for (; i < modifiedWorkflows.length; i++) {
          if (
            modifiedWorkflows[i].workflow_run_id === newWorkflow.workflow_run_id
          ) {
            modifiedWorkflows[i] = newWorkflow;
            break;
          }
        }
        if (i === modifiedWorkflows.length)
          modifiedWorkflows.unshift(newWorkflow);
        return { ...prev, getWorkFlowRuns: modifiedWorkflows };
      },
    });
  }, [data]);

  // Function to validate execution_data JSON
  const execData = (runData: WorkflowRun) => {
    let exe_data;
    try {
      exe_data = JSON.parse(runData.execution_data);
    } catch (error) {
      console.error(error);
    }
    return exe_data;
  };

  useEffect(() => {
    const workflowRunStatsVar: WorkflowRunStats = {
      running: 0,
      succeeded: 0,
      failed: 0,
    };

    if (data?.getWorkFlowRuns) {
      data.getWorkFlowRuns.forEach((workflowRun: WorkflowRun) => {
        const parsedExecData: ExecutionData = execData(workflowRun);
        if (parsedExecData.phase === 'Running') {
          workflowRunStatsVar.running += 1;
        } else if (parsedExecData.phase === 'Succeeded') {
          workflowRunStatsVar.succeeded += 1;
        } else if (parsedExecData.phase === 'Failed') {
          workflowRunStatsVar.failed += 1;
        }
      });
      setWorkflowRunStats(workflowRunStatsVar);
    }
  }, [data]);
  const RadialData = [
    {
      lable: t('analyticsDashboard.workflowStats.workflowPassed'),
      value: workflowRunStats['succeeded'],
    },
    {
      lable: t('analyticsDashboard.workflowStats.workflowRunning'),
      value: workflowRunStats['running'],
    },
    {
      lable: t('analyticsDashboard.workflowStats.workflowFailed'),
      value: workflowRunStats['failed'],
    },
  ];
  let clusterLifeCycle: Array<ClusterDataType> = [];
  if (clusterList && clusterList.getCluster) {
    clusterLifeCycle = clusterList.getCluster.map((elem) =>
      elem.is_registered
        ? {
            created_at: parseInt(elem.created_at, 10),
            lastAlive_at: elem.is_active
              ? Math.round(new Date().getTime() / 1000)
              : parseInt(elem.updated_at, 10),
          }
        : { created_at: NaN, lastAlive_at: NaN }
    );
    clusterLifeCycle = clusterLifeCycle.filter(
      (elem) => elem && elem.created_at
    );
  }
  let startClusterTime = Math.min.apply(
    null,
    clusterLifeCycle.map((elem) => elem.created_at)
  );

  startClusterTime -= startClusterTime % (60 * 60);
  const presentClusterTime = Math.round(new Date().getTime() / 1000);
  // presentClusterTime = presentClusterTime - (presentClusterTime % (60 * 60));

  const timeArray: Array<number> = [];
  for (
    let i = 0;
    i <= (presentClusterTime - startClusterTime) / (60 * 60);
    i++
  ) {
    timeArray[i] = startClusterTime + 60 * 60 * i;
  }
  if (timeArray[timeArray.length] !== presentClusterTime) {
    timeArray[timeArray.length] = presentClusterTime;
  }

  const clusterTimeLocalHourly = _.groupBy(timeArray, (elemTime) =>
    moment.unix(elemTime).startOf('hour').format('YYYY-MM-DD HH:mm:ss')
  );
  const clusterTimeLocalDaily = _.groupBy(timeArray, (elemTime) =>
    moment.unix(elemTime).startOf('day').format('YYYY-MM-DD')
  );
  const clusterTimeLocalMonthly = _.groupBy(timeArray, (elemTime) =>
    moment.unix(elemTime).startOf('month').format('YYYY-MM')
  );

  let workflowScheduleData: Array<{ date: number }> = [];
  if (
    workflowScheduleWiseRunsList &&
    workflowScheduleWiseRunsList.ListWorkflow
  ) {
    workflowScheduleData = workflowScheduleWiseRunsList.ListWorkflow.map(
      (elem) => ({
        date: parseInt(elem.created_at, 10),
      })
    );
  }

  const hourlyWorkflowSchedule = _.groupBy(workflowScheduleData, (data) =>
    moment
      .unix(parseInt(data.date.toString(), 10))
      .startOf('hour')
      .format('YYYY-MM-DD HH:mm:ss')
  );
  const dailyWorkflowSchedule = _.groupBy(workflowScheduleData, (data) =>
    moment
      .unix(parseInt(data.date.toString(), 10))
      .startOf('day')
      .format('YYYY-MM-DD')
  );
  const monthlyWorkflowSchedule = _.groupBy(workflowScheduleData, (data) =>
    moment
      .unix(parseInt(data.date.toString(), 10))
      .startOf('month')
      .format('YYYY-MM')
  );

  const tabType = [
    t('analyticsDashboard.workflowClusterDashboard.tab1'),
    t('analyticsDashboard.workflowClusterDashboard.tab2'),
    t('analyticsDashboard.workflowClusterDashboard.tab3'),
  ];

  const clusterWorklowMatrix: AreaGrapher[][] = [
    [
      {
        metricName: t(
          'analyticsDashboard.workflowClusterDashboard.worflowSchedulesTitle'
        ),
        data: Object.keys(hourlyWorkflowSchedule).map((elem) => ({
          date: moment(elem).unix(),
          value: hourlyWorkflowSchedule[elem].length,
        })),
        baseColor: theme.graph.dashboard.lightBlue,
      },
      {
        metricName: t(
          'analyticsDashboard.workflowClusterDashboard.clusterCountTitle'
        ),
        data: Object.keys(clusterTimeLocalHourly).map((elemTime) => ({
          date: moment(elemTime).unix(),
          value: clusterLifeCycle.filter(
            (elemCluster) =>
              ((elemCluster.created_at >= moment(elemTime).unix() &&
                elemCluster.created_at - 60 * 60 < moment(elemTime).unix()) ||
                elemCluster.created_at <= moment(elemTime).unix()) &&
              elemCluster.lastAlive_at >= moment(elemTime).unix()
          ).length,
        })),
        baseColor: theme.graph.dashboard.lightOrange,
      },
    ],
    [
      {
        metricName: t(
          'analyticsDashboard.workflowClusterDashboard.worflowSchedulesTitle'
        ),
        data: Object.keys(dailyWorkflowSchedule).map((elem) => ({
          date: moment(elem).unix(),
          value: dailyWorkflowSchedule[elem].length,
        })),
        baseColor: theme.graph.dashboard.lightBlue,
      },
      {
        metricName: t(
          'analyticsDashboard.workflowClusterDashboard.clusterCountTitle'
        ),
        data: Object.keys(clusterTimeLocalDaily).map((elemTime) => ({
          date: moment(elemTime).unix(),
          value: clusterLifeCycle.filter(
            (elemCluster) =>
              ((elemCluster.created_at >= moment(elemTime).unix() &&
                elemCluster.created_at - 60 * 60 * 24 <
                  moment(elemTime).unix()) ||
                elemCluster.created_at <= moment(elemTime).unix()) &&
              elemCluster.lastAlive_at >= moment(elemTime).unix()
          ).length,
        })),
        baseColor: theme.graph.dashboard.lightOrange,
      },
    ],
    [
      {
        metricName: t(
          'analyticsDashboard.workflowClusterDashboard.worflowSchedulesTitle'
        ),
        data: Object.keys(monthlyWorkflowSchedule).map((elem) => ({
          date: moment(elem).unix(),
          value: monthlyWorkflowSchedule[elem].length,
        })),
        baseColor: theme.graph.dashboard.lightBlue,
      },
      {
        metricName: t(
          'analyticsDashboard.workflowClusterDashboard.clusterCountTitle'
        ),
        data: Object.keys(clusterTimeLocalMonthly).map((elemTime) => ({
          date: moment(elemTime).unix(),
          value: clusterLifeCycle.filter(
            (elemCluster) =>
              ((elemCluster.created_at >= moment(elemTime).unix() &&
                elemCluster.created_at - 60 * 60 * 24 * 30 <
                  moment(elemTime).unix()) ||
                elemCluster.created_at <= moment(elemTime).unix()) &&
              elemCluster.lastAlive_at >= moment(elemTime).unix()
          ).length,
        })),
        baseColor: theme.graph.dashboard.lightOrange,
      },
    ],
  ];

  const latestClusterWorkflowCount = clusterWorklowMatrix.map((elemParent) =>
    elemParent.map((elemChild) =>
      elemChild.data.slice(-1)[0] ? elemChild.data.slice(-1)[0].value : 0
    )
  );
  const previousClusterWorkflowCount =
    clusterWorklowMatrix.length > 1
      ? clusterWorklowMatrix.map((elemParent) =>
          elemParent.map((elemChild) =>
            elemChild.data.slice(-2, -1)[0]
              ? elemChild.data.slice(-2, -1)[0].value
              : 0
          )
        )
      : Array(latestClusterWorkflowCount.length).fill(0);

  const reSyncChaosQueries = (data: ListDashboardResponse) => {
    const chaosEngineNamesAndNamespacesMap: ChaosEngineNamesAndNamespacesMap[] = [];
    schedulesData?.getScheduledWorkflows.forEach(
      (schedule: ScheduleWorkflow) => {
        if (schedule.cluster_id === data.cluster_id && !schedule.isRemoved) {
          let workflowYaml: WorkflowYaml | CronWorkflowYaml;
          let parametersMap: Parameter[];
          let workflowYamlCheck: boolean = true;
          try {
            workflowYaml = JSON.parse(schedule.workflow_manifest);
            parametersMap = (workflowYaml as WorkflowYaml).spec.arguments
              .parameters;
          } catch (err) {
            workflowYaml = JSON.parse(schedule.workflow_manifest);
            parametersMap = (workflowYaml as CronWorkflowYaml).spec.workflowSpec
              .arguments.parameters;
            workflowYamlCheck = false;
          }
          (workflowYamlCheck
            ? (workflowYaml as WorkflowYaml).spec.templates
            : (workflowYaml as CronWorkflowYaml).spec.workflowSpec.templates
          ).forEach((template: Template) => {
            if (template.inputs) {
              template.inputs?.artifacts.forEach((artifact: Artifact) => {
                const parsedEmbeddedYaml = YAML.parse(artifact.raw.data);
                if (parsedEmbeddedYaml.kind === 'ChaosEngine') {
                  let engineNamespace: string = '';
                  if (
                    typeof parsedEmbeddedYaml.metadata.namespace === 'string'
                  ) {
                    engineNamespace = (parsedEmbeddedYaml.metadata
                      .namespace as string).substring(
                      1,
                      (parsedEmbeddedYaml.metadata.namespace as string).length -
                        1
                    );
                  } else {
                    engineNamespace = Object.keys(
                      parsedEmbeddedYaml.metadata.namespace
                    )[0];
                  }
                  if (validateWorkflowParameter(engineNamespace)) {
                    engineNamespace = getWorkflowParameter(engineNamespace);
                    parametersMap.forEach((parameterKeyValue: Parameter) => {
                      if (parameterKeyValue.name === engineNamespace) {
                        engineNamespace = parameterKeyValue.value;
                      }
                    });
                  } else {
                    engineNamespace = parsedEmbeddedYaml.metadata.namespace;
                  }
                  let matchIndex: number = -1;
                  const check: number = chaosEngineNamesAndNamespacesMap.filter(
                    (data, index) => {
                      if (
                        data.engineName === parsedEmbeddedYaml.metadata.name &&
                        data.engineNamespace === engineNamespace
                      ) {
                        matchIndex = index;
                        return true;
                      }
                      return false;
                    }
                  ).length;
                  if (check === 0) {
                    chaosEngineNamesAndNamespacesMap.push({
                      engineName: parsedEmbeddedYaml.metadata.name,
                      engineNamespace,
                      workflowName: workflowYaml.metadata.name,
                    });
                  } else {
                    chaosEngineNamesAndNamespacesMap[
                      matchIndex
                    ].workflowName = `${chaosEngineNamesAndNamespacesMap[matchIndex].workflowName}, \n${workflowYaml.metadata.name}`;
                  }
                }
              });
            }
          });
        }
      }
    );

    const isChaosQueryPresent: number[] = Array(
      chaosEngineNamesAndNamespacesMap.length
    ).fill(0);

    data.panel_groups[0].panels[0].prom_queries.forEach(
      (existingPromQuery: PromQuery) => {
        if (
          existingPromQuery.prom_query_name.startsWith(
            'heptio_eventrouter_normal_total{reason="ChaosInject"'
          )
        ) {
          const chaosDetails: ChaosEngineNamesAndNamespacesMap = getEngineNameAndNamespace(
            existingPromQuery.prom_query_name
          );
          chaosEngineNamesAndNamespacesMap.forEach(
            (
              chaosDetailsFomSchedule: ChaosEngineNamesAndNamespacesMap,
              index: number
            ) => {
              if (
                chaosDetailsFomSchedule.engineName ===
                  chaosDetails.engineName &&
                chaosDetailsFomSchedule.engineNamespace ===
                  chaosDetails.engineNamespace
              ) {
                isChaosQueryPresent[index] = 1;
              }
            }
          );
        }
      }
    );

    const dashboardTemplateID: number =
      data.db_type === 'Kubernetes Platform' ? 0 : 1;

    const updatedPanelGroups: PanelGroup[] = [];

    data.panel_groups.forEach((panelGroup: PanelGroupResponse) => {
      const updatedPanels: Panel[] = [];
      panelGroup.panels.forEach((panel: PanelResponse) => {
        const updatedQueries: PromQuery[] = [];
        panel.prom_queries.forEach((query: PromQuery) => {
          let updatedLegend: string = query.legend;
          if (
            query.prom_query_name.startsWith(
              'heptio_eventrouter_normal_total{reason="ChaosInject"'
            )
          ) {
            const chaosDetails: ChaosEngineNamesAndNamespacesMap = getEngineNameAndNamespace(
              query.prom_query_name
            );
            chaosEngineNamesAndNamespacesMap.forEach(
              (chaosDetailsFomSchedule: ChaosEngineNamesAndNamespacesMap) => {
                if (
                  chaosDetailsFomSchedule.engineName ===
                    chaosDetails.engineName &&
                  chaosDetailsFomSchedule.engineNamespace ===
                    chaosDetails.engineNamespace &&
                  !query.legend.includes(chaosDetailsFomSchedule.workflowName)
                ) {
                  updatedLegend = `${chaosDetailsFomSchedule.workflowName}, \n${query.legend}`;
                }
              }
            );
          }
          const updatedQuery: PromQuery = {
            queryid: query.queryid,
            prom_query_name: query.prom_query_name,
            resolution: query.resolution,
            minstep: query.minstep,
            line: query.line,
            close_area: query.close_area,
            legend: updatedLegend,
          };
          updatedQueries.push(updatedQuery);
        });
        chaosEngineNamesAndNamespacesMap.forEach(
          (keyValue: ChaosEngineNamesAndNamespacesMap, index: number) => {
            if (isChaosQueryPresent[index] === 0) {
              updatedQueries.push({
                queryid: uuidv4(),
                prom_query_name: generateChaosQuery(
                  DashboardTemplatesList[dashboardTemplateID]
                    .chaosEventQueryTemplate,
                  keyValue.engineName,
                  keyValue.engineNamespace
                ),
                legend: `${keyValue.workflowName}- \n${keyValue.engineName}`,
                resolution: '1/1',
                minstep: '1',
                line: false,
                close_area: true,
              });
            }
          }
        );
        const existingPanelOptions: PanelOption = {
          points: panel.panel_options.points,
          grids: panel.panel_options.grids,
          left_axis: panel.panel_options.left_axis,
        };
        const updatedPanel: Panel = {
          panel_id: panel.panel_id,
          panel_name: panel.panel_name,
          panel_options: existingPanelOptions,
          prom_queries: updatedQueries,
          y_axis_left: panel.y_axis_left,
          y_axis_right: panel.y_axis_right,
          x_axis_down: panel.x_axis_down,
          unit: panel.unit,
        };
        updatedPanels.push(updatedPanel);
      });
      updatedPanelGroups.push({
        panel_group_id: panelGroup.panel_group_id,
        panel_group_name: panelGroup.panel_group_name,
        panels: updatedPanels,
      });
    });

    const panelInputData: Panel[] = [];

    updatedPanelGroups.forEach((panelGroup: PanelGroup) => {
      panelGroup.panels.forEach((panel: Panel) => {
        panelInputData.push({
          panel_id: panel.panel_id,
          db_id: data.db_id,
          panel_group_id: panelGroup.panel_group_id,
          prom_queries: panel.prom_queries,
          panel_options: panel.panel_options,
          panel_name: panel.panel_name,
          y_axis_left: panel.y_axis_left,
          y_axis_right: panel.y_axis_right,
          x_axis_down: panel.x_axis_down,
          unit: panel.unit,
        });
      });
    });

    updatePanel({
      variables: { panelInput: panelInputData },
    });

    return true;
  };

  const onDashboardLoadRoutine = async (data: ListDashboardResponse) => {
    dashboard.selectDashboard({
      selectedDashboardID: data.db_id,
      selectedDashboardName: data.db_name,
      selectedDashboardTemplateName: data.db_type,
      selectedAgentID: data.cluster_id,
      selectedAgentName: data.cluster_name,
    });
    return Promise.resolve(reSyncChaosQueries(data));
  };
  useEffect(() => {}, [
    window.innerWidth,
    document.documentElement.clientWidth,
    document.body.clientWidth,
  ]);
  return (
    <div className={classes.root}>
      <div className={classes.overviewGraphs}>
        <Paper elevation={0} className={classes.dashboard}>
          <Typography variant="h4" className={classes.heading}>
            {t('analyticsDashboard.workflowClusterDashboard.title')}
          </Typography>

          {tabType.map((elem, index) => (
            <TabPanel
              key={`${elem}-matrixPanel`}
              value={overviewDashboardTabValue}
              index={index}
            >
              <div className={classes.dashboardContent}>
                <div className={classes.progressBarSection}>
                  <ProgressBar
                    title={t(
                      'analyticsDashboard.workflowClusterDashboard.clusterCountTitle'
                    )}
                    numLeft={previousClusterWorkflowCount[index][1]}
                    numCenter={latestClusterWorkflowCount[index][1]}
                    numRight={
                      latestClusterWorkflowCount[index][1] -
                      previousClusterWorkflowCount[index][1]
                    }
                    baseColor={theme.graph.dashboard.lightOrange}
                    imageAvatar="./icons/clusterWhite.svg"
                  />
                  <ProgressBar
                    title={t(
                      'analyticsDashboard.workflowClusterDashboard.worflowSchedulesTitle'
                    )}
                    numLeft={previousClusterWorkflowCount[index][0]}
                    numCenter={latestClusterWorkflowCount[index][0]}
                    numRight={
                      latestClusterWorkflowCount[index][0] -
                      previousClusterWorkflowCount[index][0]
                    }
                    baseColor={theme.graph.dashboard.lightBlue}
                    imageAvatar="./icons/weeklyWorkflows.svg"
                    bottomText={`${t(
                      'analyticsDashboard.workflowClusterDashboard.timeSelectionMessage'
                    )} ${t(
                      `analyticsDashboard.workflowClusterDashboard.timeSelection${index}`
                    )}`}
                  />
                  {(!workflowScheduleData ||
                    (workflowScheduleData &&
                      workflowScheduleData.length === 0)) && (
                    <div className={classes.workflowScheduleButton}>
                      <ButtonFilled
                        handleClick={() => {
                          tabs.changeWorkflowsTabs(2);
                          history.push('/workflows');
                        }}
                        styles={{ width: '18rem' }}
                        isPrimary
                      >
                        <Typography variant="body1">
                          {t(
                            'analyticsDashboard.workflowClusterDashboard.scheduleWorkflowMessage'
                          )}
                        </Typography>
                      </ButtonFilled>
                    </div>
                  )}
                </div>

                <div>
                  <AppBar
                    position="static"
                    color="default"
                    className={classes.appBar}
                  >
                    <Tabs
                      value={overviewDashboardTabValue || 0}
                      onChange={handleTabChange}
                      TabIndicatorProps={{
                        style: {
                          backgroundColor: theme.palette.secondary.dark,
                        },
                      }}
                      variant="fullWidth"
                    >
                      {tabType.map((elem) => (
                        <StyledTab label={elem} key={elem} />
                      ))}
                    </Tabs>
                  </AppBar>
                  <LineAreaGraph
                    width={
                      (window.innerWidth ||
                        document.documentElement.clientWidth ||
                        document.body.clientWidth) / 3.5
                    }
                    height={280}
                    legendTableHeight={95}
                    closedSeries={filterUndefinedData(
                      clusterWorklowMatrix[index]
                    )}
                    backgroundTransparent
                    showPoints={false}
                    showTips={false}
                  />
                </div>
              </div>
            </TabPanel>
          ))}
        </Paper>

        {/* JSON.stringify(workflowScheduleWiseRunsList?.ListWorkflow) 
          --->uncomment and remove stringify to use this JSON data */}
        {/* JSON.stringify(clusterList?.getCluster) 
          --->uncomment and remove stringify to use this JSON data */}

        <Paper className={classes.workflowStats}>
          <Typography variant="h4" className={classes.heading}>
            {t('analyticsDashboard.workflowStats.title')}
          </Typography>

          <div className={classes.radialChart}>
            <RadialChart
              width={320}
              height={320}
              radialData={RadialData}
              semiCircle={false}
              showOuterArc={false}
            />
          </div>
        </Paper>
      </div>
      <div className={classes.dataTables}>
        <Paper className={classes.dataTable}>
          <div className={classes.tableHeading}>
            <Typography variant="h4" className={classes.weightedHeading}>
              {t('analyticsDashboard.workflowScheduleTable.title')}
            </Typography>
            {filteredScheduleData && filteredScheduleData.length > 5 ? (
              <IconButton
                className={classes.seeAllBtn}
                onClick={() => {
                  tabs.changeAnalyticsDashboardTabs(1);
                  history.push('/analytics');
                }}
              >
                <Typography className={classes.seeAllText}>
                  {t('analyticsDashboard.seeAll')}
                </Typography>
                <Arrow className={classes.arrowForwardIcon} />
              </IconButton>
            ) : (
              <div />
            )}
          </div>
          {filteredScheduleData && filteredScheduleData.length > 0 && (
            <Table className={classes.tableStyling}>
              {filteredScheduleData &&
                filteredScheduleData.slice(0, 5).map((schedule) => (
                  <TableRow key={schedule.workflow_id}>
                    <StyledTableCell component="th" scope="row">
                      <Typography className={classes.dataRowName}>
                        {schedule.workflow_name}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Typography className={classes.dateText}>
                        {formatDate(schedule.updated_at)}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Typography
                        className={classes.seeAnalyticsText}
                        onClick={() =>
                          history.push(
                            `/workflows/analytics/${schedule.workflow_id}`
                          )
                        }
                      >
                        {t(
                          'chaosWorkflows.browseAnalytics.workFlowComparisonTable.seeAnalytics'
                        )}
                        <IconButton
                          edge="end"
                          aria-label="analytics for workflow id"
                          aria-haspopup="true"
                          onClick={() =>
                            history.push(
                              `/workflows/analytics/${schedule.workflow_id}`
                            )
                          }
                          className={classes.buttonSeeAnalytics}
                        >
                          <ExpandMoreTwoToneIcon
                            htmlColor={theme.palette.text.secondary}
                          />
                        </IconButton>
                      </Typography>
                    </StyledTableCell>
                  </TableRow>
                ))}
            </Table>
          )}
          {(!filteredScheduleData ||
            (filteredScheduleData && filteredScheduleData.length === 0)) && (
            <Typography variant="body1" className={classes.noRecordText}>
              {t('analyticsDashboard.workflowScheduleTable.noRecordMessage')}
            </Typography>
          )}
        </Paper>

        <Paper className={classes.dataTable}>
          <div className={classes.tableHeading}>
            <Typography variant="h4" className={classes.weightedHeading}>
              {t('analyticsDashboard.kubernetesDashboardTable.title')}
            </Typography>
            {filteredDashboardData && filteredDashboardData.length > 5 ? (
              <IconButton
                className={classes.seeAllBtn}
                onClick={() => {
                  tabs.changeAnalyticsDashboardTabs(2);
                  history.push('/analytics');
                }}
              >
                <Typography variant="body1">
                  {t('analyticsDashboard.seeAll')}
                </Typography>
                <Arrow className={classes.arrowForwardIcon} />
              </IconButton>
            ) : (
              <div />
            )}
          </div>
          {filteredDashboardData && filteredDashboardData.length > 0 && (
            <Table className={classes.tableStyling}>
              {filteredDashboardData &&
                filteredDashboardData.slice(0, 5).map((dashboard) => (
                  <TableRow key={dashboard.db_id}>
                    <StyledTableCell component="th" scope="row">
                      <Typography className={classes.dataRowName}>
                        {dashboard.db_name}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Typography className={classes.dateText}>
                        {formatDate(dashboard.updated_at)}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Typography
                        className={classes.seeAnalyticsText}
                        onClick={() => {
                          onDashboardLoadRoutine(dashboard).then(() => {
                            dataSource.selectDataSource({
                              selectedDataSourceURL: '',
                              selectedDataSourceID: '',
                              selectedDataSourceName: '',
                            });
                            history.push('/analytics/dashboard');
                          });
                        }}
                      >
                        {t(
                          'analyticsDashboardViews.kubernetesDashboard.table.seeAnalytics'
                        )}
                        <IconButton
                          edge="end"
                          aria-label="analytics for dashboard id"
                          aria-haspopup="true"
                          onClick={() => {
                            onDashboardLoadRoutine(dashboard).then(() => {
                              dataSource.selectDataSource({
                                selectedDataSourceURL: '',
                                selectedDataSourceID: '',
                                selectedDataSourceName: '',
                              });
                              history.push('/analytics/dashboard');
                            });
                          }}
                          className={classes.buttonSeeAnalytics}
                        >
                          <ExpandMoreTwoToneIcon
                            htmlColor={theme.palette.text.secondary}
                          />
                        </IconButton>
                      </Typography>
                    </StyledTableCell>
                  </TableRow>
                ))}
            </Table>
          )}
          {(!filteredDashboardData ||
            (filteredDashboardData && filteredDashboardData.length === 0)) && (
            <Typography variant="body1" className={classes.noRecordText}>
              {t('analyticsDashboard.kubernetesDashboardTable.noRecordMessage')}
            </Typography>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default Overview;
