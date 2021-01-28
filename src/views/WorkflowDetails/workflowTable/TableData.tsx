import { Button, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import timeDifference from '../../../utils/datesModifier';
import useStyles, { StyledTableCell } from './styles';
import { ExecutionData } from '../../../models/graphql/workflowData';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Modal } from 'kubera-ui';
import NodeLogs from '../NodeLogs';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';
interface TableDataProps {
  data: ExecutionData['nodes'][0];
}

const TableData: React.FC<TableDataProps> = ({ data }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StyledTableCell className={classes.workflowNameData}>
        <Typography>
          <span className={classes.dark}>
            <strong>{data.name}</strong>
          </span>
        </Typography>
      </StyledTableCell>
      <StyledTableCell className={classes.workflowNameData}>
        <div className={classes.status}>
          <span className={classes.icon}>
            <img
              className={
                data.phase.toLowerCase() === 'running'
                  ? classes.runningSmallIcon
                  : ''
              }
              src={`./icons/${data.phase.toLowerCase()}.svg`}
            />
          </span>
          <Typography>
            <span className={classes.dark}>
              <strong>{data.phase}</strong>
            </span>
          </Typography>
        </div>
      </StyledTableCell>
      <StyledTableCell className={classes.workflowNameData}>
        <Typography>
          <span className={classes.dark}>
            <strong>
              {data.finishedAt !== ''
                ? (
                    (parseInt(data.finishedAt, 10) -
                      parseInt(data.startedAt, 10)) /
                    60
                  ).toFixed(1)
                : (
                    (new Date().getTime() / 1000 -
                      parseInt(data.startedAt, 10)) /
                    60
                  ).toFixed(1)}{' '}
              minutes
            </strong>
          </span>
        </Typography>
      </StyledTableCell>
      <StyledTableCell className={classes.workflowNameData}>
        <Typography>
          <span className={classes.dark}>
            <strong>{timeDifference(data.startedAt)}</strong>
          </span>
        </Typography>
      </StyledTableCell>
      <StyledTableCell className={classes.workflowNameData}>
        <Button style={{ textTransform: 'none' }}>
          <div className={classes.applicationDetails}>
            <Typography>
              <span className={classes.dark}>
                <strong>Show properties</strong>
              </span>
            </Typography>
            <KeyboardArrowDownIcon className={classes.arrowMargin} />
          </div>
        </Button>
      </StyledTableCell>
      <StyledTableCell className={classes.workflowNameData}>
        <Button onClick={() => setOpen(true)} style={{ textTransform: 'none' }}>
          <div className={classes.applicationDetails}>
            <img src={'./icons/eye.svg'} />
            <Typography>
              <span className={classes.viewLogs}>
                <strong>View Logs</strong>
              </span>
            </Typography>
          </div>
        </Button>
      </StyledTableCell>
      {/* <Modal>
        <NodeLogs
          logsOpen={open}
          handleClose={handleClose}
          cluster_id={data.cluster_id}
          workflow_run_id={workflow_run_id}
          pod_namespace={pod_namespace}
          pod_name={pod_name}
          pod_type={type}
        />
      </Modal> */}
    </>
  );
};
export default TableData;
