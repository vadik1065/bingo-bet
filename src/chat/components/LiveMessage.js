import React, { Fragment, useEffect, useState } from 'react';
import i18next from "i18next";
import bg from '../../images/unknown.png';
import { ReactComponent as Reply } from '../../images/live-chat/reply.svg';
import { ReactComponent as Heart } from '../../images/live-chat/heart.svg';
import { ReactComponent as HeartRed } from '../../images/live-chat/heart-red.svg';
import { setLikeMessage } from '../functions';
import catBlack from '../../images/cat-black.png';
import catWhite from '../../images/cat-white.png';

const ReplyInMessage = ({ reply, setReplyMessageParent, isErrorGif, setErrorGif, color }) => {
  return (
    <>
      {reply?.id &&
        <div 
          className="live-chat-reply-container flex"
          onClick={() => setReplyMessageParent(reply.id)}
        >
          <div className="live-chat-reply">
            <div className="reply-name">{reply?.username}</div>
            <div className="reply-message">
              {reply?.type === 'text' 
                ?
                reply?.text
                :
                <div className="reply-message-gif-container">
                  {!isErrorGif && <img src={reply?.text} alt="gif" onError={() => setErrorGif(true)} />}
                  {isErrorGif && <img src={color ? catBlack : catWhite} alt="cat" />}
                </div>
              }
            </div>
          </div>
        </div>
      }
    </>
  )
}

const LiveMessage = ({ message, setReply, textareaRef, token, setReplyMessageParent, replyMessageParent, withNewMessagesBadge, userId, color }) => {
  const [likeAppearanceAnimation, setLikeAppearanceAnimation] = useState(false);
  const [likeCountAnimation, setLikeCountAnimation] = useState(false);
  const [isErrorGif, setErrorGif] = useState(false);

  useEffect(() => {
    playLikeAnimations();
  }, [message]);

  const playLikeAnimations = () => {
    if (message.likes === 1 && message.player_like === 1) {
      setLikeAppearanceAnimation(true);
    } else {
      setLikeAppearanceAnimation(false);
    }

    if (message.player_like === 1) {
      setLikeCountAnimation(true);
    } 
    if (message.player_like === 0 && message.likes !== 0) {
      setLikeCountAnimation(false);
    }
  }

  const getFormatedText = (text, recipients = null) => {
    if (recipients !== null) {
      return text.split('\n').map((str, i) => <p key={i}>{str.split(' ').map((el, idx) => el.includes('@') ? <span key={idx} className="green">{el} </span> : <Fragment key={idx}>{el} </Fragment>)}</p>)
    } else {
      return text.split('\n').map((str, i) => <p key={i}>{str}</p>)
    }
  }

  const replyHandler = () => {
    setReply(message);
    textareaRef.current.focus();
  }

  const likeHandler = () => {
    setLikeMessage(token, [message.id], message.player_like ? 0 : 1 );
    // setLikeMessage(token, { id: message.id, islike: message.player_like ? 0 : 1 })

    // if (userId !== message.user_id) {
    //   setLikeMessage(token, { id: message.id, islike: message.player_like ? 0 : 1 })
    //   // .then((res) => {
    //     //   console.log(res.data);
    //     // })
    // }
  }
  
  return (
    <>
      <div 
        className={`live-message-container flex ${replyMessageParent === message.id ? 'flash' : ''}`}
        id={message.id}
      >
        <div className="live-message-left">
          <div 
            className='userpic'
            style={{backgroundImage: message.avatar === null ? `url(${bg})` : `url(${message.avatar})`}}
          >
            <div className={`live-message-user-level level-${message.user_level - 1}`}>LVL {message.user_level - 1}</div>
          </div>
        </div>
        <div className="live-message-right">
          <div className="live-message-user-title flex">
            <span className="live-message-username">{message.username}</span>
            <span className="live-message-circle"></span>
            <span className="live-message-time">{message.time}</span>
          </div>
          <div className="live-message-text-container">
            {message.reply_message && 
              <ReplyInMessage 
                reply={JSON.parse(message.reply_message)}
                setReplyMessageParent={setReplyMessageParent}
                isErrorGif={isErrorGif}
                setErrorGif={setErrorGif}
                color={color}
              />
            }

            <div className="live-message-text">
              {message.type === 'text' 
                ?
                message.recipients === null ? getFormatedText(message.text) : getFormatedText(message.text, JSON.parse(message.recipients))
                :
                <div className="live-message-gif-container">
                  {!isErrorGif && 
                    <img src={message.text} alt="gif" onError={() => setErrorGif(true)} />
                  }
                  {isErrorGif && <img src={color ? catBlack : catWhite} alt="cat" />}
                </div>
              }
            </div>

            {message.likes > 0 && 
              <div className={`live-message-likes flex ${likeAppearanceAnimation ? 'appearance' : ''} ${likeCountAnimation ? 'down' : 'up'}`}>
                <HeartRed />
                <span>{message.likes}</span>
              </div>
            }

            <div 
              className="live-message-action live-message-reply-btn flex"
              onClick={replyHandler}
            >
              <Reply className="reply-icon" />
            </div>
            {userId !== message.user_id &&
              <div 
                className="live-message-action live-message-like-btn flex"
                onClick={likeHandler}
              >
                {message.player_like === 1 ? <HeartRed className="red-heart-icon" /> : <Heart className="heart-icon" />}
              </div>
            }
          </div>
        </div>
      </div>

      {withNewMessagesBadge && 
        <div className="new-messages-container flex">
          <span className="line"></span>
          <span className="new-messages-label">{i18next.t('New messages')}</span>
          <span className="line"></span>
        </div>
      }
    </>
  );
};

export default LiveMessage;
