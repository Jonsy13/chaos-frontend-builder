import { IconButton, Popover, useTheme } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ExpandMoreTwoToneIcon from '@material-ui/icons/ExpandMoreTwoTone';
import React, { useRef, useState } from 'react';
import { ProjectsCallBackType } from '../../models/header';
import userAvatar from '../../utils/user';
import ProfileDropdown from './ProfileDropdown';
import ProfileInfoDropdownItems from './ProfileDropdownItems';
import useStyles from './styles';

interface ProfileInfoDropdownSectionProps {
  name: string;
  email: string;
  username: string;
  userUID: string;
  selectedProjectID: string;
  CallbackToSetSelectedProjectID: ProjectsCallBackType;
  userRole: string;
  selectedProjectName: string;
}

const ProfileDropdownSection: React.FC<ProfileInfoDropdownSectionProps> = ({
  name,
  email,
  userUID,
  selectedProjectID,
  CallbackToSetSelectedProjectID,
  selectedProjectName,
  userRole,
}) => {
  const classes = useStyles();
  const { palette } = useTheme();
  const [isProfilePopoverOpen, setProfilePopoverOpen] = useState(false);
  const profileMenuRef = useRef<HTMLButtonElement>(null);
  const initials = name ? userAvatar(name) : userAvatar(name);

  const sendSelectedProjectIDToHeader = (selectedProjectID: string) => {
    CallbackToSetSelectedProjectID(selectedProjectID);
    setProfilePopoverOpen(false);
  };
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  // Handle clicks
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      <div className={classes.projectDetails}>
        <Typography className={classes.projectDisplay}>
          {selectedProjectName} ({userRole})
          <IconButton
            data-cy="header-dropdown"
            edge="end"
            ref={profileMenuRef}
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={() => setProfilePopoverOpen(true)}
            className={classes.buttonPositionExpand}
          >
            <ExpandMoreTwoToneIcon htmlColor={palette.highlight} />
          </IconButton>
        </Typography>

        <div className={classes.avatar}>
          <IconButton onClick={handleClick}>
            {name ? (
              <Avatar alt={initials} className={classes.avatarBackground}>
                {initials}
              </Avatar>
            ) : (
              <Avatar alt="User" className={classes.avatarBackground} />
            )}
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <ProfileDropdown name={name} email={email} initials={initials} />
          </Popover>
        </div>
      </div>
      <ProfileInfoDropdownItems
        anchorEl={profileMenuRef.current as HTMLElement}
        isOpen={isProfilePopoverOpen}
        onClose={() => setProfilePopoverOpen(false)}
        userUID={userUID}
        selectedProjectID={selectedProjectID}
        CallbackToSetSelectedProjectIDOnProfileDropdown={
          sendSelectedProjectIDToHeader
        }
      />
    </div>
  );
};

export default ProfileDropdownSection;
