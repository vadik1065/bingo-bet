import axios from 'axios';
import FP from '@fingerprintjs/fingerprintjs-pro'
const url = 'https://admin.bingo.bet';
// const url = 'https://test.bingo.bet'; // тестовый сервер
const { v4: uuidv4 } = require('uuid');

export async function getMessages(id, token){
  let response;
  if (token === null || token === undefined) {
    response = await axios({
      method: 'post',
      url: url + '/api/get-chat-messages',
      data: {
        chat_id: id,
      }
    });
  };
  if (token !== null && token !== undefined) {
    response = await axios({
      method: 'post',
      url: url + '/api/get-chat-messages-auth',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        chat_id: id,
      }
    });
  }

  return response;
}

export async function getChatId(name) {
  var uuid = uuidv4();
  let requestMetadata = { UUID: uuid };
  let fp = await FP.load({ token: "UCmjTCW278UaQTDLjsMJ", region: "eu" });
  let result = await fp.get({ tag: requestMetadata, callbackData: true, extendedResult: true });
  let response = axios({
    method: 'post',
    url: url + '/api/get-chat-id',
    data: {
      title: name,
      fingerprint: JSON.stringify(result)
    }
  })
  return response;
};

export async function sendMessage(chat_id, message, boo, token, type) {
  var response;
  if (!boo) {
    response = axios({
      method: 'post',
      url: url + '/api/send-chat-message',
      data: {
        message,
        chat_id,
        type
      }
    })
  }
  if (boo) {
    response = axios({
      method: 'post',
      url: url + '/api/send-chat-message-auth',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        message,
        chat_id,
        type
      }
    })
  }

  return response;
}

export async function getChatIdAuth(token) {
  let response = axios({
    method: 'post',
    url: url + '/api/get-chat-id-auth',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {}
  })
  return response;
};


// Live chat
export const presenceChannel = 'presence-liveChat.channel';

export async function getLiveMessages(token) {
  let response;
  if (token && token !== null) {
    response = await axios({
      method: 'post',
      url: url + '/api/get-livechat-messages-auth',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // data: {
      //   limit: 10,
      //   offset: 0,
      // }
    });
  }

  return response;
}

export async function sendLiveMessage(token, message) {
  let response;
  if (token && token !== null) {
    response = await axios({
      method: 'post',
      url: url + '/api/send-livechat-message-auth',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: message
    });
  }

  return response;
}

export async function setLikeMessage(token, ids, islike) {
  let response;
  if (token && token !== null) {
    response = await axios({
      method: 'post',
      url: url + '/api/set-like-livechat',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ids,
        islike: islike
      }
      // data: {
      //   id: message.id,
      //   islike: message.islike
      // }
    });
  }

  return response;
}

export async function setReadMessage(token, ids) {
  let response;
  if (token && token !== null) {
    response = await axios({
      method: 'post',
      url: url + '/api/set-read-livechat',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ids,
        isread: 1
      }
    });
  }

  return response;
}
