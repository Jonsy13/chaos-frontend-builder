/* eslint-disable no-unused-expressions */
import { useQuery } from '@apollo/client';
import { Box, Divider } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { GET_PROJECTS } from '../../graphql/queries';
import { Member, Projects } from '../../models/graphql/user';
import { JWTData } from '../../models/userData';
import useActions from '../../redux/actions';
import * as UserActions from '../../redux/actions/user';
import configureStore, { history } from '../../redux/configureStore';
import { RootState } from '../../redux/reducers';
import getToken from '../../utils/getToken';
import { getUserDetailsFromJwt } from '../../utils/user';
import CustomBreadCrumbs from '../BreadCrumbs';
import ProfileDropdownSection from './ProfileDropdownSection';
import useStyles from './styles';

interface SelectedProjectDetails {
  selectedProjectID: string;
  selectedProjectName: string;
  selectedUserRole: string;
}

const Header: React.FC = () => {
  const classes = useStyles();
  const userData = useSelector((state: RootState) => state.userData);
  const user = useActions(UserActions);
  // Use the persistor object
  const { persistor } = configureStore();
  const userDetails: JWTData = getUserDetailsFromJwt(getToken());
  const name: string = userData?.name ?? '';
  const email: string = userData?.email ?? '';

  const [selectedProjectDetails, setSelectedProjectDetails] = useState<
    SelectedProjectDetails
  >({
    selectedProjectID: userData.selectedProjectID,
    selectedProjectName: userData.selectedProjectName,
    selectedUserRole: userData.userRole,
  });

  const { data } = useQuery<Projects>(GET_PROJECTS, {
    onCompleted: (data) => {
      // Since ProjectID is setting up in homepage component, we have to check if it is set or not.
      // By default project details of owned project will be set.
      if (selectedProjectDetails.selectedProjectID === '') {
        let OwnedProject = { id: '', name: '' };
        data.getProjects.forEach((project) => {
          const memberList: Member[] = project.members;
          memberList.forEach((member) => {
            if (
              member.user_uid === userDetails.uid &&
              member.role === 'Owner'
            ) {
              OwnedProject = {
                id: project.id,
                name: project.name,
              };
            }
          });
        });
        setSelectedProjectDetails({
          selectedProjectID: OwnedProject.id,
          selectedProjectName: OwnedProject.name,
          selectedUserRole: 'Owner',
        });
      }
    },
  });

  const setSelectedProjectID = (selectedProjectID: string) => {
    data?.getProjects.forEach((project) => {
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

            setSelectedProjectDetails({
              selectedProjectID,
              selectedUserRole: member.role,
              selectedProjectName: project.name,
            });

            if (member.role !== 'Owner') {
              history.push('/');
            }
          }
        });
      }
    });
  };

  return (
    <div data-cy="headerComponent">
      <AppBar position="relative" className={classes.appBar} elevation={0}>
        <Toolbar>
          <div style={{ width: '100%' }}>
            <Box display="flex" p={1} className={classes.headerFlex}>
              <Box p={1} flexGrow={8} className={classes.headerFlexExtraPadded}>
                <CustomBreadCrumbs location={useLocation().pathname} />
              </Box>
              <Box p={1} className={classes.headerFlexPadded}>
                {/*              <NotificationsDropdown
                  count={`${countOfMessages}`}
                  messages={messages}
                  CallbackToHeaderOnDeleteNotification={deleteNotification}
                />
  */}
              </Box>
              <Box p={1} flexGrow={1} className={classes.headerFlexProfile}>
                <ProfileDropdownSection
                  name={name}
                  email={email}
                  username={userData.username}
                  userUID={userDetails.uid}
                  selectedProjectID={selectedProjectDetails.selectedProjectID}
                  CallbackToSetSelectedProjectID={setSelectedProjectID}
                  selectedProjectName={
                    selectedProjectDetails.selectedProjectName
                  }
                  userRole={selectedProjectDetails.selectedUserRole}
                />
              </Box>
            </Box>
          </div>
        </Toolbar>
        <Divider className={classes.dividerMain} />
      </AppBar>
    </div>
  );
};

export default Header;
