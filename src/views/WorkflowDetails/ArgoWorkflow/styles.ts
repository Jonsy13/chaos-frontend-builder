import { makeStyles, Theme } from '@material-ui/core/styles';

interface StyleProps {
  horizontal: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  // Graph options
  graphOptions: {
    color: theme.palette.text.primary,
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
  layoutButton: {
    minWidth: 0,
    borderColor: theme.palette.text.disabled,
    marginRight: theme.spacing(2),
    '& svg': {
      fill: theme.palette.text.disabled,
    },
  },

  // Workflow Graph
  dagreGraph: {
    width: '100%',
    height: '90%',
    cursor: 'grab',

    // Styles for nodes
    '& g g.nodes': {
      '& g.node': {
        cursor: 'pointer',
        fill: 'none',
        '& g.label g': {
          transform: (props: StyleProps) =>
            props.horizontal ? 'translate(0, 0)' : 'translate(0, -5px)',
          '& path': {
            fill: theme.palette.text.secondary,
          },
        },
        '& text': {
          fill: theme.palette.text.primary,
        },
      },
      '& path.pendingIcon': {
        transform: (props: StyleProps) =>
          `scale(1.8) translate(-5px, ${props.horizontal ? -5.6 : -2.8}px)`,
      },
      '& path.runningIcon': {
        transformOrigin: '6.05px 6.55px',
        animation: 'runningNodeSpinAnimation 2s ease-in-out infinite',
      },
      '& path.succeededIcon': {
        transform: (props: StyleProps) =>
          `scale(1.8) translate(-5px, ${props.horizontal ? -3.6 : -1}px)`,
      },
      '& path.failedIcon': {
        transform: (props: StyleProps) =>
          `scale(1.5) translate(-5px, ${props.horizontal ? -5.5 : -2.5}px)`,
      },
      '& g.Succeeded': {
        '& circle': {
          fill: theme.palette.status.completed.text,
        },
      },
      '& g.Running': {
        '& circle': {
          fill: '#5252F6',
        },
      },
      '& g.Pending': {
        '& circle': {
          fill: theme.palette.status.pending.text,
        },
      },
      '& g.Failed': {
        '& circle': {
          fill: theme.palette.status.failed.text,
        },
      },
      '& g.StepGroup': {
        fill: theme.palette.status.pending.text,
        cursor: 'default',
        '& rect': {
          x: -1.5,
          y: -1.5,
          width: '0.2rem',
          height: '0.2rem',
          rx: '0.625rem !important',
          ry: '0.625rem !important',
        },
      },
      '& g.StepGroup.Succeeded': {
        fill: theme.palette.status.completed.text,
      },
      '& g.StepGroup.Running': {
        fill: theme.palette.status.running.text,
      },
      '& g.StepGroup.Pending': {
        fill: theme.palette.status.pending.text,
      },
      '& g.StepGroup.Failed': {
        fill: theme.palette.status.failed.text,
      },
    },

    // Styles for edges
    '& g g.edgePaths': {
      '& g.Succeeded': {
        fill: theme.palette.status.completed.text,
        stroke: theme.palette.status.completed.text,
      },
      '& g.Running': {
        fill: theme.palette.status.running.text,
        stroke: theme.palette.status.running.text,
      },
      '& g.Pending': {
        fill: theme.palette.status.pending.text,
        stroke: theme.palette.status.pending.text,
      },
      '& g.Failed': {
        fill: theme.palette.status.failed.text,
        stroke: theme.palette.status.failed.text,
      },
    },
  },
  '@global': {
    '@keyframes runningNodeSpinAnimation': {
      from: {
        transform: (props: StyleProps) =>
          `scale(1.5) translate(-4px, ${
            props.horizontal ? -4.3 : -1
          }px) rotate(0deg)`,
      },
      to: {
        transform: (props: StyleProps) =>
          `scale(1.5) translate(-4px, ${
            props.horizontal ? -4.3 : -1
          }px) rotate(360deg)`,
      },
    },
  },
}));

export default useStyles;