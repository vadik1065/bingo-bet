import React,{useState, useRef, useEffect} from 'react';
import './css/chat.css';
import useSound from 'use-sound';
import sfx from './sounds/message.mp3';
import ChatInput from './components/Input.js';
import Message from './components/Message.js';
import Unlogged from './components/Unlogged.js';
import { ReactComponent as CloseLogo } from './icons/cancel.svg';
import { ReactComponent as ChatHidden } from './icons/conversation.svg';
import moment from 'moment';
import i18next from "i18next";
import * as functions from './functions';

const Chat = (props) => {
  const messagesEndRef = useRef(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  const [started, setStarted] = useState(false);
  const [chatId, setChatId] = useState(0);
  const [userName, setUserName] = useState('');
  const [messages, setMessages] = useState([]);
  const [playOn] = useSound(sfx,{ volume: 0.5 });
  const [files, setFiles] = useState([]);

  function scrollToBottom(){
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    if (props.name !== undefined) {
      setUserName(props.name);
    }
  },[props.name]);

  /*user greeting*/
  /*eslint-disable*/
  useEffect(() => {
    if (started === true) {
      if (props.name !== undefined) {
        loggedStart(props.token)
      }
    }
  },[started]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
      const interval = setInterval(() => {
        getMessages(chatId, props.token);
      }, 30000);
      return () => clearInterval(interval);
    }
    // let timerId = setInterval(doAgain, 3000);
  }, [messages]);

  useEffect(() => {
    setNewMessage(false);
    if (!chatOpen) {
      setFiles([]);
    }
  }, [chatOpen]);

  /*eslint-enable*/
  function addMine(text, type) {
    setMessages([...messages, {
      isUser: true,
      message: text,
      type: type,
      time: moment(Date.now()).local().format('HH:mm')
    }]);
    scrollToBottom();
    // playOn();
    sendMessage(chatId, text, props.name !== undefined, props.token, type);
  }

  function unloggedStart(name) {
      playOn();
      getChatId(name);
  }

  function loggedStart(token) {
    playOn();
    functions.getChatIdAuth(token)
      .then(res => {
        setChatId(res.data.data.chat_id);
        getMessages(res.data.data.chat_id, props.token);
      });
  }

  function getChatId(name) {
    functions.getChatId(name)
      .then(res => {
        setChatId(res.data.data.chat_id);
        getMessages(res.data.data.chat_id, props.token);
      });
  }

  function getMessages(id, boo) {
    functions.getMessages(id, boo)
    .then(res => {
      if (res.data.data !== null) {
        let msgs = res.data.data[0].messages.map(el => {
          if (el.in === 0) {
            let stillUtc = moment.unix(el.time).toDate();
            return {
              isUser: true,
              message: el.text,
              type: el.typ === 1 ? 'image' : 'text',
              time: moment(stillUtc).local().format('HH:mm')
            }
          } else {
            let stillUtc = moment.unix(el.time).toDate();
            return {
              isUser: false,
              message: el.text,
              type: el.typ === 1 ? 'image' : 'text',
              time: moment(stillUtc).local().format('HH:mm')
            }
          }
        });
        if (msgs.length > messages.length) {
          playOn();
          setNewMessage(true)
        }
        setMessages([...msgs]);

      }
    });
  }

  function sendMessage(chatId, message, boo, token, type) {
    functions.sendMessage(chatId, message, boo, token, type).then(() => getMessages(chatId, props.token))
  }

  return (
    <div className={`chat-global ${chatOpen ? 'chat-global-open' : 'chat-global-closed'}`}>
      <div className={"chat-window " + (chatOpen ? '' : 'closed')}>
        <div className='chat-header'>
           {userName !== '' && props.name === undefined && <p>{i18next.t("Welcome")}, {userName}!</p>}
           {props.name !== undefined && <p>{i18next.t("Welcome back")}, {userName}!</p>}
           {userName === '' && <p>{i18next.t("Chat support")}</p>}
          <div onClick={() => setChatOpen(!chatOpen)} className="close">
            <CloseLogo/>
          </div>
        </div>
        {/*logged user*/}
        {userName !== '' &&
          <div
            className={`chat-body ${files.length > 0 ? 'small' : ''}`}>
            {[{
              isUser: false,
              message: i18next.t('Hello! Is there anything we can do for you?'),
              type: 'text',
              time: moment(Date.now()).local().format('HH:mm')
            }].map((el,i) => {
              return (
                <Message key={i} data={el}/>
              )
            })}
            {
              messages.map((el,i) => {
                return (
                  <Message key={i} data={el}/>
                )
              })
            }
            <div ref={messagesEndRef} />
          </div>
        }

        {userName !== '' && 
          <ChatInput 
            addMine={addMine}
            setFiles={setFiles}
            files={files}
            chatOpen={chatOpen}
          />
        }

        {props.token === null && userName === '' && <Unlogged unloggedStart={unloggedStart} setUserName={setUserName}/>}
      </div>

      <div 
        onClick={() => {setChatOpen(!chatOpen);setStarted(true)}} 
        className={'chat-hidden ' + (chatOpen ? '' : 'active') + (newMessage === true ? ' new-message' : '')}
      >
        <ChatHidden/>
      </div>
    </div>
  )
}

export default Chat;
