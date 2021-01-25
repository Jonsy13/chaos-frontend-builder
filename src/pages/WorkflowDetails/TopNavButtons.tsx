import React from 'react';
import { useSelector } from 'react-redux';
import { ButtonOutlined } from 'kubera-ui';
import BackButton from '../../components/Button/BackButton';
import ButtonFilled from '../../components/Button/ButtonFilled';
import useActions from '../../redux/actions';
import * as ToggleButtonAction from '../../redux/actions/button';
import { RootState } from '../../redux/reducers';
import useStyles from './styles';

const TopNavButtons: React.FC = () => {
  const classes = useStyles();

  const isInfoToggled = useSelector(
    (state: RootState) => state.toggleInfoButton.isInfoToggled
  );
  const toggleButtonAction = useActions(ToggleButtonAction);

  return (
    <div className={classes.button}>
      <div>
        <BackButton isDisabled={false} />
      </div>
      <div>
        {isInfoToggled ? (
          <ButtonFilled
            styles={{ height: '2.2rem' }}
            isPrimary
            handleClick={() =>
              toggleButtonAction.toggleInfoButton({
                isInfoToggled: false,
              })
            }
          >
            <img
              src="./icons/alignment.svg"
              alt="Info Icon"
              className={classes.icon}
            />
            Info
          </ButtonFilled>
        ) : (
          <ButtonOutlined
            className={classes.btnOutline}
            disabled={false}
            onClick={() =>
              toggleButtonAction.toggleInfoButton({
                isInfoToggled: true,
              })
            }
          >
            <img
              src="./icons/alignment.svg"
              alt="Info Icon"
              className={classes.icon}
            />
            Info
          </ButtonOutlined>
        )}
      </div>
    </div>
  );
};

export default TopNavButtons;
