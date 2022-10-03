import React from 'react';
import { ReactComponent as CloseIcon } from '../../../images/close.svg';

const CloseButton = ({ closeToast }) => {
  return (
    <CloseIcon 
      className="close-svg" 
      onClick={closeToast}
    />
  )
}

export default CloseButton;
