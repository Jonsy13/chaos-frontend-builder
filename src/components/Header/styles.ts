import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  // Styles for Header
  appBar: {
    width: '100%',
    height: '100%',
    background: theme.palette.background.default,
  },

  headerFlex: {
    height: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },

  headerFlexProfile: {
    color: theme.palette.highlight,
    height: '5%',
    fontSize: '2.08rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    marginLeft: theme.spacing(5),
    paddingleft: theme.spacing(5),
  },
  // Notification
  headerFlexPadded: {
    height: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing(1.25),
    marginBottom: theme.spacing(0),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(0),
  },

  headerFlexExtraPadded: {
    height: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(0),
  },

  // Style for ProfileDropdownSection
  buttonPositionExpand: {
    alignContent: 'left',
  },
  projectDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: theme.spacing(3),
  },
  projectDisplay: {
    fontSize: '0.875rem',
    color: theme.palette.text.hint,
  },
  avatar: {
    marginLeft: theme.spacing(4.25),
  },
  // Style for ProfileDropdownSection and ProfileDropdownItems.
  avatarBackground: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
  },

  // Styles for ProfileDropdownItems.
  popover: {
    background: theme.palette.cards.background,
    borderRadius: theme.shape.borderRadius,
    boxShadow: `0 0.25rem 0.25rem ${theme.palette.background.paper}`,
    width: '100%',
    maxWidth: theme.spacing(36.5),
    marginTop: theme.spacing(1.25),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      maxWidth: theme.spacing(36.5),
    },
  },

  popoverProfileAdjust: {
    marginTop: theme.spacing(1.5),
    marginLeft: theme.spacing(-4),
  },

  container: {
    display: 'flex',
    padding: theme.spacing(2),
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'auto',
    maxHeight: theme.spacing(70),
  },

  tabContainerProfileDropdownItem: {
    overflowY: 'auto',
    maxHeight: '21.875rem',
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },

  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  userName: {
    color: theme.palette.highlight,
    fontSize: '0.875rem',
  },

  crownIcon: {
    marginLeft: theme.spacing(-0.5),
    marginRight: theme.spacing(1),
  },

  fullName: {
    marginLeft: theme.spacing(0.5),
  },

  userEmail: {
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    paddingBottom: theme.spacing(1),
  },

  bar: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: theme.spacing(3),
  },

  dividerTop: {
    marginTop: theme.spacing(1),
  },

  // Style for ProjectListItem.
  listItemStyle: {
    height: theme.spacing(7),
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },

  // Styles for NotificationDropdown.
  notifyHeading: {
    marginTop: theme.spacing(4),
    color: theme.palette.secondary.dark,
  },

  tabContainer: {
    overflowY: 'auto',
    maxHeight: '21.875rem',
  },

  popoverPaper: {
    width: '100%',
    maxWidth: '21.875rem',
    marginTop: '1.0625rem',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      maxWidth: '16.875rem',
    },
  },

  dividerMain: {
    background: `${theme.palette.primary.main}33`,
    marginTop: theme.spacing(-1),
  },

  noShadow: {
    boxShadow: 'none !important',
  },

  listItemSpacing: {
    marginTop: theme.spacing(-1.5),
  },

  selectedAvatar: {
    backgroundColor: theme.palette.primary.dark,
    width: '2rem',
    height: '2rem',
  },

  unSelectedAvatar: {
    backgroundColor: theme.palette.primary.dark,
    width: '1.875rem',
    height: '1.875rem',
  },

  selectedIcon: {
    color: theme.palette.text.primary,
    width: '2rem',
    height: '2rem',
  },

  unSelectedIcon: {
    color: 'white',
    backgroundColor: theme.palette.primary.dark,
    marginLeft: '0.125rem',
    marginBottom: '0.125rem',
  },

  projectListText: {
    fontSize: '0.875rem',
  },
  ProjectText: {
    fontSize: '0.875rem',
    color: theme.palette.text.hint,
    fontWeight: 400,
    margin: theme.spacing(4.25, 0, 3, 2.5),
  },
  detailsDiv: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3.75),
  },
  popOverItems: {
    background: theme.palette.cards.background,
    minWidth: '18.4375rem',
    padding: theme.spacing(3.625, 2.875, 4.625, 2.875),
  },
  buttonArea: {
    '& img': {
      marginLeft: theme.spacing(1.875),
    },
  },
  name: {
    marginLeft: theme.spacing(2.5),
    '& p:first-child': {
      fontWeight: 500,
      fontSize: '1rem',
    },
  },
  noProject: {
    marginBottom: theme.spacing(2),
  },
}));

export default useStyles;
