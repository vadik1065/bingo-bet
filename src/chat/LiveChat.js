import React, { useEffect, useRef, useState } from 'react';
import { IonSpinner } from '@ionic/react';
import moment from 'moment';
import i18next from "i18next";
import Emoji from './components/Emoji';
import Giphy from './components/Giphy';
import LiveMessage from './components/LiveMessage';
import { useAtom } from 'jotai';
import { gl_notifications, liveChat, liveChatRulesModal, liveChatToMessageId, unreadLiveMessagesCount } from '../state';
import { getLiveMessages, presenceChannel, sendLiveMessage } from './functions';
import Pusher from 'pusher-js';
import { ReactComponent as Live } from '../images/live-chat/live.svg';
import { ReactComponent as Info } from '../images/live-chat/info.svg';
import { ReactComponent as Cross } from '../images/cross.svg';
import { ReactComponent as Smile } from '../images/live-chat/smile.svg';
import { ReactComponent as Gif } from '../images/live-chat/gif.svg';
import { ReactComponent as Reply } from '../images/live-chat/reply.svg';
import { ReactComponent as Arrow } from '../images/live-chat/arrow-down.svg';
import { ReactComponent as Send } from './icons/send-message.svg';
import bg from '../images/unknown.png';
import catBlack from '../images/cat-black.png';
import catWhite from '../images/cat-white.png';
import Mentions from 'rc-mentions';

const { Option } = Mentions;

// const MIN_TEXTAREA_HEIGHT = 50;

const ReplyInFooter = ({ reply, setReply }) => {
  const replyContainerClassName = () => {
    let show = '';
    if (reply?.id) {
      show = reply?.type === 'text' ? 'show' : 'show-big';
    }
    return `live-chat-reply-container flex ${show}`;
  } 

  return (
    <div className={replyContainerClassName()}>
      <Reply className="reply-icon" />
      <div className="live-chat-reply">
        <div className="reply-name">{reply?.username}</div>
        <div className="reply-message">
          {reply?.type === 'text' 
            ?
            reply?.text
            :
            <div className="reply-message-gif-container">
              {reply?.text && <img src={reply.text} alt="gif" />}
            </div>
          }
        </div>
      </div>
      <div 
        className="absolute-close-modal flex"
        onClick={() => setReply({})}
      >
        <Cross />
      </div>
    </div>
  )
}

const NoOptionContent = ({ color }) => {
  return (
    <div 
      className="live-chat-tag-item no-option flex"
    >
      <div className="no-option-pic">
        <img src={color ? catBlack : catWhite} alt="cat" />
      </div>
      <div className="live-chat-tag-username">
        {i18next.t('No Result Found')}
      </div>
    </div>
  )
}

const LiveChat = ({ token, color, width, user_id, pusher, getPusher }) => {
  const [isChatOpen, setChatOpen] = useAtom(liveChat);
  const [isFirstLaunch, setFirstLaunch] = useState(true);
  const [isChatWillClose, setChatWillClose] = useState(true);
  const [membersCount, setMembersCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [unreadMessagesCount, setUnreadMessagesCount] = useAtom(unreadLiveMessagesCount);
  const [notifications, setNotifications] = useAtom(gl_notifications);
  const textareaRef = useRef(null);
  const [textareaValue, setTextareaValue] = useState('');
  const [reply, setReply] = useState({});
  const [isShowEmoji, setShowEmoji] = useState(false);
  const [isShowGiphy, setShowGiphy] = useState(false);
  const messagesEndRef = useRef(null);
  const toBottomCountRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [rulesModal, setRulesModal] = useAtom(liveChatRulesModal);
  const [replyMessageParent, setReplyMessageParent] = useAtom(liveChatToMessageId);
  const [isShowTagUser, setShowTagUser] = useState(false);
  const [members, setMembers] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const chatOpenRef = useRef(null);

  // useEffect(() => {
  //   if (token) {
  //     setPusher(new Pusher('1234567', {
  //       cluster: 'mt1',
  //       wsHost: 'admin.bingo.bet',
  //       authEndpoint: 'https://admin.bingo.bet/api/broadcasting/auth',
  //       auth: {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         },
  //       },
  //       wsPort: 6001,
  //       wssPort: 6001,
  //       enabledTransports: ['ws', 'wss'],
  //       // forceTLS: true
  //     }));
  //   }
  // }, [token]);

  // useEffect(() => {
  //   if (!isChatWillClose) {
  //     // getMessages(true);
  //     getMessages();
  //     if (pusher) {
  //       connectToChannel();
  //     }
  //   } 
  //   if (isChatWillClose) {
  //     setUnreadMessagesCount(0);
  //     if (pusher) {
  //       disconnectFromChannel(); 
  //     }
  //   }
  // }, [isChatWillClose, pusher]);

  // useEffect(() => {
  //   console.log(pusher);
  //   console.log(token);
  //   if (pusher && token) {
  //     getMessages();
  //     connectToChannel();
  //   }
  // }, [pusher, token]);

  useEffect(() => {
    if (token) {
      getPusher(token);
    }
  }, [token]);

  useEffect(() => {
    if (pusher && user_id) {
      getMessages();
      connectToChannel();
    }
  }, [pusher, user_id]);

  useEffect(() => {
    chatOpenRef.current = isChatOpen;

    if (isChatOpen && isFirstLaunch) {
      scrollToBottom();
      setFirstLaunch(false);
    }
    if (!isChatOpen) {
      setUnreadMessagesCount(0);
      closeChat();
    }
  }, [isChatOpen]);

  // useEffect(() => {
  //   if (isChatOpen) {
  //     getMessages();
  //     if (pusher) {
  //       connectToChannel();
  //     }
  //   } 
  //   if (!isChatOpen) {
  //     setUnreadMessagesCount(0);
  //     closeChat();
  //     // if (pusher) {
  //     //   disconnectFromChannel(); 
  //     // }
  //   }
  // }, [isChatOpen, pusher]);

  // useEffect(() => {
  //   if (!textareaValue.includes('@')) {
  //     setShowTagUser(false);
  //   }



  //   // if (textareaValue.includes('@')) {
  //   //   setShowTagUser(true);
  //   // } else {
  //   //   setShowTagUser(false);
  //   // }
  // }, [textareaValue]);

  // useEffect(() => {
  //   if (toMessage) {
  //     setReplyMessageParent(toMessage);
  //   }
  // }, [toMessage]);

  useEffect(() => {
    if (replyMessageParent) {
      const msg = document.getElementById(replyMessageParent);
      if (msg) {
        msg?.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => setReplyMessageParent(''), 1500);
      }
    }
  }, [replyMessageParent]);

  const connectToChannel = () => {
    const channel = pusher.subscribe(presenceChannel);
    channel.bind("pusher:subscription_succeeded", (data) => {
      setMembersCount(data.count);
      const membs = Object.values(data.members).filter(m => m.id !== user_id);
      // console.log(membs);
      setMembers(membs);
      // setMembers(Object.values(data.members));
      // const temp = [
      //   {
      //     "id": 1,
      //     "name": "lusr4",
      //     "avatar": "https://admin.bingo.bet/images/avatars/4_31f32353043f249e.jpeg"
      //   },
      //   {
      //     "id": 2,
      //     "name": "sdfsd",
      //     "avatar": "https://admin.bingo.bet/images/avatars/5_b6b64e938c1990a6.jpeg"
      //   },
      //   {
      //     "id": 3,
      //     "name": "bvcbv hbc",
      //     "avatar": "https://admin.bingo.bet/images/avatars/5_b6b64e938c1990a6.jpeg"
      //   },
      //   {
      //     "id": 4,
      //     "name": "erterh f",
      //     "avatar": "https://admin.bingo.bet/images/avatars/5_b6b64e938c1990a6.jpeg"
      //   },
      //   {
      //     "id": 5,
      //     "name": "23fr",
      //     "avatar": "https://admin.bingo.bet/images/avatars/5_b6b64e938c1990a6.jpeg"
      //   },
      //   {
      //     "id": 6,
      //     "name": "fdg",
      //     "avatar": "https://admin.bingo.bet/images/avatars/5_b6b64e938c1990a6.jpeg"
      //   },
      //   {
      //     "id": 7,
      //     "name": "lusr5",
      //     "avatar": "https://admin.bingo.bet/images/avatars/5_b6b64e938c1990a6.jpeg"
      //   },
      //   {
      //     "id": 8,
      //     "name": "fgeglusr5",
      //     "avatar": "https://admin.bingo.bet/images/avatars/5_b6b64e938c1990a6.jpeg"
      //   },
      //   {
      //     "id": 9,
      //     "name": "45",
      //     "avatar": "https://admin.bingo.bet/images/avatars/5_b6b64e938c1990a6.jpeg"
      //   },
      //   {
      //     "id": 10,
      //     "name": "fhjhfj hjh kkjjlkjkl",
      //     "avatar": "https://admin.bingo.bet/images/avatars/5_b6b64e938c1990a6.jpeg"
      //   }
      // ]
      // setMembers(temp);
    });

    channel.bind("pusher:member_added", (member) => {
      setMembersCount(prevCount => prevCount + 1);
      setMembers(prev => {
        if (prev.some(prevMember => prevMember.id === member.id)) {
          return prev;
        } else {
          return [...prev, member.info];
        }
      });
    });

    channel.bind("pusher:member_removed", (member) => {
      setMembersCount(prevCount => prevCount - 1);
      setMembers(prev => prev.filter(prevMember => prevMember.id !== +member.id));
    });

    channel.bind("App\\Events\\LiveChatMessage", (data) => {
      // console.log(data);
      if (data.type === 'message') {
        const msg = {
          ...data.message,
          time: data.message.time !== null ? moment.utc(data.message.time, 'YYYY-MM-DD HH:mm:ss').local().format('HH:mm DD.MM') : ''
        }
        setMessages(prev => [...prev, msg]);

        if (!chatOpenRef.current && JSON.parse(msg.recipients)?.find(rec => rec.user_id === user_id)) {
          const not = {
            ...msg,
            notification_type: 'chat', // позже еще будет giveaway
            isread: JSON.parse(msg.recipients)?.find(rec => rec.user_id === user_id).isread,
          };

          setNotifications(prev => [not, ...prev]);
        }

        if (msg.user_id === user_id) {
          scrollToBottom();
        } else {
          setUnreadMessagesCount(prevCount => prevCount + 1);
        }
      }

      if (data.type === 'like') {
        if (data.message.user_id_like !== data.message.user_id) {
          setMessages(prev => {
            const objIndex = prev.findIndex(m => m.id === data.message.id);
            // console.log(prev[objIndex]);
            const updatedObj = { 
              ...data.message,
              time: data.message.time !== null ? moment.utc(data.message.time, 'YYYY-MM-DD HH:mm:ss').local().format('HH:mm DD.MM') : '',
              player_like: data.message.user_id_like === user_id ? data.message.player_like : prev[objIndex].player_like
            };
  
            const newMessages = [
              ...prev.slice(0, objIndex),
              updatedObj,
              ...prev.slice(objIndex + 1),
            ];
  
            return newMessages;
          });
        }

        if (!chatOpenRef.current && data.message.user_id === user_id && data.message.user_id_like !== user_id && data.message.islike === 1 && data.message.likes > 0) {
          const notice = {
            ...data.message,
            notification_type: 'chat', // позже еще будет giveaway
            isread: 0,
            time: data.message.created_at_like ? moment.utc(data.message.created_at_like, 'YYYY-MM-DD HH:mm:ss').local().format('HH:mm DD.MM') : data.message.time,
          };
          setNotifications(prev => {
            if (prev.find(p => p.id === notice.id)) {
              if (notice.likes === 2) {
                const objIndex = prev.findIndex(m => m.id === data.message.id);
                const newMessages = [
                  ...prev.slice(0, objIndex),
                  notice,
                  ...prev.slice(objIndex + 1),
                ];
                return newMessages;
              } else {
                return prev;
              }
            } else {
              return [notice, ...prev];
            }
          });
        }
      }
    })
  }

  // const disconnectFromChannel = () => {
  //   pusher.unsubscribe(presenceChannel);
  // };

  const getMessages = () => {
    setLoading(true);

    getLiveMessages(token)
      .then(res => {
        // console.log(res.data.data);
        const msgs = res.data.data.map(m => {
          return {
            ...m,
            time: m.time !== null ? moment.utc(m.time, 'YYYY-MM-DD HH:mm:ss').local().format('HH:mm DD.MM') : ''
          }
        })
        setMessages(msgs);

        // const temp = msgs.filter(m => m.reply_message || m.recipients);
        // const rMess = temp.filter(el => JSON.parse(el.reply_message)?.user_id === user_id || JSON.parse(el.recipients)?.find(rec => rec.user_id === user_id));
        // const rMess = temp.filter(el => JSON.parse(el.recipients)?.find(rec => rec.user_id === user_id));
        const temp = msgs.filter(m => m.reply_message || m.recipients || m.first_like);
        const rMess = temp.filter(el => (el.first_like && el.user_id === user_id) || JSON.parse(el.recipients)?.find(rec => rec.user_id === user_id && el.user_id !== user_id));
        const tNots = rMess.map(n => {
          return {
            ...n,
            notification_type: 'chat', // позже еще будет giveaway
            isread: n.first_like ? n.player_like : JSON.parse(n.recipients)?.find(rec => rec.user_id === user_id).isread,
            time: n.first_like ? moment.utc(JSON.parse(n.first_like)?.created_at, 'YYYY-MM-DD HH:mm:ss').local().format('HH:mm DD.MM') : n.time,
            // isread: JSON.parse(n.recipients)?.find(rec => rec.user_id === user_id).isread,
          }
        });
        const nots = tNots.sort((a, b) => moment(b.time, 'HH:mm DD.MM') - moment(a.time, 'HH:mm DD.MM'));

        setNotifications(prev => {
          let newNots = [];
          if (prev.length) {
            newNots = prev.filter(n => nots.every(item => item.id !== n.id));
          } else {
            newNots = [...nots];
          }
          return [...prev, ...newNots];
        });

        setLoading(false);
      });
  }

  const sendMessage = (newMessage) => {
    sendLiveMessage(token, newMessage)
  }
  
  const addMineMessage = (type, imgUrl = null) => {
    let recs = null;
    if (reply.id) {
      recs = (reply.user_id).toString();
    }

    if (recipients.length) {
      let temp = members.filter(m => recipients.find(r => r === m.name));
      if (temp) {
        const replies = temp.map(el => el.id).join(',');
        if (recs && !replies.includes(recs)) {
          recs = `${recs},${replies}`;
        } else {
          recs = replies;
        }
      }
    }

    const newMessage = { 
      type: type, 
      message: type === 'text' ? textareaValue : imgUrl,
      reply: reply.id || null,
      recipients: recs,
    }
    // console.log(newMessage);
    sendMessage(newMessage);

    setTextareaValue('');
    setReply({});
    setShowEmoji(false);
    setShowGiphy(false);
    setRecipients([]);

    setTimeout(() => scrollToBottom(), 100);
  }

  // const keyPressHandler = (event) => {
  //   if (event.key === 'Enter') {
  //     event.preventDefault();
  //     if (textareaValue.trim() && textareaValue !== '\n') {
  //       addMineMessage('text');
  //     }
  //   }
  // }

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    setUnreadMessagesCount(0);
  }

  const scrollHandler = () => {
    if (toBottomCountRef?.current && 
      messagesEndRef.current.getBoundingClientRect().top - toBottomCountRef.current.getBoundingClientRect().top < 42
    ) {
      setUnreadMessagesCount(0);
    }
  }

  const emojiOpenHandler = () => {
    if (!loading) {
      setShowEmoji(!isShowEmoji);
      if (isShowGiphy) {
        setShowGiphy(false);
      } 
    }
  }

  const gifOpenHandler = () => {
    if (!loading) {
      setShowGiphy(!isShowGiphy);
      if (isShowEmoji) {
        setShowEmoji(false);
      }
    }
  }

  // const onTagMemberClick = (member) => {
  //   setTextareaValue(textareaValue.concat(member.name));
  //   setShowTagUser(false);
  // }

  const closeChat = () => {
    setChatOpen(false);
    setTextareaValue('');
    setReply({});
    setRecipients([]);
    setShowEmoji(false);
    setShowGiphy(false);
  }

  return (
    <div className={`live-chat-container ${isChatWillClose ? '' : 'show-animation-opacity'} ${isChatOpen ? 'show' : 'hide'}`}>
      <div className="live-chat flex">
        <div className="live-chat-header flex">
          <Live className="live-icon" />
          <div className="live-chat-header-title">
            {i18next.t('Live Chat')} {membersCount > 0 && `(${membersCount})`}
          </div>
          {/* <Globe className="globe-icon" /> */}
          <Info 
            className="info-icon" 
            onClick={() => setRulesModal(true)}
          />
          <div className="vl"/>
          <div 
            className="absolute-close-modal flex"
            onClick={() => setChatOpen(false)}
          >
            <Cross />
          </div>
        </div>

        <div 
          className="live-chat-body"
          onScroll={scrollHandler}
        >
          {loading && <IonSpinner className="spinner-loader center" name="lines"/>}
          {!loading && messages.map((message, i) => {
            const isNewMessagesBadge = unreadMessagesCount !== 0 && messages.length - unreadMessagesCount - 1 === i;
            return (
              <LiveMessage
                withNewMessagesBadge={isNewMessagesBadge} 
                key={message.id} 
                message={message}
                setReply={setReply}
                textareaRef={textareaRef}
                token={token}
                setReplyMessageParent={setReplyMessageParent}
                replyMessageParent={replyMessageParent}
                userId={user_id}
                color={color}
              />
            )})
          }

          {unreadMessagesCount > 0 && 
            <div 
              className="to-bottom-btn flex"
              onClick={scrollToBottom}
              ref={toBottomCountRef}
            >
              <Arrow />
              <div className="to-bottom-count flex">{unreadMessagesCount}</div>
            </div>
          }

          <div ref={messagesEndRef} style={{ height: 10 }} />
        </div>

        <div className="live-chat-footer">
          <ReplyInFooter 
            reply={reply}
            setReply={setReply}
          />

          {/* <div className={`live-chat-tag-container ${isShowTagUser ? 'show' : ''}`}>
            <div className="live-chat-tag-item-container">
              {members.map(member => 
                <div 
                  key={member.id} 
                  className="live-chat-tag-item flex"
                  onClick={() => onTagMemberClick(member)}
                >
                  <div 
                    className='userpic'
                    style={(!member.avatar || member.avatar === null) ? {backgroundImage: `url(${bg})`} : {backgroundImage: `url(${member.avatar})`}}
                  ></div>
                  <div className="live-chat-tag-username">
                    {member.name}
                  </div>
                </div>
              )}
            </div>
          </div> */}

          <form 
            className="flex"
            onSubmit={(e) => {
              e.preventDefault();
              addMineMessage('text');
            }}
          >
            {isShowEmoji && 
              <Emoji 
                color={color}
                is4k={width >= 3400}
                setTextareaValue={setTextareaValue}
              />
            }

            {isShowGiphy && 
              <Giphy 
                color={color}
                is4k={width >= 3400}
                width={width}
                addMineMessage={addMineMessage}
              />
            }

            <div className={`live-chat-textarea-container flex ${loading ? 'disabled' : ''}`}>
              <Mentions
                className="live-chat-textarea"
                ref={textareaRef}
                autoSize 
                autoFocus
                style={{ width: '100%' }}
                placeholder={i18next.t("Type a message")}
                placement="top"
                maxLength="200"
                value={textareaValue}
                onChange={(value) => {
                  setTextareaValue(value);
                  setRecipients(prev => prev.filter(el => value.includes(`@${el}`)));
                }}
                onSelect={(option, prefix) => {
                  // console.log(option.value, prefix);
                  setRecipients(prev => [...prev, option.value]);
                }}
                onPressEnter={(e) => {
                  e.preventDefault();
                  if (textareaValue.trim()) {
                    addMineMessage('text');
                  }
                }}
                disabled={loading}
                notFoundContent={<NoOptionContent color={color} />}
              >
                {members.map(member => {
                  return (
                    <Option 
                      value={member.name || (member.id).toString()}
                      key={member.id} 
                      // className="live-chat-tag-item flex"
                      // onClick={() => onTagMemberClick(member)}
                    >
                      <div 
                        className='userpic'
                        style={(!member.avatar || member.avatar === null) ? {backgroundImage: `url(${bg})`} : {backgroundImage: `url(${member.avatar})`}}
                      ></div>
                      <div className="live-chat-tag-username">
                        {member.name || (member.id).toString()}
                      </div>
                    </Option>
                  )
                })}
              </Mentions>

              {/* <IonTextarea 
                rows="1" 
                autoGrow={true}
                placeholder="Type something"
                value={textareaValue}
                onIonChange={(e) => setTextareaValue(e.detail.value)}
                onKeyPress={keyPressHandler}
                ref={textareaRef}
                disabled={loading}
              /> */}

              {/* <textarea
                rows="1" 
                placeholder={"Type something"}
                ref={textareaRef}
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                onKeyPress={keyPressHandler}
              /> */}
              
              <Smile 
                className={`smile-icon ${isShowEmoji ? 'active' : ''} ${loading ? 'disabled' : ''}`} 
                onClick={emojiOpenHandler}
              />
              <Gif 
                className={`gif-icon ${isShowGiphy ? 'active' : ''} ${loading ? 'disabled' : ''}`} 
                onClick={gifOpenHandler}
              />
            </div>

            <button
              className={`live-chat-submit-btn ${textareaValue.trim() ? 'show' : ''}`}
              type="submit"
            >
              <Send/>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
};

export default LiveChat;
