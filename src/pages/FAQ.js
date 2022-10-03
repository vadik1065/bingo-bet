import { IonContent, IonPage } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import url from '../axios.js';
import axios from 'axios';
import i18next from "i18next";
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { mainLoading } from "../state.js";
import { useAtom } from "jotai";
import { ReactComponent as Question } from '../images/question.svg';
import '../css/documents.css';

const DocItem = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`paragraph ${open ? 'opened' : ''}`}>
      {props.item.name !== '' && 
        <div 
          className="paragraph-left flex"
          onClick={() => setOpen(!open)}
        >
          <Question className="question" />
          <h3 className={(props.item.contents === null ? '' : 'h3-smaller')} >
            {props.item.name}
          </h3>
        </div>
      }
      {props.item.contents !== '' && 
        <div className="paragraph-content" dangerouslySetInnerHTML={{__html: props.item.contents}}></div>
      }
    </div>
  )
}

const FAQ = (props) => {
  const [text, setText] = useState([]);
  const [loading, setLoading] = useAtom(mainLoading);

  useEffect(() => {
    setLoading(true);
    axios({
      method: 'post',
      url: url + '/api/get-documents',
      data: {
        id: 15,
        lang: props.data.lang
      }
    })
    .then(res => {
      setText(JSON.parse(Object.values(res.data.data)));
      setLoading(false);
    })
  }, []);

  return (
    <IonPage>
      {/* <Header
        setColor={props.setColor}
        color={props.color} 
        data={props.data}
        updateUser={props.updateUser} 
      /> */}
      <IonContent overflow-scroll="true" className="page has-header">
        <div className="homepage flex">
          <div className={"width-container terms faq"}>
            <p className="page-title top-of-the-page">FAQ</p>
            {text.map((item, i) => {
              return (
                <DocItem key={i} item={item} />
              )
            })}
          </div>

          <Footer data={props.data} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FAQ;
