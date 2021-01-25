import { useMutation } from '@apollo/client/react/hooks';
import { InputField } from 'kubera-ui';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CREATE_PROJECT } from '../../graphql';
import useActions from '../../redux/actions';
import * as UserActions from '../../redux/actions/user';
import { RootState } from '../../redux/reducers';
import { validateStartEmptySpacing } from '../../utils/validate';
import ButtonFilled from '../Button/ButtonFilled';
import ModalPage from './Modalpage';

interface ProjectModalProps {
  handleModal: () => void;
}
const ProjectModal: React.FC<ProjectModalProps> = ({ handleModal }) => {
  const { t } = useTranslation();

  const userData = useSelector((state: RootState) => state.userData);
  const userLoader = useActions(UserActions);
  const isError = useRef(true);

  const [projectName, setProjectName] = React.useState<string>('');

  const rerender = () => {
    window.location.reload();
  };

  const [CreateProject] = useMutation(CREATE_PROJECT, {
    onCompleted: () => {
      rerender();
    },
  });

  // Submit entered data to /update endpoint
  const handleSubmit = () => {
    userLoader.updateUserDetails({ loader: true });
    try {
      CreateProject({
        variables: {
          project: projectName,
        },
      });
    } catch (e) {
      console.error(e);
    }
    handleModal();
  };

  const setData = (key: string, value: string) => {
    setProjectName(value);
  };

  // Submit on Enter Key-press
  const keyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isError.current === false) {
      handleSubmit();
    }
  };

  return (
    <ModalPage
      renderMenu={
        <div>
          <div data-cy="InputProjectName">
            <InputField
              label={t('welcomeModal.case-0.label')}
              value={projectName}
              required
              helperText={
                validateStartEmptySpacing(projectName)
                  ? 'Should not start with an empty space'
                  : ''
              }
              variant={
                validateStartEmptySpacing(projectName) ? 'error' : 'primary'
              }
              type="text"
              onChange={(event) => {
                setData('project_name', event.target.value);
                if (
                  event.target.value.length > 0 &&
                  validateStartEmptySpacing(event.target.value) === false
                ) {
                  isError.current = false;
                } else {
                  isError.current = true;
                }
              }}
              onKeyPress={keyPress}
            />
          </div>
          <br />
          <div data-cy="startButton">
            <ButtonFilled
              isPrimary
              isDisabled={
                projectName === '' || validateStartEmptySpacing(projectName)
              }
              handleClick={handleSubmit}
              data-cy="Start"
            >
              <div>{t('welcomeModal.button.letsStart')}</div>
            </ButtonFilled>
          </div>
        </div>
      }
      setName={
        userData.username === 'admin' ? 'Administrator' : userData.username
      }
      setText={t('welcomeModal.case-0.info')}
    />
  );
};

export default ProjectModal;
