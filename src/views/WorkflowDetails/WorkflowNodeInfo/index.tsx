/* eslint-disable */
import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import timeDifference from '../../../utils/datesModifier';
import NodeLogs from '../NodeLogs';
import useStyles from './styles';
import trimstring from '../../../utils/trim';

interface WorkflowNodeInfoProps {
  workflow_name: string;
  cluster_id: string;
  workflow_run_id: string;
  pod_namespace: string;
}

const WorkflowNodeInfo: React.FC<WorkflowNodeInfoProps> = ({
  workflow_name,
  cluster_id,
  workflow_run_id,
  pod_namespace,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [logsOpen, setLogsOpen] = useState<boolean>(false);

  // Get the nelected node from redux
  const { name, phase, pod_name, type, startedAt, finishedAt } = useSelector(
    (state: RootState) => state.selectedNode
  );

  const handleClose = () => {
    setLogsOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.nodeDetails}>
        {/* Node Durations */}
        <div className={classes.nodeSpacing}>
          <Typography className={classes.textMargin}>
            <span className={classes.bold}>
              {t('workflowDetailsView.workflowInfo.header')}:
            </span>
          </Typography>
          <div className={classes.heightMaintainer}>
            <Typography className={classes.textMargin}>
              {trimstring(workflow_name, 40)}
            </Typography>
            <Typography className={classes.textMargin}>{phase}</Typography>
          </div>
          <hr />
          <div className={classes.heightMaintainer}>
            <div>
              <Typography className={classes.textMargin}>
                <span className={classes.bold}>
                  {t('workflowDetailsView.workflowNodeInfo.startTime')}:
                </span>
                &nbsp;&nbsp;&nbsp;
                {timeDifference(startedAt)}
              </Typography>
              <Typography className={classes.textMargin}>
                <span className={classes.bold}>
                  {t('workflowDetailsView.workflowNodeInfo.duration')}:{' '}
                </span>
                &nbsp;&nbsp;&nbsp;
                {finishedAt !== ''
                  ? (
                      (parseInt(finishedAt, 10) - parseInt(startedAt, 10)) /
                      60
                    ).toFixed(1)
                  : (
                      (new Date().getTime() / 1000 - parseInt(startedAt, 10)) /
                      60
                    ).toFixed(1)}{' '}
                minutes
              </Typography>
            </div>
            <Typography className={classes.textMargin}>
              <span className={classes.bold}>
                {t('workflowDetailsView.workflowNodeInfo.endTime')}:
              </span>
              &nbsp;&nbsp;&nbsp;
              {finishedAt !== ''
                ? timeDifference(finishedAt)
                : 'Not yet finished'}
            </Typography>
          </div>
          <hr />
        </div>
        <NodeLogs
          logsOpen={true}
          handleClose={handleClose}
          cluster_id={cluster_id}
          workflow_run_id={workflow_run_id}
          pod_namespace={pod_namespace}
          pod_name={pod_name}
          pod_type={type}
        />
      </div>

      {/* Node Type */}
      {/* <div className={classes.heightMaintainer}>
        <Typography className={classes.nodeSpacing}>
          <span className={classes.bold}>
            {t('workflowDetailsView.workflowNodeInfo.type')}:
          </span>{' '}
          {type}
        </Typography>
      </div>
      <hr /> */}

      {/* Node Phase */}
      {/* <div className={classes.nodeSpacing}>
        <div className={classes.heightMaintainer}>
          <Typography>
            <span className={classes.bold}>
              {t('workflowDetailsView.workflowNodeInfo.phase')}:
            </span>{' '}
            {phase}
          </Typography>
        </div>
      </div>
      <hr /> */}

      {/* Step Name */}
      {/* <div className={classes.nodeSpacing}>
        <div className={classes.heightMaintainer}>
          <Typography>
            <span className={classes.bold}>
              {t('workflowDetailsView.workflowNodeInfo.stepName')}:
            </span>{' '}
            {name}
          </Typography>
        </div>
      </div>
      <div className={classes.footerButton}>
        <ButtonOutlined disabled={false} onClick={() => setLogsOpen(true)}>
          {t('workflowDetailsView.workflowNodeInfo.button.logs')}
        </ButtonOutlined>
    </div> */}
    </div>
  );
};

export default WorkflowNodeInfo;
