import { Avatar, Typography } from '@material-ui/core';
import { ButtonFilled } from 'kubera-ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from './styles';

interface ProfileDropdownProps {
  name: string;
  email: string;
  initials: string | undefined;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  name,
  email,
  initials,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const logOut = () => {
    window.location.href = '/signout';
  };

  return (
    <div className={classes.popOverItems}>
      <div className={classes.detailsDiv}>
        <div>
          {name ? (
            <Avatar alt={initials} className={classes.avatarBackground}>
              {initials}
            </Avatar>
          ) : (
            <Avatar alt="User" className={classes.avatarBackground} />
          )}
        </div>
        <div className={classes.name}>
          <Typography>{name}</Typography>
          <Typography>{email}</Typography>
        </div>
      </div>
      <div className={classes.buttonArea}>
        <ButtonFilled fullWidth data-cy="logout" onClick={logOut}>
          <Typography>{t('header.profileDropdown.logOut')}</Typography>
          <img src="./icons/logOut.svg" alt="Logout" />
        </ButtonFilled>
      </div>
    </div>
  );
};

export default ProfileDropdown;
