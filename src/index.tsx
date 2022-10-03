import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "jotai";
import * as serviceWorker from './serviceWorker';
import './i18n';
import i18next from "i18next";
import {  initReactI18next, I18nextProvider } from 'react-i18next';
const i18n = i18next.use(initReactI18next);

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
     <Provider>
      <App />
     </Provider>
   </I18nextProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
