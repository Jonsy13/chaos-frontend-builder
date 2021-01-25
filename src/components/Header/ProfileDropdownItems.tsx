/* eslint-disable react/no-array-index-key */
import { useQuery } from '@apollo/client';
import {
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GET_PROJECTS } from '../../graphql';
import { Member, Project, Projects } from '../../models/graphql/user';
import { ProjectsCallBackType } from '../../models/header';
import { JWTData } from '../../models/userData';
import getToken from '../../utils/getToken';
import { getUserDetailsFromJwt } from '../../utils/user';
import ProjectListItem from './ProjectListItem';
import useStyles from './styles';

interface ProfileInfoDropdownItemProps {
  anchorEl: HTMLElement;
  isOpen: boolean;
  onClose: () => void;
  userUID: string;
  selectedProjectID: string;
  CallbackToSetSelectedProjectIDOnProfileDropdown: ProjectsCallBackType;
}

const ProfileInfoDropdownItems: React.FC<ProfileInfoDropdownItemProps> = ({
  anchorEl,
  isOpen,
  onClose,

  userUID,
  selectedProjectID,
  CallbackToSetSelectedProjectIDOnProfileDropdown,
}) => {
  const classes = useStyles();
  const id = isOpen ? 'profile-popover' : undefined;
  const { t } = useTranslation();
  const { data } = useQuery<Projects>(GET_PROJECTS);
  const projects = data?.getProjects ?? [];
  const userDetails: JWTData = getUserDetailsFromJwt(getToken());

  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [otherProjects, setOtherProjects] = useState<Project[]>([]);

  const CallbackFromProjectListItem = (selectedProjectIDFromList: string) => {
    CallbackToSetSelectedProjectIDOnProfileDropdown(selectedProjectIDFromList);
  };

  useEffect(() => {
    const projectOwner: Project[] = [];
    const projectOther: Project[] = [];

    projects.map((project) => {
      return project.members.forEach((member: Member) => {
        if (
          member.user_uid === userUID &&
          member.role === 'Owner' &&
          member.invitation === 'Accepted'
        ) {
          projectOwner.push(project);
        } else if (
          member.user_uid === userDetails.uid &&
          member.role !== 'Owner' &&
          member.invitation === 'Accepted'
        ) {
          projectOther.push(project);
        }
      });
    });
    setMyProjects([...projectOwner]);
    setOtherProjects(projectOther);
  }, [data]);

  return (
    <div>
      <Popover
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: classes.popover,
        }}
        className={classes.popoverProfileAdjust}
      >
        <List dense className={classes.tabContainerProfileDropdownItem}>
          <Typography className={classes.ProjectText}>My Projects</Typography>
          {myProjects.length === 0 ? (
            <ListItem data-cy="project" className={classes.noProject}>
              <ListItemText>
                {t('header.profileDropdown.noProjectsOwner')}
              </ListItemText>
            </ListItem>
          ) : (
            myProjects.map((element: Project, index: number) => (
              <ProjectListItem
                key={index}
                project={element}
                selectedProjectID={selectedProjectID}
                callbackToSetActiveProjectID={CallbackFromProjectListItem}
              />
            ))
          )}
          <Typography className={classes.ProjectText}>
            Other Projects
          </Typography>
          {otherProjects.length === 0 ? (
            <ListItem data-cy="project" className={classes.noProject}>
              <ListItemText>
                {t('header.profileDropdown.noProjectsOther')}
              </ListItemText>
            </ListItem>
          ) : (
            otherProjects.map((element: Project, index: number) => (
              <ProjectListItem
                key={index}
                project={element}
                selectedProjectID={selectedProjectID}
                callbackToSetActiveProjectID={CallbackFromProjectListItem}
              />
            ))
          )}
        </List>
      </Popover>
    </div>
  );
};

export default ProfileInfoDropdownItems;
