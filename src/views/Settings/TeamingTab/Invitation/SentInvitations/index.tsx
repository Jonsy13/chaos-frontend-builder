import { useQuery } from '@apollo/client/react/hooks';
import {
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { GET_PROJECT } from '../../../../../graphql';
import {
  Member,
  ProjectDetail,
  ProjectDetailVars,
} from '../../../../../models/graphql/user';
import { RootState } from '../../../../../redux/reducers';
import useStyles from './styles';
import TableData from './TableData';

const SentInvitations: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  // for response data
  const [rows, setRows] = useState<Member[]>([]);

  const userData = useSelector((state: RootState) => state.userData);

  const { data } = useQuery<ProjectDetail, ProjectDetailVars>(GET_PROJECT, {
    variables: { projectID: userData.selectedProjectID },
    fetchPolicy: 'cache-and-network',
  });

  let memberList: Member[];
  const users: Member[] = [];
  useEffect(() => {
    memberList = data?.getProject.members ?? [];
    if (memberList) {
      memberList.forEach((member) => {
        if (
          member.invitation === 'Pending' ||
          member.invitation === 'Declined'
        ) {
          users.push(member);
        }
        setRows(users);
      });
    }
  }, [data, userData.selectedProjectID]);

  return (
    <div>
      <TableContainer className={classes.table}>
        <Table>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow key={row.user_uid}>
                <TableData row={row} />
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2}>
                <Typography>
                  {t('settings.teamingTab.invitation.sentInvitation.noInvites')}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default SentInvitations;
