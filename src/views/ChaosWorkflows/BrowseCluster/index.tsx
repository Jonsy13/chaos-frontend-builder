import { useMutation, useQuery } from '@apollo/client';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import { DELETE_CLUSTER, GET_CLUSTER } from '../../../graphql';
import {
  Cluster,
  Clusters,
  ClusterVars,
  DeleteCluster,
} from '../../../models/graphql/clusterData';
import { RootState } from '../../../redux/reducers';
import {
  sortAlphaAsc,
  sortAlphaDesc,
  sortNumAsc,
  sortNumDesc,
} from '../../../utils/sort';
import HeaderSection from './HeaderSection';
import useStyles, { StyledTableCell } from './styles';
import TableData from './TableData';

interface FilterOptions {
  search: string;
  status: string;
  cluster: string;
}

interface SortData {
  name: { sort: boolean; ascending: boolean };
  lastRun: { sort: boolean; ascending: boolean };
}

interface DateData {
  dateValue: string;
  fromDate: string;
  toDate: string;
}

interface PaginationData {
  pageNo: number;
  rowsPerPage: number;
}

const BrowseCluster = () => {
  const classes = useStyles();

  const selectedProjectID = useSelector(
    (state: RootState) => state.userData.selectedProjectID
  );

  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    status: 'All',
    cluster: 'All',
  });

  const { data, loading, error } = useQuery<Clusters, ClusterVars>(
    GET_CLUSTER,
    {
      variables: {
        project_id: selectedProjectID,
      },
      fetchPolicy: 'cache-and-network',
      pollInterval: 3000,
    }
  );

  // Apollo mutation to delete the selected Target Cluster
  const [deleteCluster] = useMutation<DeleteCluster>(DELETE_CLUSTER);

  const [dateRange, setDateRange] = React.useState<DateData>({
    dateValue: 'Select a period',
    fromDate: new Date(0).toString(),
    toDate: new Date(new Date().setHours(23, 59, 59)).toString(),
  });

  const [sortData, setSortData] = useState<SortData>({
    name: { sort: false, ascending: true },
    lastRun: { sort: true, ascending: true },
  });

  const filteredData = data?.getCluster
    .filter((dataRow) =>
      dataRow.cluster_name.toLowerCase().includes(filters.search.toLowerCase())
    )
    .filter((dataRow) => {
      if (filters.status === 'All') {
        return true;
      }
      if (
        (dataRow.is_cluster_confirmed as boolean).toString().toLowerCase() ===
        'false'
      ) {
        const p = 'pending';
        return p.includes(filters.status.toLowerCase());
      }
      return (dataRow.is_active as boolean)
        .toString()
        .toLowerCase()
        .includes(filters.status.toLowerCase());
    })
    .filter((dataRow) =>
      filters.cluster === 'All'
        ? true
        : dataRow.cluster_type
            .toLowerCase()
            .includes(filters.cluster.toLowerCase())
    )
    .filter((dataRow) => {
      return dateRange.fromDate && dateRange.toDate === undefined
        ? true
        : parseInt(dataRow.updated_at, 10) * 1000 >=
            new Date(moment(dateRange.fromDate).format()).getTime() &&
            parseInt(dataRow.updated_at, 10) * 1000 <=
              new Date(moment(dateRange.toDate).format()).getTime();
    })
    .sort((a: Cluster, b: Cluster) => {
      // Sorting based on unique fields
      if (sortData.name.sort) {
        const x = a.cluster_name;
        const y = b.cluster_name;

        return sortData.name.ascending
          ? sortAlphaAsc(x, y)
          : sortAlphaDesc(x, y);
      }

      if (sortData.lastRun.sort) {
        const x = parseInt(a.created_at, 10);
        const y = parseInt(b.created_at, 10);

        return sortData.lastRun.ascending
          ? sortNumAsc(y, x)
          : sortNumDesc(y, x);
      }

      return 0;
    });

  const [paginationData, setPaginationData] = useState<PaginationData>({
    pageNo: 0,
    rowsPerPage: 5,
  });

  const [popAnchorEl, setPopAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const isOpen = Boolean(popAnchorEl);

  const [open, setOpen] = React.useState<boolean>(false);

  const handlePopOverClose = () => {
    setPopAnchorEl(null);
    setOpen(false);
  };
  const handlePopOverClick = (event: React.MouseEvent<HTMLElement>) => {
    setPopAnchorEl(event.currentTarget);
    setOpen(true);
  };

  // Functions passed as props in the headerSeaction
  const changeSearch = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFilters({ ...filters, search: event.target.value as string });
  };

  const changeStatus = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    setFilters({ ...filters, status: event.target.value as string });
  };

  const changeCluster = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    setFilters({ ...filters, cluster: event.target.value as string });
  };

  const dateChange = (selectFromDate: string, selectToDate: string) => {
    setDateRange({
      dateValue: `${moment(selectFromDate)
        .format('DD.MM.YYYY')
        .toString()}-${moment(selectToDate).format('DD.MM.YYYY').toString()}`,
      fromDate: new Date(new Date(selectFromDate).setHours(0, 0, 0)).toString(),
      toDate: new Date(new Date(selectToDate).setHours(23, 59, 59)).toString(),
    });
  };
  const { t } = useTranslation();

  const deleteRow = (clid: string) => {
    deleteCluster({
      variables: { cluster_id: clid },
    });
  };

  return (
    <div>
      <section className="Heading section">
        {/* Header Section */}
        <HeaderSection
          searchValue={filters.search}
          changeSearch={changeSearch}
          statusValue={filters.status}
          changeStatus={changeStatus}
          clusterValue={filters.cluster}
          changeCluster={changeCluster}
          popOverClick={handlePopOverClick}
          popOverClose={handlePopOverClose}
          isOpen={isOpen}
          popAnchorEl={popAnchorEl}
          isDateOpen={open}
          displayDate={dateRange.dateValue}
          selectDate={dateChange}
        />
      </section>
      <Paper className={classes.root}>
        <TableContainer className={classes.tableMain}>
          <Table stickyHeader aria-label="simple table">
            <TableHead className={classes.tableHead}>
              <TableRow className={classes.tableRows}>
                {/* Status */}
                <StyledTableCell>
                  <div className={classes.tableCell}>
                    <Typography className={classes.headerStatus}>
                      {t('workflowAgent.header.formControl.tableStatus')}
                    </Typography>
                    <IconButton
                      aria-label="sort in descending order"
                      size="small"
                      onClick={() =>
                        setSortData({
                          ...sortData,
                          lastRun: { sort: true, ascending: false },
                        })
                      }
                    >
                      <div className={classes.sortDiv}>
                        <img
                          src="./icons/arrow_downward.svg"
                          alt="ConnectTarget icon"
                        />
                      </div>
                    </IconButton>
                  </div>
                </StyledTableCell>
                {/* Workflow Name */}
                <StyledTableCell className={classes.workflowCell}>
                  <div className={classes.tableCell}>
                    <Typography className={classes.workflowName}>
                      {t('workflowAgent.header.formControl.tableCluster')}
                    </Typography>
                    <IconButton
                      aria-label="sort in descending"
                      size="small"
                      onClick={() =>
                        setSortData({
                          ...sortData,
                          name: { sort: true, ascending: false },
                        })
                      }
                    >
                      <div className={classes.sortDiv}>
                        <img
                          src="./icons/arrow_downward.svg"
                          alt="ConnectTarget icon"
                        />
                      </div>
                    </IconButton>
                  </div>
                </StyledTableCell>
                {/* Target Cluster */}
                <StyledTableCell>
                  <Typography className={classes.targetCluster}>
                    {t('workflowAgent.header.formControl.connectionDate')}
                  </Typography>
                </StyledTableCell>

                {/* Reliability */}
                <StyledTableCell>
                  <Typography className={classes.headData}>
                    {t('workflowAgent.header.formControl.noWorkflows')}
                  </Typography>
                </StyledTableCell>

                {/* No of Experiments */}
                <StyledTableCell>
                  <div className={classes.tableCell}>
                    <Typography className={classes.headData}>
                      {t('workflowAgent.header.formControl.noSchedules')}
                    </Typography>
                  </div>
                </StyledTableCell>

                {/* Last Run */}
                <StyledTableCell>
                  <div className={classes.tableCell}>
                    <Typography className={classes.headData}>
                      {t('workflowAgent.header.formControl.lastworkflowrun')}
                    </Typography>
                  </div>
                </StyledTableCell>

                {/* Delete Cluster */}
                <StyledTableCell>
                  <div className={classes.tableCell}>
                    <Typography className={classes.headData}>
                      {t('workflowAgent.header.formControl.disconnect')}
                    </Typography>
                  </div>
                </StyledTableCell>
              </TableRow>
            </TableHead>

            {/* Body */}
            <TableBody>
              {loading ? (
                <TableRow>
                  <StyledTableCell colSpan={7}>
                    <Loader />
                  </StyledTableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <StyledTableCell data-cy="browseClusterError" colSpan={7}>
                    <Typography align="center">
                      {t('workflowAgent.header.formControl.fetchingError')}
                    </Typography>
                  </StyledTableCell>
                </TableRow>
              ) : filteredData ? (
                filteredData
                  .slice(
                    paginationData.pageNo * paginationData.rowsPerPage,
                    paginationData.pageNo * paginationData.rowsPerPage +
                      paginationData.rowsPerPage
                  )
                  .map((data: Cluster) => (
                    <TableRow
                      data-cy="browseClusterData"
                      key={data.cluster_id}
                      className={classes.dataRow}
                    >
                      <TableData data={data} deleteRow={deleteRow} />
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <StyledTableCell data-cy="browseClusterNoData" colSpan={0}>
                    <Typography align="center">
                      {t('workflowAgent.header.formControl.recordAvailable')}
                    </Typography>
                  </StyledTableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Section */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData?.length ?? 0}
          rowsPerPage={paginationData.rowsPerPage}
          page={paginationData.pageNo}
          onChangePage={(_, page) =>
            setPaginationData({ ...paginationData, pageNo: page })
          }
          onChangeRowsPerPage={(event) => {
            setPaginationData({
              ...paginationData,
              pageNo: 0,
              rowsPerPage: parseInt(event.target.value, 10),
            });
          }}
          className={classes.pagination}
        />
      </Paper>
    </div>
  );
};

export default BrowseCluster;
