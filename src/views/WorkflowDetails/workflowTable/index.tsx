import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useStyles, { StyledTableCell } from './styles';
import TableData from './TableData';
import { ExecutionData, Node } from '../../../models/graphql/workflowData';
import timeDifference from '../../../utils/datesModifier';

interface NodeTableProps {
  cluster_name: string;
  data: ExecutionData;
}

interface PaginationData {
  pageNo: number;
  rowsPerPage: number;
}

const NodeTable: React.FC<NodeTableProps> = ({ data, cluster_name }) => {
  const classes = useStyles();

  const [paginationData, setPaginationData] = useState<PaginationData>({
    pageNo: 0,
    rowsPerPage: 5,
  });

  const [nodesArray, setNodesArray] = useState<Node[]>([]);

  useEffect(() => {
    let filteredNodes: Node[] = [];
    Object.keys(data.nodes).map((key) => {
      if (data.nodes[key].type !== 'StepGroup') {
        filteredNodes.push(data.nodes[key]);
      }
    });
    setNodesArray([...filteredNodes]);
  }, [data]);

  return (
    <Paper className={classes.root}>
      {/* Description Header */}
      <div className={classes.descHeader}>
        <Typography className={classes.descTextBold}>
          Overall Workflow Description
        </Typography>
        <div className={classes.headerFlex}>
          <div className={classes.headerItemFlex}>
            <Typography className={classes.textBold}>
              Resilinece Score
            </Typography>
            <Typography>100%</Typography>
          </div>
          <div className={classes.headerItemFlex}>
            <Typography className={classes.textBold}>Run Time</Typography>
            <div className={classes.headerFlex}>
              <div className={classes.headerMiniItemFlex}>
                <div className={classes.headerMiniItemText}>Start time:</div>
                <div>{timeDifference(data.startedAt)}</div>
              </div>
              <div className={classes.headerMiniItemFlex}>
                <div className={classes.headerMiniItemText}>End time:</div>
                <div>
                  {data.finishedAt !== ''
                    ? timeDifference(data.finishedAt)
                    : 'Not yet finished'}
                </div>
              </div>
            </div>
          </div>
          <div className={classes.headerItemFlex}>
            <Typography className={classes.textBold}>Hosted On</Typography>
            <div className={classes.headerFlex}>
              <div className={classes.headerMiniItemFlex}>
                <div className={classes.headerMiniItemText}>Cluster:</div>
                <div>{cluster_name}</div>
              </div>
              <div className={classes.headerMiniItemFlex}>
                <div className={classes.headerMiniItemText}>Namespace:</div>
                <div>{data.namespace}</div>
              </div>
            </div>
          </div>
          <div className={classes.headerItemFlex}>
            <Typography className={classes.textBold}>Targets</Typography>
            <div className={classes.headerFlex}>
              <div className={classes.headerMiniItemFlex}>
                <div className={classes.headerMiniItemText}>Cluster:</div>
                <div>{cluster_name}</div>
              </div>
              <div className={classes.headerMiniItemFlex}>
                <div className={classes.headerMiniItemText}>Namespace:</div>
                <div>{data.namespace}</div>
              </div>
              <div className={classes.headerMiniItemFlex}>
                <div className={classes.headerMiniItemText}>Application:</div>
                <div>Application name</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Header */}
      <TableContainer
        data-cy="browseScheduleTable"
        className={classes.tableMain}
      >
        <Table stickyHeader aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow className={classes.tableRows}>
              {/* Step Name */}
              <StyledTableCell>
                <Typography className={classes.regularity}>
                  Step name
                </Typography>
              </StyledTableCell>
              {/* Status*/}
              <StyledTableCell>
                <Typography className={classes.regularity}>Status</Typography>
              </StyledTableCell>
              {/* Duration of Node execution*/}
              <StyledTableCell>
                <Typography className={classes.regularity}>Duration</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography className={classes.regularity}>
                  Start time
                </Typography>
              </StyledTableCell>
              {/* Application Details*/}
              <StyledTableCell>
                <Typography className={classes.regularity}>
                  Application details
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography className={classes.regularity}></Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(nodesArray as Node[])
              .slice(
                paginationData.pageNo * paginationData.rowsPerPage,
                paginationData.pageNo * paginationData.rowsPerPage +
                  paginationData.rowsPerPage
              )
              .map((node: Node) => (
                <TableRow data-cy="browseScheduleData">
                  <TableData data={node} />
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination Section */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={nodesArray.length}
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
  );
};
export default NodeTable;
