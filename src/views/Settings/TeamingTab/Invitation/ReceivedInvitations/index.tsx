import { useMutation, useQuery } from '@apollo/client';
import { Avatar, Paper, Typography } from '@material-ui/core';
import { ButtonFilled, ButtonOutlined } from 'kubera-ui';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import config from '../../../../../config';
import {
  ACCEPT_INVITE,
  DECLINE_INVITE,
  GET_PROJECTS,
} from '../../../../../graphql';
import { MemberInvitation } from '../../../../../models/graphql/invite';
import { Projects } from '../../../../../models/graphql/user';
import { CurrentUserData, JWTData } from '../../../../../models/userData';
import getToken from '../../../../../utils/getToken';
import userAvatar, {
  getCoreToken,
  getUserDetailsFromJwt,
} from '../../../../../utils/user';
import useStyles from './styles';

interface ReceivedInvitation {
  projectName: string;
  user_uid: string;
  role: string;
  projectID: string;
}

const ReceivedInvitations: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  // for response data
  const [rows, setRows] = useState<ReceivedInvitation[]>([]);
  const [allUsers, setAllUsers] = useState<CurrentUserData[]>([]);
  const [loading, setLoading] = useState(true);
  // stores the user whose invitation is accepted/declined
  const [acceptDecline, setAcceptDecline] = useState<string>('');
  const userDetails: JWTData = getUserDetailsFromJwt(getToken());

  // mutation to accept the invitation
  const [acceptInvite] = useMutation<MemberInvitation>(ACCEPT_INVITE, {
    onCompleted: () => {
      setRows(rows.filter((row) => row.user_uid !== acceptDecline));
    },
    onError: () => {},
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  // mutation to decline the invitation
  const [declineInvite] = useMutation<MemberInvitation>(DECLINE_INVITE, {
    onCompleted: () => {
      setRows(rows.filter((row) => row.user_uid !== acceptDecline));
    },
    onError: () => {},
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const { data } = useQuery<Projects>(GET_PROJECTS, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    const projectList = data?.getProjects ?? [];
    const users: ReceivedInvitation[] = [];

    let flag = 0;
    let roleVar = '';

    projectList.forEach((project) => {
      project.members.forEach((member) => {
        if (
          member.user_uid === userDetails.uid &&
          member.invitation === 'Pending'
        ) {
          flag = 1;
          roleVar = member.role;
        }
      });
      if (flag === 1) {
        project.members.forEach((member) => {
          if (member.user_uid !== userDetails.uid && member.role === 'Owner') {
            users.push({
              projectID: project.id,
              projectName: project.name,
              role: roleVar,
              user_uid: member.user_uid,
            });
          }
        });
        flag = 0;
      }
    });
    setRows([...users]);
    fetch(`${config.auth.url}/v1/user`, {
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
        setAllUsers(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [data]);
  return (
    <div data-cy="receivedInvitationModal">
      {!loading ? (
        <>
          {rows.length > 0 ? (
            rows.map((row) => (
              <Paper className={classes.root}>
                <div className={classes.avatarDiv}>
                  <Avatar
                    data-cy="avatar"
                    alt="User"
                    className={classes.avatarBackground}
                    style={{ alignContent: 'right' }}
                  >
                    {userAvatar(
                      allUsers.filter((data) => {
                        return row.user_uid === data.uid;
                      })[0].name
                    )}
                  </Avatar>
                  <div>
                    <Typography className={classes.name}>
                      {
                        allUsers.filter((data) => {
                          return row.user_uid === data.uid;
                        })[0].name
                      }
                    </Typography>
                    <Typography className={classes.email}>
                      {t(
                        'settings.teamingTab.invitation.receivedInvitation.inviteTextFirst'
                      )}{' '}
                      {row.role === 'Editor' ? 'an' : 'a'}{' '}
                      <strong>{row.role}</strong>{' '}
                      {t(
                        'settings.teamingTab.invitation.receivedInvitation.inviteTextSecond'
                      )}
                    </Typography>
                  </div>
                </div>
                <div className={classes.projectDiv}>
                  <img src="./icons/chaos-icon.svg" alt="chaos" />
                  <Typography className={classes.projectName}>
                    {row.projectName}
                  </Typography>
                </div>
                <div className={classes.buttonDiv}>
                  <ButtonOutlined
                    className={classes.butnOutline}
                    onClick={() => {
                      setAcceptDecline(row.user_uid);
                      declineInvite({
                        variables: {
                          member: {
                            project_id: row.projectID,
                            user_uid: userDetails.uid,
                          },
                        },
                      });
                    }}
                    disabled={false}
                  >
                    <div>
                      {t(
                        'settings.teamingTab.invitation.receivedInvitation.button.ignore'
                      )}
                    </div>
                  </ButtonOutlined>
                  <div data-cy="receivedInvitationAccept">
                    <ButtonFilled
                      onClick={() => {
                        setAcceptDecline(row.user_uid);
                        acceptInvite({
                          variables: {
                            member: {
                              project_id: row.projectID,
                              user_uid: userDetails.uid,
                            },
                          },
                        });
                      }}
                      disabled={false}
                    >
                      {t(
                        'settings.teamingTab.invitation.receivedInvitation.button.accept'
                      )}
                    </ButtonFilled>
                  </div>
                </div>{' '}
              </Paper>
            ))
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ReceivedInvitations;
