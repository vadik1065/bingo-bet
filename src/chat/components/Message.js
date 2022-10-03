import React, { useState, useEffect } from 'react';
// import {ReactComponent as Arrow} from '../icons/down-arrow.svg';
const Message = (props) => {
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    if (popup) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [popup]);

  function handleClickOutside(event) {
    const modal = document.querySelector('.popup-box.open');
    if (!modal.contains(event.target)) {
      setPopup(false);
    }
  }

  function getFormatedText(text) {
    return text.split('\n').map((str, i) => <p key={i}>{str}</p>)
  }

  return (
    <div className={'message-box ' + (props.data.isUser ? 'out' : 'in')}>
      <div className="tail"></div>
      <div className="message-text">
        {props.data.type === 'image' && <img className="message-image" src={props.data.message} alt="message pic" />}
        {props.data.type === 'text' && getFormatedText(props.data.message)}
      </div>
      <div className="message-time">{props.data.time}</div>
      {/*<div onClick={() => setPopup(!popup)} className='message-tick'>
        <Arrow/>
      </div>*/}
      <div className={"popup-box " + (popup ? 'open' : '')}>
        {props.data.isUser && <p>Edit message</p>}
        <p>Reply message</p>
        <p>Delete message</p>
      </div>
    </div>
  )
}

export default Message;
