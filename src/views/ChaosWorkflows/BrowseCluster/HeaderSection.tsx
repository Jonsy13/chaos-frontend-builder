import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Popover,
  Select,
  Typography,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useTranslation } from 'react-i18next';
import useStyles, { useOutlinedInputStyles } from './styles';

interface HeaderSectionProps {
  searchValue: string;
  statusValue: string;
  clusterValue: string;
  isOpen: boolean;
  isDateOpen: boolean;
  popAnchorEl: HTMLElement | null;
  displayDate: string;
  changeSearch: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  changeStatus: (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) => void;
  changeCluster: (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) => void;
  popOverClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  popOverClose: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  selectDate: (selectFromDate: string, selectToDate: string) => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  searchValue,
  statusValue,
  clusterValue,
  isOpen,
  popAnchorEl,
  displayDate,
  changeSearch,
  changeStatus,
  changeCluster,
  popOverClick,
  popOverClose,
  selectDate,
}) => {
  const classes = useStyles();
  const { palette } = useTheme();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const { t } = useTranslation();
  const outlinedInputClasses = useOutlinedInputStyles();

  return (
    <div>
      <div className={classes.headerSection}>
        {/* Search Field */}
        <InputBase
          id="input-with-icon-adornment"
          placeholder="Search"
          className={classes.search}
          value={searchValue}
          classes={{
            input: classes.input,
          }}
          onChange={changeSearch}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />

        {/* Select Workflow */}
        <FormControl
          variant="outlined"
          className={classes.formControl}
          color="secondary"
        >
          <InputLabel className={classes.selectText}>
            {t('workflowAgent.header.status')}
          </InputLabel>
          <Select
            value={statusValue}
            onChange={changeStatus}
            label="Cluster Status"
            className={classes.selectText}
            input={<OutlinedInput classes={outlinedInputClasses} />}
          >
            <MenuItem value="All">
              {t('workflowAgent.header.formControl.menu')}
            </MenuItem>
            <MenuItem value="true">
              {t('workflowAgent.header.formControl.menu1')}
            </MenuItem>
            <MenuItem value="false">
              {t('workflowAgent.header.formControl.menu2')}
            </MenuItem>
            <MenuItem value="pending">
              {t('workflowAgent.header.formControl.menu6')}
            </MenuItem>
          </Select>
        </FormControl>

        {/* Select Cluster */}
        <FormControl
          variant="outlined"
          className={classes.formControl}
          color="secondary"
        >
          <InputLabel className={classes.selectText}>
            {t('workflowAgent.header.target')}
          </InputLabel>
          <Select
            value={clusterValue}
            onChange={changeCluster}
            label="Target Cluster"
            className={classes.selectText}
            input={<OutlinedInput classes={outlinedInputClasses} />}
          >
            <MenuItem value="All">
              {t('workflowAgent.header.formControl.menu')}
            </MenuItem>
            <MenuItem value="Internal">
              {t('workflowAgent.header.formControl.menu4')}
            </MenuItem>
            <MenuItem value="External">
              {t('workflowAgent.header.formControl.menu5')}
            </MenuItem>
          </Select>
        </FormControl>

        <Button className={classes.selectDate} onClick={popOverClick}>
          <Typography className={classes.displayDate}>
            {displayDate}
            <IconButton className={classes.iconButton}>
              {isOpen ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Typography>
        </Button>
        <Popover
          open={isOpen}
          anchorEl={popAnchorEl}
          onClose={popOverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          className={classes.popOver}
        >
          <DateRangePicker
            onChange={(item) => {
              setState([(item as any).selection]);
              selectDate(
                `${(item as any).selection.startDate}`,
                `${(item as any).selection.endDate}`
              );
            }}
            showSelectionPreview
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={state}
            direction="vertical"
            editableDateInputs
            rangeColors={[palette.secondary.dark]}
            showMonthAndYearPickers
          />
        </Popover>
      </div>
    </div>
  );
};
export default HeaderSection;
