import { KuberaThemeProvider } from "kubera-ui";
import React, { lazy, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import Loader from "../../components/Loader";
import { CurrentUserData, JWTData } from "../../models/userData";
import useActions from "../../redux/actions";
import * as UserActions from "../../redux/actions/user";
import { history } from "../../redux/configureStore";
import { RootState } from "../../redux/reducers";
import getToken from "../../utils/getToken";
import { getUserDetails, getUserDetailsFromJwt } from "../../utils/user";
import useStyles from "./App-styles";

const ErrorPage = lazy(() => import("../../pages/ErrorPage"));
const Workflows = lazy(() => import("../../pages/Workflows"));
const CreateWorkflow = lazy(() => import("../../pages/CreateWorkflow"));
const WorkflowDetails = lazy(() => import("../../pages/WorkflowDetails"));
const BrowseTemplate = lazy(
  () => import("../../views/ChaosWorkflows/BrowseTemplate")
);
const HomePage = lazy(() => import("../../pages/HomePage"));
const Settings = lazy(() => import("../../pages/Settings"));
const TargetHome = lazy(() => import("../../components/Targets/ConnectHome"));
const ConnectTargets = lazy(
  () => import("../../components/Targets/ConnectTarget")
);
const SchedulePage = lazy(() => import("../../pages/SchedulePage"));
const AnalyticsPage = lazy(() => import("../../pages/AnalyticsPage"));
const MyHub = lazy(() => import("../../pages/MyHub"));
const ClusterInfo = lazy(() => import("../../components/Targets/ClusterInfo"));
const AnalyticsDashboard = lazy(
  () => import("../../pages/AnalyticsDashboards")
);
const DataSourceSelectPage = lazy(
  () => import("../../pages/SelectAndConfigureDataSource/Select")
);
const DataSourceConfigurePage = lazy(
  () => import("../../pages/SelectAndConfigureDataSource/Configure")
);
const DashboardSelectPage = lazy(
  () => import("../../pages/SelectAndConfigureDashboards/Select")
);
const DashboardConfigurePage = lazy(
  () => import("../../pages/SelectAndConfigureDashboards/Configure")
);
const DashboardPage = lazy(() => import("../../pages/MonitoringDashboardPage"));
const MyHubConnect = lazy(() => import("../../views/MyHub/MyHubConnect"));
const ChaosChart = lazy(() => import("../../views/MyHub/MyHubCharts"));
const MyHubExperiment = lazy(() => import("../../views/MyHub/MyHubExperiment"));
const MyHubEdit = lazy(() => import("../../views/MyHub/MyHubEdit"));
const CreateCustomWorkflow = lazy(
  () => import("../../pages/CreateCustomWorkflow")
);

interface RoutesProps {
  isOwner: boolean;
  isProjectAvailable: boolean;
}

const Routes: React.FC<RoutesProps> = ({ isOwner, isProjectAvailable }) => {
  const classes = useStyles();
  if (getToken() === "") {
    window.location.href = "/";
  }
  if (!isProjectAvailable) {
    return (
      <div className={classes.content}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/" render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    );
  }

  return (
    <div className={classes.content}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/workflows" component={Workflows} />
        <Route exact path="/analytics" component={AnalyticsDashboard} />
        <Route
          exact
          path="/analytics/datasource/select"
          component={DataSourceSelectPage}
        />
        <Route
          exact
          path="/analytics/datasource/create"
          component={() => <DataSourceConfigurePage configure={false} />}
        />
        <Route
          exact
          path="/analytics/datasource/configure"
          component={() => <DataSourceConfigurePage configure />}
        />
        <Route
          exact
          path="/analytics/dashboard/select"
          component={DashboardSelectPage}
        />
        <Route
          exact
          path="/analytics/dashboard/create"
          component={() => <DashboardConfigurePage configure={false} />}
        />
        <Route
          exact
          path="/analytics/dashboard/configure"
          component={() => <DashboardConfigurePage configure />}
        />
        <Route
          exact
          path="/analytics/dashboard"
          component={() => <DashboardPage />}
        />
        <Route exact path="/create-workflow" component={CreateWorkflow} />

        {/* Redirects */}
        <Redirect exact path="/login" to="/" />
        <Redirect exact path="/workflows/schedule" to="/workflows" />
        <Redirect exact path="/workflows/template" to="/workflows" />
        <Redirect exact path="/workflows/analytics" to="/workflows" />

        <Redirect exact path="/analytics/overview" to="/analytics" />
        <Redirect exact path="/analytics/litmusdashboard" to="/analytics" />
        <Redirect exact path="/analytics/kubernetesdashborad" to="/analytics" />
        <Redirect exact path="/analytics/datasource" to="/analytics" />

        <Route
          exact
          path="/workflows/:workflowRunId"
          component={WorkflowDetails}
        />
        <Route
          exact
          path="/workflows/schedule/:projectId/:workflowName"
          component={SchedulePage}
        />
        <Route
          exact
          path="/workflows/template/:templateName"
          component={BrowseTemplate}
        />
        <Route
          exact
          path="/workflows/analytics/:workflowRunId"
          component={AnalyticsPage}
        />

        <Route exact path="/myhub" component={MyHub} />
        <Route exact path="/agents" component={TargetHome} />
        <Route exact path="/agents/cluster" component={ClusterInfo} />
        <Route exact path="/agent-connect" component={ConnectTargets} />
        <Route exact path="/myhub" component={MyHub} />
        <Route exact path="/myhub/connect" component={MyHubConnect} />
        <Route exact path="/myhub/:hubname" component={ChaosChart} />
        <Route exact path="/myhub/edit/:hubname" component={MyHubEdit} />
        <Route
          exact
          path="/myhub/:hubname/:chart/:experiment"
          component={MyHubExperiment}
        />
        <Route
          exact
          path="/create-workflow/custom"
          component={CreateCustomWorkflow}
        />
        {isOwner ? (
          <Route exact path="/settings" component={Settings} />
        ) : (
          <Redirect to="/" />
        )}
        <Route exact path="/404" component={ErrorPage} />
        <Redirect to="/404" />
      </Switch>
    </div>
  );
};

function App() {
  const classes = useStyles();
  const userData = useSelector((state: RootState) => state.userData);
  const user = useActions(UserActions);
  const token = getToken();

  const userDetails: JWTData = getUserDetailsFromJwt(getToken());

  async function getCurrentUser() {
    const userDetail: CurrentUserData = await getUserDetails(
      userDetails.uid
    ).then((data) => data);
    user.updateUserDetails({
      username: userDetail.username,
      name: userDetail.name,
      email: userDetail.email,
    });
  }

  useEffect(() => {
    if (token !== "") {
      user.setUserDetails(token);
      getCurrentUser();
    }
  }, [token]);
  return (
    <KuberaThemeProvider platform="kubera-chaos">
      <Suspense fallback={<Loader />}>
        <Router history={history}>
          <div className={classes.root}>
            <div className={classes.appFrame}>
              {/* <Routes /> */}
              <Routes
                isOwner={userData.userRole === "Owner"}
                isProjectAvailable={!!userData.selectedProjectID}
              />
            </div>
          </div>
        </Router>
      </Suspense>
    </KuberaThemeProvider>
  );
}

export default App;
