import {
  createStyles,
  makeStyles,
  TableCell,
  Theme,
  withStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  overviewGraphs: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  progressBarSection: {
    display: 'inline-block',
  },

  appBar: {
    background: 'transparent',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: theme.spacing(-10),
    paddingBottom: theme.spacing(3),
  },
  workflowScheduleButton: {
    marginLeft: theme.spacing(2.5),
    marginTop: theme.spacing(5),
  },
  radialChart: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashboard: {
    flexGrow: 1,
    display: 'inline-block',
    marginRight: theme.spacing(2),
    height: '32rem',
    paddingLeft: 0,
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(4),
    fontWeight: 500,
  },
  dashboardContent: {
    display: 'flex',
    justifyContent: 'space-around',
    marginRight: theme.spacing(3),
  },
  weightedHeading: {
    fontWeight: 500,
  },

  workflowStats: {
    background: theme.palette.background.paper,
    width: '30%',
    padding: theme.spacing(1),
    height: '32rem',
    marginRight: theme.spacing(2),
  },
  dataTables: {
    marginTop: theme.spacing(2),
    display: 'flex',
  },
  dataTable: {
    minHeight: '22rem',
    width: '50%',
    marginRight: theme.spacing(2),
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(5),
  },
  tableHeading: {
    display: 'flex',
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(3.5),
    marginBottom: theme.spacing(3.5),
    justifyContent: 'space-between',
  },
  buttonSeeAnalytics: {
    alignContent: 'left',
    transform: 'rotate(-90deg)',
    width: '3rem',
    height: '2rem',
    marginLeft: theme.spacing(-1.5),
  },

  dateText: {
    fontSize: '0.8rem',
    color: theme.palette.text.secondary,
  },

  arrowForwardIcon: {
    color: theme.palette.text.secondary,
    width: '1.75rem',
    height: '1.75rem',
  },

  seeAllBtn: {
    display: 'flex',
    marginTop: theme.spacing(-2),
    '& p': {
      paddingRight: theme.spacing(2),
    },
  },
  seeAnalyticsText: {
    fontSize: '0.8rem',
    color: theme.palette.text.secondary,
  },

  seeAllText: {
    color: theme.palette.highlight,
    fontWeight: 500,
    fontSize: '1rem',
    marginLeft: theme.spacing(-17),
  },
  tableStyling: {
    borderTop: `2px solid ${theme.palette.border.main}`,
    width: '90%',
    margin: '0 auto',
  },
  dataRowName: {
    fontSize: '0.85rem',
    fontWeight: 500,
  },
  noRecordText: {
    justifyContent: 'space-around',
    textAlign: 'center',
    width: '60%',
    opacity: 0.4,
    fontSize: '3rem',
    marginTop: '4rem',
    marginLeft: '20%',
    marginRight: '20%',
    color: theme.palette.text.secondary,
  },
}));

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      borderBottom: `1px solid ${theme.palette.border.main}`,
    },
  })
)(TableCell);

export default useStyles;
