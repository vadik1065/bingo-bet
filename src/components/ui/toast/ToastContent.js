import React from 'react';
import { useAtom } from 'jotai';
import { authModal, restoreModal } from '../../../state';
import i18next from "i18next";
import { useHistory } from 'react-router';
import infoIcon from '../../../images/info-red.svg';
import successIcon from '../../../images/done.png';

const ToastContent = ({ message, icon = 'error', description, btn, isEmail, closeToast }) => {
  const history = useHistory();
  const [auth, setAuth] = useAtom(authModal);
  const [restModal, setRestModal] = useAtom(restoreModal);

  const toLogIn = () => {
    setRestModal(false);
    history.push('/register');
    // setAuth({ isOpen: true, type: 'login' });
    closeToast();
  }
  
  return (
    <div className="custom-toast-content flex">
      {icon && 
        <div className="custom-toast-icon">
          <img src={icon === 'error' ? infoIcon : successIcon} alt="toast icon" />
        </div>
      }
      <div className="custom-toast-message-container">
        <div className="custom-toast-message-title">{message}</div>
        {description && <div className="custom-toast-message-description">{description}</div>}
        {isEmail && <a className="custom-toast-message-link" href={`mailto:email@example.com?subject=Subject&body=Body%20goes%20here`}>Open Link</a>}
        {btn === 'login' && 
          <div 
            className="custom-toast-message-link"
            onClick={toLogIn}
          >
            Log In
          </div>
        }
      </div>
      {/* <button onClick={props.closeToast}><Cross /></button> */}
    </div>
  )
}

export default ToastContent;
