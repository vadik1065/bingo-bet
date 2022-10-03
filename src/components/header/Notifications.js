import React, { useEffect, useState } from 'react';
import { IonPopover, useIonViewWillLeave } from '@ionic/react';
import { useAtom } from 'jotai';
import i18next from "i18next";
import { gl_notifications, liveChat, liveChatToMessageId } from '../../state';
import { setLikeMessage, setReadMessage } from '../../chat/functions';
import { ReactComponent as Cross } from '../../images/cross.svg';
import { ReactComponent as Settings } from '../../images/settings.svg';
import catBlack from '../../images/cat-black.png';
import catwhite from '../../images/cat-white.png';
import bg from '../../images/unknown.png';
import gift from '../../images/gift.png';

const NotificationItem = ({ children, notification, isread, id, token, setNotifications, setShowPopover, userId }) => {
  const [isChatOpen, setChatOpen] = useAtom(liveChat);
  const [toMessage, setToMessage] = useAtom(liveChatToMessageId);  

  const setRead = () => {
    if (notification.first_like && notification.user_id === userId) {
      setLikeMessage(token, [id], 1)
        .then(res => {
          if (res.data.status === 1) {
            setNotifications(prev => {
              const objIndex = prev.findIndex(n => n.id === id);
              const updatedObj = { 
                ...prev[objIndex], 
                isread: 1,
              };
              const newNotifications = [
                ...prev.slice(0, objIndex),
                updatedObj,
                ...prev.slice(objIndex + 1),
              ];
        
              return newNotifications;
            });
          }
        })
        .catch(error => {
          console.log(error.response?.data?.message);
        })
    } else {
      setReadMessage(token, [id])
        .then(res => {
          if (res.data.status === 1) {
            setNotifications(prev => {
              const objIndex = prev.findIndex(n => n.id === id);
              const updatedObj = { 
                ...prev[objIndex], 
                isread: 1,
              };
              const newNotifications = [
                ...prev.slice(0, objIndex),
                updatedObj,
                ...prev.slice(objIndex + 1),
              ];
        
              return newNotifications;
            });
          }
        })
        .catch(error => {
          console.log(error.response?.data?.message);
        })
    }
  
    setShowPopover({ showPopover: false, event: undefined });
    setChatOpen(true);
    setTimeout(() => setToMessage(id), 300);
  }

  return (
    <div 
      className={`notification-popover-body-item flex ${isread ? '' : 'not-read'}`}
      onClick={setRead}
    >
      {children}
    </div>
  )
}

const Notifications = ({ popoverState, setShowPopover, token, color, userId }) => {
  const [notifications, setNotifications] = useAtom(gl_notifications);
  const [notificationsView, setNotificationsView] = useState([]);
  const [tab, setTab] = useState(1);

  const buttons = [
    { id: 1, label: 'All', count: notifications.filter(n => n.isread === 0).length },
    { id: 2, label: 'Giveaway', count: notifications.filter(n => n.isread === 0 && n.notification_type === 'giveaway').length },
  ];

  useEffect(() => {
    if (tab === 1) {
      setNotificationsView(notifications);
    } else {
      setNotificationsView(notifications.filter(n => n.notification_type === 'giveaway'));
    }
  }, [tab, notifications]);

  useIonViewWillLeave(() => {
    setTab(1);
  });

  const setAllRead = () => {
    let likeIds = [];
    let otherIds = [];
    notifications.map(n => {
      if (n.first_like && n.user_id === userId) {
        likeIds.push(n.id);
      } else {
        otherIds.push(n.id);
      }
    })

    if (likeIds.length) {
      setLikeMessage(token, likeIds, 1)
        .then(res => {
          if (res.data.status === 1) {
            setNotifications(prev => [...prev.map(p => {
              if (likeIds.includes(p.id)) {
                return {
                  ...p, 
                  isread: 1
                }
              } else {
                return p
              }
            })]);
          }
        })
        .catch(error => {
          console.log(error.response?.data?.message);
        })
    }

    if (otherIds.length) {
      setReadMessage(token, otherIds)
        .then(res => {
          if (res.data.status === 1) {
            setNotifications(prev => [...prev.map(p => {
              if (otherIds.includes(p.id)) {
                return {
                  ...p, 
                  isread: 1
                }
              } else {
                return p
              }
            })]);
          }
        })
        .catch(error => {
          console.log(error.response?.data?.message);
        })
    }

    // let ids = [];
    // ids = notifications.map(n => n.id);
    // if (ids.length) {
    //   setReadMessage(token, ids)
    //     .then(res => {
    //       if (res.data.status === 1) {
    //         setNotifications(prev => [...prev.map(p => {
    //           return {
    //             ...p, 
    //             isread: 1
    //           }
    //         })]);
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error.response?.data?.message);
    //     })
    // }
  }

  return (
    <IonPopover
      cssClass='user-popover user-menu notification-popover'
      mode={'md'}
      event={popoverState.event}
      isOpen={popoverState.showPopover}
      onDidDismiss={() => setShowPopover({ showPopover: false, event: undefined })}
    >
      <div className="user-menu-popover">
        <div className="user-menu-popover-header flex">
          <div className="username">
            {i18next.t('Notifications')}
          </div>
          {/* <Settings className="settings-icon" />
          <div className="vl"/> */}
          <div 
            className="absolute-close-modal flex"
            onClick={() => setShowPopover({ showPopover: false, event: undefined })} 
          >
            <Cross />
          </div>
        </div>
        <div className="notification-popover-tabs flex">
          {buttons.map(b => 
            <div 
              key={b.id}
              className={`notification-top-btn ${tab === b.id ? 'active' : ''}`}
              onClick={() => setTab(b.id)}
            >
                {i18next.t(b.label)} {b.count > 0 && `(${b.count})`}
            </div>
          )}
          <div 
            className="notification-top-btn without-frame"
            onClick={setAllRead}
          >
            {i18next.t('Mark all as read')}
          </div>
        </div>

        <div className="notification-popover-body">
          {notificationsView.length === 0 
            ?
            <div className='notification-popover-no-option flex'>
              <div className="no-option-pic">
                <img src={color ? catBlack : catwhite} alt="cat" />
              </div>
              <div className="no-option-label">
                {i18next.t("You don't have any notifications yet")}
              </div>
            </div>
            :
            notificationsView.map((nots, i) => {
              if (nots.notification_type === 'chat') {
                // console.log(nots);
                let avatar = '';
                if (nots.first_like && nots.user_id === userId) {
                  if (JSON.parse(nots.first_like)?.avatar !== null) {
                    avatar = JSON.parse(nots.first_like)?.avatar;
                  } else {
                    avatar = bg;
                  }
                } else {
                  if (nots.avatar !== null) {
                    avatar = nots.avatar
                  } else {
                    avatar = bg;
                  }
                }
                return (
                  <NotificationItem 
                    key={i} 
                    notification={nots}
                    isread={!!nots.isread}
                    id={nots.id}
                    setNotifications={setNotifications}
                    token={token}
                    setShowPopover={setShowPopover}
                    userId={userId}
                  >
                    <div className="live-message-left">
                      <div 
                        className='userpic' 
                        style={{ backgroundImage: `url(${avatar})` }}
                        // style={{backgroundImage: `url(${nots.avatar === null ? bg : (nots.first_like && nots.user_id === userId) ? JSON.parse(nots.first_like)?.avatar : nots.avatar})`}}
                      ></div>
                    </div>
                    <div className="live-message-right">
                      <div className="live-message-user-title flex">
                        <span className="live-message-username">
                          {nots.first_like && nots.user_id === userId ? JSON.parse(nots.first_like)?.username : nots.username}
                        </span>
                        <span className="live-message-action-label">
                          {nots.first_like && nots.user_id === userId 
                            ? 
                            `${nots.likes > 1 ? i18next.t("and others") : ''} ${i18next.t("likes your message")}` 
                            : 
                            nots.reply ? i18next.t("replied you in chat") : i18next.t("mentioned you in chat")
                          }
                          {/* {nots.reply ? 'replied you in chat' : 'mentioned you in chat'} */}
                        </span>
                      </div>
        
                      <div className="notification-time-container">
                        {nots.time}
                      </div>
                    </div>
                  </NotificationItem>
                )
              } else if (nots.notification_type === 'giveaway') {
                return (
                  <NotificationItem 
                    key={i} 
                    notification={nots}
                    isread={!!nots.isread}
                    id={nots.id}
                    setNotifications={setNotifications}
                    token={token}
                    setShowPopover={setShowPopover}
                    userId={userId}
                  >
                    <div className="live-message-left">
                      <div className='userpic giveaway-pic'>
                        <img src={gift} alt="gift" />
                      </div>
                    </div>
                    <div className="live-message-right">
                      <div className="live-message-user-title flex">
                        <span className="live-message-username">
                          {i18next.t("Сongratulations!")}
                        </span>
                      </div>
                      <div className="notification-text-container">
                        You are the winner of the giveaway. Please contact us to claim your prize. Contact number <span>4943 05430 40</span>
                      </div>
                      <div className="notification-time-container">1 min ago</div>
                    </div>
                  </NotificationItem>
                )
              }
            })
          }
        </div>
        
        {/* {notificationsView.length > 0 && <div className={`notification-popover-footer flex`}>{i18next.t("View All Notifications")}</div>} */}
      </div>
    </IonPopover>
  )
}

export default Notifications;