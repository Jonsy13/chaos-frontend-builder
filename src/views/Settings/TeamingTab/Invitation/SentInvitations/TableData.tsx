import { useMutation } from '@apollo/client/react/hooks/useMutation';
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  Typography,
} from '@material-ui/core';
import { ButtonFilled, ButtonOutlined } from 'kubera-ui';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Loader from '../../../../../components/Loader';
import config from '../../../../../config';
import {
  REMOVE_INVITATION,
  SEND_INVITE,
} from '../../../../../graphql/mutations';
import { GET_PROJECT } from '../../../../../graphql/queries';
import {
  MemberInvitation,
  MemberInviteNew,
} from '../../../../../models/graphql/invite';
import { Member } from '../../../../../models/graphql/user';
import { CurrentUserData } from '../../../../../models/userData';
import { RootState } from '../../../../../redux/reducers';
import userAvatar, { getCoreToken } from '../../../../../utils/user';
import useStyles from './styles';

interface TableDataProps {
  row: Member;
}

const TableData: React.FC<TableDataProps> = ({ row }) => {
  const userData = useSelector((state: RootState) => state.userData);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string>(row.role);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { t } = useTranslation();
  const [currentUserDetails, setCurrentUserDetails] = useState<
    CurrentUserData
  >();

  // mutation to send invitation to selected users
  const [SendInvite, { loading: loadingB }] = useMutation<MemberInviteNew>(
    SEND_INVITE,
    {
      refetchQueries: [
        {
          query: GET_PROJECT,
          variables: { projectID: userData.selectedProjectID },
        },
      ],
    }
  );

  const [CancelInvite, { loading: loadingA }] = useMutation<MemberInvitation>(
    REMOVE_INVITATION,
    {
      refetchQueries: [
        {
          query: GET_PROJECT,
          variables: { projectID: userData.selectedProjectID },
        },
      ],
    }
  );

  useEffect(() => {
    fetch(`${config.auth.url}/v1/user/uid/${row.user_uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCoreToken()}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setCurrentUserDetails(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      {!loading ? (
        <TableCell>
          <div className={classes.rowDiv}>
            <div className={classes.firstCol}>
              <Avatar
                data-cy="avatar"
                alt="User"
                className={classes.avatarBackground}
                style={{ alignContent: 'right' }}
              >
                {userAvatar(currentUserDetails?.name as string)}
              </Avatar>
              <div className={classes.detail}>
                <div className={classes.flexstatus}>
                  <div> {currentUserDetails?.name}</div>

                  <div
                    className={
                      row.invitation === 'Pending'
                        ? classes.pending
                        : classes.declined
                    }
                  >
                    {row.invitation}
                  </div>
                </div>
                <div className={classes.email}>{currentUserDetails?.email}</div>
              </div>
            </div>
            <div className={classes.buttonDiv}>
              <div className={classes.dropDown}>
                {role}
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={(event) => {
                    setAnchorEl(event.currentTarget);
                  }}
                  className={classes.optionBtn}
                >
                  <img src="./icons/down-arrow.svg" alt="more" />
                </IconButton>
                <Menu
                  keepMounted
                  open={Boolean(anchorEl)}
                  id="long-menu"
                  anchorEl={anchorEl}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      setRole('Editor');
                      setAnchorEl(null);
                    }}
                    className={classes.menuOpt}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div>
                        <Typography className={classes.menuHeader}>
                          <strong>
                            {t(
                              'settings.teamingTab.invitation.sentInvitation.menuItem.editorRole.label'
                            )}
                          </strong>
                        </Typography>
                      </div>
                      <div>
                        <Typography className={classes.menuDesc}>
                          {t(
                            'settings.teamingTab.invitation.sentInvitation.menuItem.editorRole.body'
                          )}
                        </Typography>
                      </div>
                    </div>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setRole('Viewer');
                      setAnchorEl(null);
                    }}
                    className={classes.menuOpt}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div>
                        <Typography className={classes.menuHeader}>
                          <strong>
                            {t(
                              'settings.teamingTab.invitation.sentInvitation.menuItem.viewerRole.label'
                            )}
                          </strong>
                        </Typography>
                      </div>
                      <div>
                        <Typography className={classes.menuDesc}>
                          {t(
                            'settings.teamingTab.invitation.sentInvitation.menuItem.viewerRole.body'
                          )}
                        </Typography>
                      </div>
                    </div>
                  </MenuItem>
                </Menu>
              </div>
              <div data-cy="cancelInviteDoneButton">
                <ButtonOutlined
                  onClick={() =>
                    CancelInvite({
                      variables: {
                        data: {
                          project_id: userData.selectedProjectID,
                          user_uid: row.user_uid,
                        },
                      },
                    })
                  }
                  disabled={row.invitation === 'Declined' || loadingA}
                >
                  {loadingA ? <Loader size={20} /> : 'Cancel'}
                </ButtonOutlined>
              </div>
              <div data-cy="resendInviteDoneButton">
                <ButtonFilled
                  disabled={loadingB}
                  onClick={() =>
                    SendInvite({
                      variables: {
                        member: {
                          project_id: userData.selectedProjectID,
                          user_uid: row.user_uid,
                          role,
                        },
                      },
                    })
                  }
                >
                  {loadingB ? <Loader size={20} /> : 'Resend'}
                </ButtonFilled>
              </div>
            </div>
          </div>
        </TableCell>
      ) : null}
    </>
  );
};
export default TableData;
