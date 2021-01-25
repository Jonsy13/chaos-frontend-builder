import { useQuery } from '@apollo/client';
import { IconButton, Paper, Typography } from '@material-ui/core';
import { ButtonFilled } from 'kubera-ui';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GET_PROJECTS } from '../../../../../graphql/queries';
import { Member, Project, Projects } from '../../../../../models/graphql/user';
import { JWTData } from '../../../../../models/userData';
import useActions from '../../../../../redux/actions';
import * as UserActions from '../../../../../redux/actions/user';
import configureStore, { history } from '../../../../../redux/configureStore';
import getToken from '../../../../../utils/getToken';
import { getUserDetailsFromJwt } from '../../../../../utils/user';
import useStyles from './styles';

const AcceptedInvitations: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { persistor } = configureStore();
  const userDetails: JWTData = getUserDetailsFromJwt(getToken());
  const user = useActions(UserActions);
  const [projectOther, setProjectOther] = useState<Project[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const { data: dataProject } = useQuery<Projects>(GET_PROJECTS, {
    onCompleted: () => {
      if (dataProject?.getProjects) {
        setProjects(dataProject?.getProjects);
      }
    },
  });
  useEffect(() => {
    const otherProject: Project[] = [];
    projects.map((project) => {
      return project.members.forEach((member: Member) => {
        if (
          member.user_uid === userDetails.uid &&
          member.role !== 'Owner' &&
          member.invitation === 'Accepted'
        ) {
          otherProject.push(project);
        }
      });
    });
    setProjectOther([...otherProject]);
  }, [projects]);

  const setSelectedProjectID = (selectedProjectID: string) => {
    return dataProject?.getProjects.forEach((project) => {
      if (selectedProjectID === project.id) {
        const memberList: Member[] = project.members;

        memberList.forEach((member) => {
          if (member.user_uid === userDetails.uid) {
            user.updateUserDetails({
              selectedProjectID,
              userRole: member.role,
              selectedProjectName: project.name,
            });
            // Flush data to persistor immediately
            persistor.flush();

            if (member.role !== 'Owner') {
              history.push('/');
            }
          }
        });
      }
    });
  };

  return (
    <>
      {projectOther.length ? (
        projectOther.map((project) => (
          <div data-cy="receivedInvitationModal">
            <Paper className={classes.root}>
              <div className={classes.projectDiv}>
                <img src="./icons/chaos-icon.svg" alt="chaos" />
                <Typography className={classes.projectName}>
                  {project.name}
                </Typography>
                <IconButton onClick={() => setSelectedProjectID(project.id)}>
                  <Typography className={classes.viewProject}>
                    View Project
                  </Typography>
                </IconButton>
              </div>
              <div className={classes.buttonDiv}>
                <div data-cy="receivedInvitationAccept">
                  <ButtonFilled onClick={() => {}} disabled>
                    {t(
                      'settings.teamingTab.invitation.receivedInvitation.button.leave'
                    )}
                  </ButtonFilled>
                </div>
              </div>
            </Paper>
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default AcceptedInvitations;
