import { Divider, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { experimentMap, WorkflowData } from '../../../models/redux/workflow';
import useActions from '../../../redux/actions';
import * as WorkflowActions from '../../../redux/actions/workflow';
import { RootState } from '../../../redux/reducers';
import WeightSlider from '../WeightSlider';
import useStyles from './styles';
// import InfoTooltip from '../../../components/InfoTooltip';

const ReliablityScore = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const workflowData: WorkflowData = useSelector(
    (state: RootState) => state.workflowData
  );
  const workflow = useActions(WorkflowActions);

  const { weights } = workflowData;

  // const [open, setOpen] = React.useState(false);

  const testNames: string[] = [];
  const testWeights: number[] = [];
  weights.forEach((weight) => {
    testNames.push(weight.experimentName);
    testWeights.push(weight.weight);
  });

  function handleChange({
    newValue,
    index,
  }: {
    newValue: number;
    index: number;
  }) {
    (weights as any)[index].weight = newValue;
    workflow.setWorkflowDetails({
      weights,
    });
  }

  return (
    <div className={classes.rotButtom}>
      <form className={classes.root}>
        <div className={classes.mainDiv}>
          <div aria-details="content wrapper" style={{ width: '90%' }}>
            <Typography className={classes.headerText}>
              <strong>{t('createWorkflow.reliabilityScore.header')}</strong>
            </Typography>
            <Typography className={classes.description}>
              {t('createWorkflow.reliabilityScore.info')} {weights?.length}{' '}
              {t('createWorkflow.reliabilityScore.infoNext')}{' '}
              <strong>
                {t('createWorkflow.reliabilityScore.infoNextStrong')}
              </strong>
            </Typography>
          </div>
          <Divider variant="middle" className={classes.horizontalLine} />
          <div className={classes.divRow}>
            <Typography className={classes.testHeading}>
              <strong>
                {t('createWorkflow.reliabilityScore.testHeading')}
              </strong>
            </Typography>
          </div>
          {(weights as any).map((Data: experimentMap, index: number) => (
            <div>
              <div>
                <WeightSlider
                  index={index}
                  testName={Data.experimentName}
                  weight={Data.weight}
                  handleChange={(newValue, index) =>
                    handleChange({ newValue, index })
                  }
                />
              </div>
            </div>
          ))}
          {/* <Divider variant="middle" className={classes.horizontalLine} />
          <div className={classes.modalDiv}>
            <div className={classes.divRow}>
              <ButtonOutline
                isDisabled
                handleClick={() => setOpen(true)}
                data-cy="testRunButton"
              >
                <div className={classes.buttonOutlineDiv}>
                  <img src="/icons/video.png" alt="Play icon" />
                  <Typography className={classes.buttonOutlineText}>
                    {t('createWorkflow.reliabilityScore.button.demo')}
                  </Typography>
                </div>
              </ButtonOutline>
               <div className={classes.toolTipDiv}>
                <InfoTooltip value="Text Default" />
                </div> 
              <Unimodal
                open={open}
                handleClose={() => setOpen(false)}
                hasCloseBtn={false}
              >
                <div>
                  <ResultTable testValue={testWeights} testNames={testNames} />
                  <Divider variant="middle" className={classes.horizontalLineResult} />
                  <Center>
                    <ButtonFilled
                      handleClick={() => setOpen(false)}
                      data-cy="gotItButton"
                      isPrimary
                      styles={classes.gotItBtn}
                    >
                      <div>
                        {t('createWorkflow.reliabilityScore.button.gotIt')}
                      </div>
                    </ButtonFilled>
                  </Center>
                </div>
              </Unimodal>
            </div>
            <div>
              <Typography className={classes.testInfo}>
                {t('createWorkflow.reliabilityScore.testInfo')}
              </Typography>
            </div>
          </div> */}
        </div>
      </form>
    </div>
  );
};

export default ReliablityScore;
