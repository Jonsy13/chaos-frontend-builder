import { useQuery } from '@apollo/client';
import { Paper, Typography } from '@material-ui/core';
import { ButtonFilled } from 'kubera-ui';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CreateWorkflowCard } from '../../../components/CreateWorkflowCard';
import QuickActionCard from '../../../components/QuickActionCard';
import { GET_CLUSTER, GET_PROJECTS } from '../../../graphql/queries';
import { Clusters, ClusterVars } from '../../../models/graphql/clusterData';
import { Member, Project, Projects } from '../../../models/graphql/user';
import { JWTData } from '../../../models/userData';
import { history } from '../../../redux/configureStore';
import { RootState } from '../../../redux/reducers';
import getToken from '../../../utils/getToken';
import { getUserDetailsFromJwt } from '../../../utils/user';
import useStyles from './styles';

const NonAdminPage = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const userData = useSelector((state: RootState) => state.userData);
  const { name } = userData;
  const userDetails: JWTData = getUserDetailsFromJwt(getToken());

  const [projectOwnerCount, setProjectOwnerCount] = useState<number>(0);
  const [projectOtherCount, setProjectOtherCount] = useState<number>(0);
  const [invitationsCount, setInvitationCount] = useState<number>(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const { data: dataProject } = useQuery<Projects>(GET_PROJECTS, {
    onCompleted: () => {
      if (dataProject?.getProjects) {
        setProjects(dataProject?.getProjects);
      }
    },
    fetchPolicy: 'cache-and-network',
  });
  const { data: agentList } = useQuery<Clusters, ClusterVars>(GET_CLUSTER, {
    variables: { project_id: userData.selectedProjectID },
    fetchPolicy: 'cache-and-network',
  });
  useEffect(() => {
    let projectOwner = 0;
    let projectInvitation = 0;
    let projectOther = 0;
    projects.forEach((project) => {
      project.members.forEach((member: Member) => {
        if (member.user_uid === userDetails.uid && member.role === 'Owner') {
          projectOwner++;
        } else if (
          member.user_uid === userDetails.uid &&
          member.invitation === 'Pending'
        ) {
          projectInvitation++;
        } else if (
          member.user_uid === userDetails.uid &&
          member.role !== 'Owner' &&
          member.invitation === 'Accepted'
        ) {
          projectOther++;
        }
      });
    });
    setProjectOwnerCount(projectOwner);
    setInvitationCount(projectInvitation);
    setProjectOtherCount(projectOther);
  }, [projects, dataProject]);

  return (
    <div>
      <Typography variant="h3" className={classes.userName}>
        {t('home.heading')}
        <strong>{` ${name}`}</strong>
      </Typography>

      {/* Row 1 */}

      <div className={classes.firstRow}>
        <Paper className={classes.mainDiv}>
          <div className={classes.paperContent}>
            <Typography className={classes.mainHeading}>
              <strong>{t('home.subHeading1')}</strong>
            </Typography>
            <Typography className={classes.mainResult}>
              <strong>{t('home.subHeading2')}</strong>
            </Typography>
            <Typography className={classes.warningText}>
              {t('home.NonAdmin.noAgent')}
            </Typography>
            <Typography className={classes.mainDesc}>
              {t('home.NonAdmin.agentDeployInfo')}
            </Typography>
          </div>
          <div className={classes.imageDiv}>
            <img src="./icons/NoAgentAlert.svg" alt="No Agent Found" />
          </div>
        </Paper>
        <div className={classes.workflowCard}>
          <CreateWorkflowCard
            isDisabled={agentList?.getCluster.length === 0}
            data-cy="CreateWorkflowCard"
          />
        </div>
      </div>
      {/* Row 2 */}
      <div className={classes.secondRow}>
        {/* First Card */}
        <Paper className={classes.rowTwoPaper}>
          <Typography id="agentText">
            {t('home.NonAdmin.chaosAgent')}
          </Typography>
          <div className={classes.agentFlex}>
            <Typography className={classes.agentCount}>
              {agentList?.getCluster.length}
            </Typography>
            <Typography>{t('home.NonAdmin.agents')}</Typography>
            <div className={classes.agentDesc}>
              <Typography>{t('home.NonAdmin.chaosAgentInfo')}</Typography>
            </div>
          </div>
          <ButtonFilled onClick={() => history.push('/agent-connect')}>
            {t('home.NonAdmin.deployFirst')}
          </ButtonFilled>
        </Paper>
        {/* Second Card */}
        <Paper id="rowTwoSecondPaper" className={classes.rowTwoPaper}>
          <div className={classes.flexEnd}>
            <div className={classes.invitationBoxFlex}>
              {t('settings.teamingTab.invitations')}
              <Typography>{invitationsCount}</Typography>
            </div>
          </div>
          <div className={classes.projectInfoProjectStats}>
            <Typography>{projectOtherCount + projectOwnerCount}</Typography>
            {projectOtherCount + projectOwnerCount > 1 ? (
              <Typography>{t('settings.teamingTab.projects')}</Typography>
            ) : (
              <Typography>{t('settings.teamingTab.project')}</Typography>
            )}
          </div>
          <div className={classes.flexEnd}>
            <ButtonFilled onClick={() => history.push('/settings')}>
              {t('home.NonAdmin.toProjects')}
            </ButtonFilled>
          </div>
        </Paper>
        <QuickActionCard analyticsHome nonAdmin />
      </div>
    </div>
  );
};

export default NonAdminPage;
