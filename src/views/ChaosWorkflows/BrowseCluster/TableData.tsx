import { IconButton, Tooltip, Typography } from '@material-ui/core';
import { ButtonOutlined, Modal } from 'kubera-ui';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ButtonFilled from '../../../components/Button/ButtonFilled';
import { Cluster } from '../../../models/graphql/clusterData';
import { RootState } from '../../../redux/reducers';
import timeDifferenceForDate from '../../../utils/datesModifier';
import useStyles, { StyledTableCell } from './styles';

interface TableDataProps {
  data: Cluster;
  deleteRow: (clid: string) => void;
}

const TableData: React.FC<TableDataProps> = ({ data, deleteRow }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [clusterName, setClusterName] = React.useState<string>('');

  // Function to convert UNIX time in format of DD MMM YYY
  const formatDate = (date: string) => {
    const updated = new Date(parseInt(date, 10) * 1000).toString();
    const resDate = moment(updated).format('DD MMM YYYY');
    if (date) return resDate;
    return 'Date not available';
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setClusterName(data.cluster_name);
    setOpen(true);
  };
  const userRole = useSelector((state: RootState) => state.userData.userRole);

  const handleClose = () => {
    deleteRow(data.cluster_id);
    setOpen(false);
  };

  return (
    <>
      <StyledTableCell className={classes.tableDataStatus}>
        {data.is_cluster_confirmed === false ? (
          <Typography className={`${classes.check} ${classes.pending}`}>
            {t('workflowAgent.header.formControl.menu6')}
          </Typography>
        ) : data.is_cluster_confirmed === true && data.is_active ? (
          <Typography className={`${classes.check} ${classes.active}`}>
            {t('workflowAgent.header.formControl.menu1')}
          </Typography>
        ) : (
          <Typography className={`${classes.check} ${classes.notactive}`}>
            {t('workflowAgent.header.formControl.menu2')}
          </Typography>
        )}
      </StyledTableCell>
      <StyledTableCell
        key={data.cluster_id}
        onClick={() => {}}
        // /() => { history.push({ pathname: '/agents/cluster', state: { data } });}
        className={classes.workflowNameData}
      >
        <IconButton size="small">
          <Typography className={classes.workflowNameDataColor}>
            {data.cluster_name}
          </Typography>
        </IconButton>
      </StyledTableCell>
      <StyledTableCell className={classes.stepsDataTime}>
        {formatDate(data.updated_at)}
      </StyledTableCell>
      <StyledTableCell>
        <Typography className={classes.stepsData}>
          {data.no_of_workflows}
        </Typography>
      </StyledTableCell>
      <StyledTableCell className={classes.stepsDataschedule}>
        <Typography>{data.no_of_schedules}</Typography>
      </StyledTableCell>
      <StyledTableCell className={classes.stepsData}>
        {data.last_workflow_timestamp === '0' ? (
          <Typography>Not Yet</Typography>
        ) : (
          timeDifferenceForDate(data.last_workflow_timestamp)
        )}
      </StyledTableCell>
      <StyledTableCell className={classes.disconnect}>
        <Tooltip
          classes={{
            tooltip: classes.customTooltip,
          }}
          disableFocusListener
          disableHoverListener={userRole !== 'Viewer'}
          placement="bottom"
          title="Insufficient Permissions"
        >
          <div className={classes.deleteCluster}>
            <div>
              <IconButton
                disabled={userRole === 'Viewer'}
                onClick={handleClick}
              >
                <img alt="delete" src="./icons/ClusterDisconnect.svg" />
              </IconButton>
            </div>
          </div>
        </Tooltip>
        <div>
          {open ? (
            <div>
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                modalActions={
                  <ButtonOutlined
                    className={classes.closeButton}
                    onClick={() => setOpen(false)}
                  >
                    &#x2715;
                  </ButtonOutlined>
                }
              >
                <div className={classes.body}>
                  <img src="./icons/DisconnectIcon.svg" alt="disconnect" />
                  <div className={classes.text}>
                    <Typography className={classes.typo} align="center">
                      {t('targets.modalDelete.head1')} <br />
                      <strong> {t('targets.modalDelete.head2')} </strong>
                      <strong>
                        {clusterName} {t('targets.modalDelete.head4')}
                      </strong>
                    </Typography>
                  </div>
                  <div className={classes.textSecond}>
                    <Typography className={classes.typoSub} align="center">
                      {t('targets.modalDelete.head3')}
                    </Typography>
                  </div>
                  <div className={classes.buttonGroup}>
                    <ButtonOutlined
                      disabled={false}
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <> {t('targets.modalDelete.no')}</>
                    </ButtonOutlined>

                    <ButtonFilled
                      isDisabled={userRole === 'Viewer'}
                      isPrimary={false}
                      isWarning
                      handleClick={handleClose}
                    >
                      <>{t('targets.modalDelete.yes')}</>
                    </ButtonFilled>
                  </div>
                </div>
              </Modal>
            </div>
          ) : null}
        </div>
      </StyledTableCell>
    </>
  );
};
export default TableData;
