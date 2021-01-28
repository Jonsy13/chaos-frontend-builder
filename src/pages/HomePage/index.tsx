/* eslint-disable no-unused-expressions */
import { useQuery } from '@apollo/client';
import { Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop/Backdrop';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ButtonFilled from '../../components/Button/ButtonFilled';
import { CreateWorkflowCard } from '../../components/CreateWorkflowCard';
import Loader from '../../components/Loader';
import QuickActionCard from '../../components/QuickActionCard';
import WelcomeModal from '../../components/WelcomeModal';
import Center from '../../containers/layouts/Center';
import Scaffold from '../../containers/layouts/Scaffold';
import { GET_CLUSTER, GET_PROJECTS } from '../../graphql';
import { Clusters, ClusterVars } from '../../models/graphql/clusterData';
import { Member, Project, Projects } from '../../models/graphql/user';
import { JWTData } from '../../models/userData';
import useActions from '../../redux/actions';
import * as AgentActions from '../../redux/actions/agent';
import * as TabActions from '../../redux/actions/tabs';
import * as UserActions from '../../redux/actions/user';
import configureStore, { history } from '../../redux/configureStore';
import { RootState } from '../../redux/reducers';
import getToken from '../../utils/getToken';
import { getUserDetailsFromJwt } from '../../utils/user';
import NonAdminPage from '../../views/Home/NonAdminPages';
import ReturningHome from '../../views/Home/ReturningHome';
import useStyles from './style';

const HomePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const userData = useSelector((state: RootState) => state.userData);
  const agentConfigured = useSelector(
    (state: RootState) => state.configureAgent.agentConfigured
  );
  const classes = useStyles();
  const { t } = useTranslation();
  const user = useActions(UserActions);
  const tabs = useActions(TabActions);
  const agent = useActions(AgentActions);
  // Use the persistor object
  const { persistor } = configureStore();

  const userDetails: JWTData = getUserDetailsFromJwt(getToken());

  const { data, loading } = useQuery<Projects>(GET_PROJECTS);
  // Apollo query to get the agent data
  const { data: agentList } = useQuery<Clusters, ClusterVars>(GET_CLUSTER, {
    variables: { project_id: userData.selectedProjectID },
    fetchPolicy: 'cache-and-network',
  });
  tabs.changeWorkflowsTabs(0);
  tabs.changeSettingsTabs(0);
  tabs.changeAnalyticsDashboardTabs(0);

  const { name } = userData;

  const handleModal = () => {
    setIsOpen(false);
  };

  const [dataPresent, setDataPresent] = useState<boolean>(true);

  useEffect(() => {
    let isOwnerOfOneProject: boolean = false;
    data?.getProjects.map((project) => {
      project.members.forEach((member) => {
        if (member.user_uid === userDetails.uid && member.role === 'Owner') {
          isOwnerOfOneProject = true;
        }
      });
    });

    if ((data?.getProjects ?? []).length > 0 && isOwnerOfOneProject) {
      setIsOpen(false);
      if (userData.selectedProjectID === '') {
        let isOwnerOfProject = { id: '', name: '' };
        const projectList: Project[] = data?.getProjects ?? [];
        projectList.forEach((project) => {
          const memberList: Member[] = project.members;
          memberList.forEach((member) => {
            if (
              member.user_uid === userDetails.uid &&
              member.role === 'Owner'
            ) {
              isOwnerOfProject = {
                id: project.id,
                name: project.name,
              };
            }
          });
        });
        user.updateUserDetails({
          selectedProjectID: isOwnerOfProject.id,
          userRole: 'Owner',
          selectedProjectName: isOwnerOfProject.name,
          selectedProjectOwner: userData.username,
        });
        user.updateUserDetails({ loader: false });
        // Flush data to persistor immediately
        persistor.flush();
        window.location.reload(false);
      }
    }
  }, [data]);

  useEffect(() => {
    if (!agentConfigured && agentList && agentList?.getCluster.length > 0) {
      agent.configureAgent({
        agentConfigured: true,
      });
    }
  }, [agentList]);

  return (
    <div>
      {userData.loader ? (
        <Backdrop open className={classes.backdrop}>
          <Loader />
          <Center>
            <Typography variant="h4" align="center">
              Updating User Details
            </Typography>
          </Center>
        </Backdrop>
      ) : (
        <Scaffold>
          {isOpen && !loading ? (
            <WelcomeModal handleIsOpen={handleModal} />
          ) : (
            <></>
          )}
          {!agentConfigured ? (
            <NonAdminPage />
          ) : (
            <div className={classes.rootContainer}>
              <div className={classes.root}>
                <Typography variant="h3" className={classes.userName}>
                  {t('home.heading')}
                  <strong>{` ${name}`}</strong>
                </Typography>
                {dataPresent ? (
                  <ReturningHome
                    callbackToSetDataPresent={(dataPresent: boolean) => {
                      setDataPresent(dataPresent);
                    }}
                    currentStatus={dataPresent}
                  />
                ) : (
                  <div className={classes.headingDiv}>
                    <div className={classes.mainDiv}>
                      <div>
                        <Typography className={classes.mainHeading}>
                          <strong>{t('home.subHeading1')}</strong>
                        </Typography>
                        <Typography className={classes.mainResult}>
                          <strong>{t('home.subHeading2')}</strong>
                        </Typography>
                        {agentConfigured ? (
                          <div>
                            <Typography className={classes.mainDesc}>
                              {t('home.subHeading3')}
                            </Typography>
                            <div className={classes.predefinedBtn}>
                              <ButtonFilled
                                handleClick={() => {
                                  tabs.changeWorkflowsTabs(2);
                                  history.push('/workflows');
                                }}
                                isPrimary={false}
                              >
                                <Typography variant="subtitle1">
                                  {t('home.button1')}
                                </Typography>
                              </ButtonFilled>
                            </div>
                          </div>
                        ) : (
                          <div className={classes.noAgentFlex}>
                            <div className={classes.zeroImageDiv}>
                              <img src="./icons/zero.svg" alt="Zero" />
                            </div>
                            <Typography className={classes.mainDescDown}>
                              {t('home.subHeading6')}
                            </Typography>
                            <Typography
                              className={classes.mainDescArrow}
                              display="inline"
                            >
                              <img
                                src="./icons/arrow_right.svg"
                                alt="Arrow icon"
                              />
                            </Typography>
                          </div>
                        )}
                      </div>
                      <div className={classes.imageDiv}>
                        <img src="./icons/applause.svg" alt="Applause icon" />
                      </div>
                    </div>
                    <div>
                      <CreateWorkflowCard
                        isDisabled={!agentConfigured}
                        data-cy="CreateWorkflowCard"
                      />
                    </div>
                  </div>
                )}
                {!dataPresent ? (
                  <div className={classes.contentDiv}>
                    <div className={classes.mainDiv}>
                      <div>
                        <Typography className={classes.mainResult}>
                          <strong>{t('home.subHeading4')}</strong>
                        </Typography>
                        <Typography className={classes.mainDesc}>
                          {t('home.subHeading5')}
                        </Typography>
                        <div className={classes.predefinedBtn}>
                          <ButtonFilled
                            handleClick={() => {
                              history.push('/agent-connect');
                            }}
                            isPrimary={false}
                          >
                            <Typography variant="subtitle1">
                              {t('home.button2')}
                            </Typography>
                          </ButtonFilled>
                        </div>
                      </div>
                      <div className={classes.imageDiv}>
                        <img
                          src="./icons/targetLarge.svg"
                          alt="Applause icon"
                        />
                      </div>
                    </div>
                    <div className={classes.quickActionDiv}>
                      <QuickActionCard analyticsHome={false} nonAdmin={false} />
                    </div>
                  </div>
                ) : (
                  <div />
                )}
              </div>
            </div>
          )}
        </Scaffold>
      )}
    </div>
  );
};

export default HomePage;
