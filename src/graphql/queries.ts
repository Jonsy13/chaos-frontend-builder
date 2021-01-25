import { gql } from '@apollo/client';

export const WORKFLOW_DETAILS = gql`
  query workflowDetails($projectID: String!) {
    getWorkFlowRuns(project_id: $projectID) {
      workflow_id
      workflow_name
      workflow_run_id
      execution_data
      project_id
      cluster_name
      last_updated
      cluster_type
      cluster_id
    }
  }
`;

export const SCHEDULE_DETAILS = gql`
  query scheduleDetails($projectID: String!) {
    getScheduledWorkflows(project_id: $projectID) {
      workflow_id
      workflow_manifest
      cronSyntax
      workflow_name
      workflow_description
      weightages {
        experiment_name
        weightage
      }
      isCustomWorkflow
      updated_at
      created_at
      project_id
      cluster_id
      cluster_type
      cluster_name
      isRemoved
    }
  }
`;

export const WORKFLOW_LIST_DETAILS = gql`
  query workflowListDetails($projectID: String!, $workflowIDs: [ID]) {
    ListWorkflow(project_id: $projectID, workflow_ids: $workflowIDs) {
      workflow_id
      cronSyntax
      cluster_name
      workflow_name
      workflow_description
      weightages {
        experiment_name
        weightage
      }
      isCustomWorkflow
      updated_at
      created_at
      project_id
      cluster_id
      cluster_type
      workflow_runs {
        execution_data
        workflow_run_id
        last_updated
      }
    }
  }
`;

export const GET_PROJECTS = gql`
  query getProjects {
    getProjects {
      members {
        user_uid
        role
        invitation
        joined_at
      }
      name
      id
    }
  }
`;

export const GET_PROJECT = gql`
  query getProject($projectID: String!) {
    getProject(projectID: $projectID) {
      members {
        user_uid
        role
        invitation
        joined_at
      }
      name
      id
      state
      created_at
      updated_at
      removed_at
    }
  }
`;

export const GET_CLUSTER = gql`
  query getClusters($project_id: String!, $cluster_type: String) {
    getCluster(project_id: $project_id, cluster_type: $cluster_type) {
      cluster_id
      is_active
      project_id
      cluster_name
      description
      platform_name
      access_key
      is_registered
      is_cluster_confirmed
      updated_at
      created_at
      cluster_type
      no_of_schedules
      no_of_workflows
      token
      agent_namespace
      serviceaccount
      agent_scope
      agent_ns_exists
      agent_sa_exists
      last_workflow_timestamp
    }
  }
`;

export const LIST_DATASOURCE = gql`
  query listDataSource($projectID: String!) {
    ListDataSource(project_id: $projectID) {
      ds_id
      ds_name
      ds_type
      ds_url
      access_type
      auth_type
      basic_auth_username
      basic_auth_password
      scrape_interval
      query_timeout
      http_method
      project_id
      created_at
      updated_at
      health_status
    }
  }
`;

export const GET_CHARTS_DATA = gql`
  query getCharts($HubName: String!, $projectID: String!) {
    getCharts(HubName: $HubName, projectID: $projectID) {
      ApiVersion
      Kind
      Metadata {
        Name
        Version
        Annotations {
          Categories
          Vendor
          CreatedAt
          Repository
          Support
          ChartDescription
        }
      }
      Spec {
        DisplayName
        CategoryDescription
        Keywords
        Maturity
        Experiments
        Maintainers {
          Name
          Email
        }
        MinKubeVersion
        Provider
        Links {
          Name
          Url
        }
        ChaosExpCRDLink
        Platforms
        ChaosType
      }
      PackageInfo {
        PackageName
        Experiments {
          Name
          CSV
          Desc
        }
      }
      Experiments {
        ApiVersion
      }
    }
  }
`;

export const LIST_DASHBOARD = gql`
  query listDashboard($projectID: String!) {
    ListDashboard(project_id: $projectID) {
      db_id
      ds_id
      db_name
      db_type
      cluster_name
      ds_name
      ds_type
      panel_groups {
        panels {
          panel_id
          prom_queries {
            queryid
            prom_query_name
            legend
            resolution
            minstep
            line
            close_area
          }
          panel_options {
            points
            grids
            left_axis
          }
          panel_name
          y_axis_left
          y_axis_right
          x_axis_down
          unit
        }
        panel_group_name
        panel_group_id
      }
      end_time
      start_time
      refresh_rate
      project_id
      cluster_id
      created_at
      updated_at
    }
  }
`;

export const GET_EXPERIMENT_DATA = gql`
  query getExperiment($data: ExperimentInput!) {
    getHubExperiment(experimentInput: $data) {
      ApiVersion
      Kind
      Metadata {
        Name
        Version
        Annotations {
          Categories
          Vendor
          CreatedAt
          Repository
          Support
          ChartDescription
        }
      }
      Spec {
        DisplayName
        CategoryDescription
        Keywords
        Maturity
        Experiments
        Maintainers {
          Name
          Email
        }
        MinKubeVersion
        Provider
        Links {
          Name
          Url
        }
        ChaosExpCRDLink
        Platforms
        ChaosType
      }
      PackageInfo {
        PackageName
        Experiments {
          Name
          CSV
          Desc
        }
      }
      Experiments {
        ApiVersion
      }
    }
  }
`;

export const PROM_QUERY = gql`
  query PrometheusQuery($prometheusInput: promInput) {
    GetPromQuery(query: $prometheusInput) {
      queryid
      legends
      tsvs {
        timestamp
        value
      }
    }
  }
`;

export const GET_HUB_STATUS = gql`
  query getHubStatus($data: String!) {
    getHubStatus(projectID: $data) {
      id
      HubName
      RepoBranch
      RepoURL
      TotalExp
      IsAvailable
      AuthType
      IsPrivate
      Token
      UserName
      Password
      SSHPrivateKey
      SSHPublicKey
      LastSyncedAt
    }
  }
`;

export const GET_ENGINE_YAML = gql`
  query getEngineData($experimentInput: ExperimentInput!) {
    getYAMLData(experimentInput: $experimentInput)
  }
`;

export const GET_EXPERIMENT_YAML = gql`
  query getExperimentData($experimentInput: ExperimentInput!) {
    getYAMLData(experimentInput: $experimentInput)
  }
`;
