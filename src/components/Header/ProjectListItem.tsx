import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useTheme,
} from '@material-ui/core';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import React, { useState } from 'react';
import { Project } from '../../models/graphql/user';
import { ProjectsCallBackType } from '../../models/header';
import useStyles from './styles';

interface ProjectListItemProps {
  project: Project;
  selectedProjectID: string;
  callbackToSetActiveProjectID: ProjectsCallBackType;
}

const ProjectListItem: React.FC<ProjectListItemProps> = ({
  project,
  selectedProjectID,
  callbackToSetActiveProjectID,
}) => {
  const classes = useStyles();
  const { palette } = useTheme();
  const [projSelected, setProjSelected] = useState(
    project.id === selectedProjectID
  );

  const selectProject = () => {
    callbackToSetActiveProjectID(`${project.id}`);
    setProjSelected(true);
  };

  return (
    <ListItem
      data-cy="project"
      onClick={selectProject}
      style={{
        backgroundColor: projSelected
          ? palette.primary.dark
          : palette.cards.background,
      }}
      className={classes.listItemStyle}
    >
      <ListItemAvatar>
        {projSelected ? (
          <Avatar className={classes.selectedAvatar}>
            <CheckCircleSharpIcon className={classes.selectedIcon} />
          </Avatar>
        ) : (
          <Avatar className={classes.unSelectedAvatar}>
            <InsertDriveFileOutlinedIcon className={classes.unSelectedIcon} />
          </Avatar>
        )}
      </ListItemAvatar>
      <ListItemText
        primary={project.name}
        className={classes.projectListText}
      />
    </ListItem>
  );
};

export default ProjectListItem;
