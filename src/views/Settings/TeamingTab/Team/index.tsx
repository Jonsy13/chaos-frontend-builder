/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { useQuery } from '@apollo/client/react/hooks';
import {
  Box,
  createStyles,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  Theme,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import { Search } from 'kubera-ui';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import config from '../../../../config';
import { GET_PROJECT, GET_PROJECTS } from '../../../../graphql';
import {
  Member,
  Project,
  ProjectDetail,
  ProjectDetailVars,
  Projects,
} from '../../../../models/graphql/user';
import { CurrentUserData, JWTData } from '../../../../models/userData';
import { RootState } from '../../../../redux/reducers';
import getToken from '../../../../utils/getToken';
import { getCoreToken, getUserDetailsFromJwt } from '../../../../utils/user';
import Invitation from '../Invitation';
import InviteNew from '../InviteNew';
import InvitedTableData from './invitedTableData';
import useStyles from './styles';
import TableData from './tableData';

// StyledTableCell used to create custom table cell
const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.disabled,
      borderBottom: `1px solid ${theme.palette.border.main}`,
    },
    body: {
      backgroundColor: theme.palette.background.paper,
      fontSize: '0.875rem',
    },
  })
)(TableCell);

interface FilterOptions {
  search: string;
  role: string;
}

interface PaginationData {
  pageNo: number;
  rowsPerPage: number;
}

interface TabPanelProps {
  index: any;
  value: any;
}
// TabPanel ise used to implement the functioning of tabs
const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};
// tabProps returns 'id' and 'aria-control' props of Tab
function tabProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// TeammingTab displays team member table
const TeamingTab: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const userData = useSelector((state: RootState) => state.userData);
  const [loading, setLoading] = useState(true);

  const userDetails: JWTData = getUserDetailsFromJwt(getToken());

  // for response data
  const [accepted, setAccepted] = useState<Member[]>([]);
  const [notAccepted, setNotAccepted] = useState<Member[]>([]);

  const [allUsers, setAllUsers] = useState<CurrentUserData[]>([]);

  const [activeTab, setActiveTab] = React.useState(0);

  const [activeColor, setActiveColor] = React.useState<string>('#28CB69');

  const handleChange = (event: React.ChangeEvent<{}>, actTab: number) => {
    setActiveTab(actTab);
    setActiveColor('#28CB69');
  };

  const { data, refetch } = useQuery<ProjectDetail, ProjectDetailVars>(
    GET_PROJECT,
    {
      variables: { projectID: userData.selectedProjectID },
      onCompleted: () => {
        const memberList = data?.getProject.members ?? [];
        const acceptedUsers: Member[] = [];
        const notAcceptedUsers: Member[] = [];

        memberList.forEach((member) => {
          if (member.invitation === 'Accepted') {
            acceptedUsers.push(member);
          } else if (
            member.user_uid !== userDetails.uid &&
            member.invitation !== 'Accepted'
          ) {
            notAcceptedUsers.push(member);
          }
        });
        setAccepted([...acceptedUsers]);
        setNotAccepted([...notAcceptedUsers]);

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
            setAllUsers([...res]);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
          });
      },
      fetchPolicy: 'cache-and-network',
    }
  );

  // State for pagination
  const [paginationData, setPaginationData] = useState<PaginationData>({
    pageNo: 0,
    rowsPerPage: 5,
  });

  // States for filters
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    role: 'all',
  });

  // for data filtering based on user role
  const acceptedFilteredData = !loading
    ? accepted &&
      accepted
        .filter((dataRow: Member) => {
          return allUsers
            .filter((data) => {
              return dataRow.user_uid === data.uid;
            })[0]
            .username.toLowerCase()
            .includes(filters.search.toLowerCase());
        })
        .filter((dataRow: Member) => {
          if (filters.role === 'all') return true;
          if (filters.role === 'Editor') return dataRow.role === 'Editor';
          if (filters.role === 'Viewer') return dataRow.role === 'Viewer';
          return dataRow.role === 'Owner';
        })
    : [];

  const notAcceptedFilteredData = !loading
    ? notAccepted &&
      notAccepted
        .filter((dataRow: Member) => {
          return allUsers
            .filter((data) => {
              return dataRow.user_uid === data.uid;
            })[0]
            .username.toLowerCase()
            .includes(filters.search.toLowerCase());
        })
        .filter((dataRow: Member) => {
          if (filters.role === 'all') return true;
          if (filters.role === 'Editor') return dataRow.role === 'Editor';
          if (filters.role === 'Viewer') return dataRow.role === 'Viewer';
          return dataRow.role === 'Owner';
        })
    : [];

  function showModal() {
    refetch();
  }

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
  useEffect(() => {
    let projectOwner = 0;
    let projectInvitation = 0;
    let projectOther = 0;
    projects.map((project) => {
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
      {!loading ? (
        <>
          <div className={classes.row1}>
            <Paper className={classes.projectInfo}>
              <div className={classes.projectInfoProjectStats}>
                <Typography>{projectOtherCount + projectOwnerCount}</Typography>
                {projectOtherCount + projectOwnerCount > 1 ? (
                  <Typography>{t('settings.teamingTab.projects')}</Typography>
                ) : (
                  <Typography>{t('settings.teamingTab.project')}</Typography>
                )}
              </div>
              <div>
                <div className={classes.displayFlex}>
                  <Typography className={classes.projectInfoBoldText}>
                    {projectOwnerCount}
                  </Typography>
                  <Typography>
                    {t('settings.teamingTab.yourProject')}
                  </Typography>
                </div>
                <div className={classes.displayFlex}>
                  <Typography className={classes.projectInfoBoldText}>
                    {projectOtherCount}
                  </Typography>
                  <Typography>
                    {t('settings.teamingTab.projectInvite')}
                  </Typography>
                </div>
              </div>
            </Paper>
            <Paper className={classes.teamInfo}>
              <div className={classes.invitationButton}>
                <div className={classes.invitationButtonFlex}>
                  {t('settings.teamingTab.invitations')}
                  <Typography>{invitationsCount}</Typography>
                </div>
              </div>
              <Typography>{t('settings.teamingTab.manageTeam')}</Typography>
            </Paper>
          </div>
          <div className={classes.UMDiv}>
            <div>
              <Paper className={classes.myProject} elevation={0}>
                <div className={classes.project}>
                  <img src="./icons/chaos-logo.svg" alt="Chaos Logo" />
                  <Typography className={classes.projectName}>
                    {userData.selectedProjectName}
                  </Typography>
                </div>
                <Toolbar data-cy="toolBarComponent" className={classes.toolbar}>
                  {/* Search user */}
                  <div className={classes.toolbarFirstCol}>
                    <Search
                      data-cy="teamingSearch"
                      id="input-with-icon-textfield"
                      placeholder={t('settings.teamingTab.label.search')}
                      value={filters.search}
                      onChange={(e) => {
                        setFilters({
                          ...filters,
                          search: e.target.value,
                        });
                        setPaginationData({ ...paginationData, pageNo: 0 });
                      }}
                    />
                    {/* filter menu */}
                  </div>

                  <div className={classes.buttonDiv}>
                    <div className={classes.filter}>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                        color="secondary"
                        focused
                      >
                        <InputLabel className={classes.selectText}>
                          {t('settings.teamingTab.tableCell.role')}
                        </InputLabel>
                        <Select
                          label={t('settings.teamingTab.label.role')}
                          value={filters.role}
                          onChange={(event) => {
                            setFilters({
                              ...filters,
                              role: event.target.value as string,
                            });
                            setPaginationData({ ...paginationData, pageNo: 0 });
                          }}
                          className={classes.selectText}
                          color="secondary"
                        >
                          <MenuItem value="all">
                            {t('settings.teamingTab.label.options.all')}
                          </MenuItem>
                          <MenuItem value="Editor">
                            {t('settings.teamingTab.label.options.editor')}
                          </MenuItem>
                          <MenuItem value="Viewer">
                            {t('settings.teamingTab.label.options.viewer')}
                          </MenuItem>
                          <MenuItem value="Owner">
                            {t('settings.teamingTab.label.options.owner')}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <InviteNew showModal={showModal} />
                  </div>
                </Toolbar>
                <Tabs
                  value={activeTab}
                  onChange={handleChange}
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: activeColor,
                    },
                  }}
                >
                  <Tab
                    data-cy="membersTab"
                    label={
                      <span
                        className={
                          activeTab === 0 ? classes.active : classes.inActive
                        }
                      >
                        <span className={classes.invitationCount}>
                          {accepted.length}
                        </span>{' '}
                        {accepted.length > 1 ? 'Members' : 'Member'}
                      </span>
                    }
                    {...tabProps(0)}
                  />
                  <Tab
                    data-cy="invitedTab"
                    label={
                      <span
                        className={
                          activeTab === 1 ? classes.active : classes.inActive
                        }
                      >
                        <span className={classes.invitationCount}>
                          {notAccepted.length}
                        </span>{' '}
                        Invited
                      </span>
                    }
                    {...tabProps(1)}
                  />
                </Tabs>
              </Paper>
              <TabPanel value={activeTab} index={0}>
                <Paper className={classes.root}>
                  <TableContainer
                    className={classes.table}
                    elevation={0}
                    component={Paper}
                  >
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead className={classes.TR}>
                        <TableRow className={classes.TR}>
                          <StyledTableCell className={classes.firstTC}>
                            {t('settings.teamingTab.tableCell.name')}
                          </StyledTableCell>
                          <StyledTableCell>
                            {t('settings.teamingTab.tableCell.role')}
                          </StyledTableCell>
                          <StyledTableCell>
                            {t('settings.teamingTab.tableCell.email')}
                          </StyledTableCell>
                          <StyledTableCell>
                            {t('settings.teamingTab.tableCell.joined')}
                          </StyledTableCell>
                          <StyledTableCell />
                          <TableHead />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {acceptedFilteredData.length > 0 ? (
                          acceptedFilteredData
                            .slice(
                              paginationData.pageNo *
                                paginationData.rowsPerPage,
                              paginationData.pageNo *
                                paginationData.rowsPerPage +
                                paginationData.rowsPerPage
                            )
                            .map((row, index) => (
                              <TableRow
                                data-cy="teamingTableRow"
                                key={row.user_uid}
                                className={classes.TR}
                              >
                                <TableData index={index} row={row} />
                              </TableRow>
                            ))
                        ) : (
                          <TableRow>
                            <StyledTableCell
                              colSpan={5}
                              className={classes.styledTC}
                            >
                              <Typography align="center">
                                {t('settings.teamingTab.noUsers')}
                              </Typography>
                            </StyledTableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={acceptedFilteredData?.length ?? 0}
                    rowsPerPage={paginationData.rowsPerPage}
                    page={paginationData.pageNo}
                    onChangePage={(_, page) =>
                      setPaginationData({
                        ...paginationData,
                        pageNo: page,
                      })
                    }
                    onChangeRowsPerPage={(event) =>
                      setPaginationData({
                        ...paginationData,
                        pageNo: 0,
                        rowsPerPage: parseInt(event.target.value, 10),
                      })
                    }
                    className={classes.tablePagination}
                  />
                </Paper>
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
                <Paper className={classes.root}>
                  <TableContainer
                    className={classes.table}
                    elevation={0}
                    component={Paper}
                  >
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead className={classes.TR}>
                        <TableRow className={classes.TR}>
                          <StyledTableCell className={classes.firstTC}>
                            {t('settings.teamingTab.tableCell.name')}
                          </StyledTableCell>
                          <StyledTableCell>
                            {t('settings.teamingTab.tableCell.role')}
                          </StyledTableCell>
                          <StyledTableCell>
                            {t('settings.teamingTab.tableCell.email')}
                          </StyledTableCell>
                          <StyledTableCell>
                            {t('settings.teamingTab.tableCell.status')}
                          </StyledTableCell>
                          <StyledTableCell />
                          <TableHead />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {notAcceptedFilteredData.length > 0 ? (
                          notAcceptedFilteredData
                            .slice(
                              paginationData.pageNo *
                                paginationData.rowsPerPage,
                              paginationData.pageNo *
                                paginationData.rowsPerPage +
                                paginationData.rowsPerPage
                            )
                            .map((row, index) => (
                              <TableRow
                                data-cy="teamingTableRow"
                                key={row.user_uid}
                                className={classes.TR}
                              >
                                <InvitedTableData index={index} row={row} />
                              </TableRow>
                            ))
                        ) : (
                          <TableRow>
                            <StyledTableCell
                              colSpan={5}
                              className={classes.styledTC}
                            >
                              <Typography align="center">
                                {t('settings.teamingTab.noUsers')}
                              </Typography>
                            </StyledTableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={notAcceptedFilteredData?.length ?? 0}
                    rowsPerPage={paginationData.rowsPerPage}
                    page={paginationData.pageNo}
                    onChangePage={(_, page) =>
                      setPaginationData({
                        ...paginationData,
                        pageNo: page,
                      })
                    }
                    onChangeRowsPerPage={(event) =>
                      setPaginationData({
                        ...paginationData,
                        pageNo: 0,
                        rowsPerPage: parseInt(event.target.value, 10),
                      })
                    }
                    className={classes.tablePagination}
                  />
                </Paper>
              </TabPanel>
              {/* user table */}
            </div>
          </div>
          <div>
            <Paper className={classes.invitations}>
              <Typography className={classes.inviteHeading}>
                {t('settings.teamingTab.invitedProject')}
              </Typography>
              <Typography className={classes.inviteText}>
                {t(
                  'settings.teamingTab.invitation.receivedInvitation.receivedHeading'
                )}
              </Typography>
              <Invitation />
            </Paper>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};
export default TeamingTab;
