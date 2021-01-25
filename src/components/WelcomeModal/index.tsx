import { Modal } from 'kubera-ui';
import React from 'react';
import ProjectModal from './ProjectModal';
import useStyles from './styles';

interface WelcomemodalProps {
  handleIsOpen: () => void;
}

const Welcomemodal: React.FC<WelcomemodalProps> = ({ handleIsOpen }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function,
  // we roll the style only on the first render

  const handleClose = () => {
    handleIsOpen();
  };

  return (
    <Modal
      open
      onClose={handleClose}
      className={classes.modal}
      width="60%"
      disableBackdropClick
    >
      <ProjectModal handleModal={handleClose} />
    </Modal>
  );
};

export default Welcomemodal;
