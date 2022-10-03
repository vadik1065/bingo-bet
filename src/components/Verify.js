import React, { useEffect, useState } from 'react';
import { IonItem, IonSelect, IonSelectOption } from '@ionic/react';
import { useDropzone } from 'react-dropzone';
import url from '../axios.js';
import axios from 'axios';
import { ReactComponent as StepOne } from '../images/step-one.svg';
import { ReactComponent as StepTwo } from '../images/step-two.svg';
import i18next from "i18next";
import { notify } from '../utils/utils.js';

function Previews(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      acceptedFiles.forEach((item, i) => {
        var file = acceptedFiles[i]
        const reader = new FileReader();
        reader.onload = (event) => {
          props.getFiles(event.target.result);
          // console.log(event.target);
        };
        reader.readAsDataURL(file);
        setFiles([...files, ...acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }))]);
      });
    }
  });
  const style = {
    position: 'absolute',
    width: props.is4k ? '700px' : '350px',
    height: props.is4k ? '270px' : '135px',
    borderRadius: '4px'
  };
  const thumbs = files.map(file => (
    <div className={"thumb"} key={file.name}>
      <div
        style={{ backgroundImage: `url(${file.preview})`,backgroundSize: 'contain' }}
        className={'peviewImg verify-prev'}
      />
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <>
    <section className="file-zone-container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {isDragActive && files !== [] ?
          <div className={'file-zone-active'}>
            <div className={'file-zone-img'}></div>
            {i18next.t('Drop file here')}
          </div> :
          <div className={'file-zone'}>
            <div className={'file-zone-img'}></div>
          </div>
        }
        {
          files !== [] &&
          <div style={style} className={'thumbs-container'}>
            {thumbs[thumbs.length-1]}
          </div>
        }
      </div>

    </section>
    {
      files !== [] &&
      <div className={'thumbs-titles'}>
        {files.map((el,i)=> {
          return(<span key={i}>{el.name}, </span> )
        })}
      </div>
    }
    </>

  );
}


function VerifyAccount(props) {
  const [doc, setDoc] = useState('Driver Licence');
  const [files, setFiles] = useState([]);
  
  function getFiles(file) {
    setFiles(prev => [...prev, file]);
    // console.log(falseModal, falseModalText);
  }

  function verifyAccount() {
    // props.setShowLoading(true);
    if (files.length) {
      axios({
        method: 'POST',
        url: url + '/api/document-upload',
        headers: {
          'Authorization': `Bearer ${props.data.token}`,
          'Content-Type': 'application/json',
        },
        data: {
          doc: {
            name: 'doc',
            images: files
          }
        }
      })
        .then(res => {
          if (res.data.status === 1) {
            // props.setShowLoading(false);
            props.updateUser(props.data.token);
            notify({ 
              message: i18next.t("Success"),
              description: i18next.t("Your request has been successfully sent."),
              icon: "success",
            });
          }
          // props.setShowLoading(false);
        })
        .catch(error => {
          /*422*/
          notify({ message: error.response.data.message });
        })
    }
  }
  
  return (
    <div className="account-verification">
      <div className="account-title">{i18next.t('Account Verification')}</div>

      {/* 0 */}
      {props.data.userData.verified_status === 0 && 
        <div className="account-description">
          {i18next.t('You must complete our secure verification process to use your account.')}<br />
          {i18next.t('We ask everyone to do this in order to meet gambling regulations and keep our players safe.')}
        </div>
      }

      {/* 1 */}
      {props.data.userData.verified_status === 1 && 
        <div className="account-description">
          {i18next.t('Your account is verified.')}
        </div>
      }

      {/* 2 */}
      {props.data.userData.verified_status === 2 && 
        <div className="account-description">
          {i18next.t('Your request is being considered.')}
        </div>
      }

      {/* 0 */}
      {props.data.userData.verified_status === 0 && 
        <div className="verification-steps flex">
          <div className="step-one">
            <div className="step-title flex">
              <StepOne />
              {i18next.t('Provide proof of identity and address')}
            </div>
            <div className="input-container flex select">
              <span>{i18next.t('Type of document')}</span>
              <IonItem lines="none" className="ion-item-select">
                <IonSelect 
                  onIonChange={e => setDoc(e.detail.value)} 
                  value={doc} 
                  placeholder={i18next.t('Select document')} 
                  interface={'popover'} 
                  mode={'md'} 
                  className='field'
                >
                  <IonSelectOption value="Driver Licence">{i18next.t('Driver Licence')}</IonSelectOption>
                  <IonSelectOption value="Passport">{i18next.t('Passport')}</IonSelectOption>
                </IonSelect>
              </IonItem>
            </div>
            <div className="file-loading">
              <Previews getFiles={getFiles} is4k={props.data.width >= 3400} />
            </div>
          </div>
          <div className="step-two">
            <div className="step-title flex">
              <StepTwo />
              {i18next.t('Provide proof of identity and address')}
            </div>
            <div className="step-two-content">
              {/* <p>{i18next.t('Upload your passport or driver license to proof your identity.')}</p> */}
              <p>{i18next.t('Upload one of the following documents showing your full name and physical address (we can’t accept a PO Box). Letters and bills must be dated')} <strong className="text-accent">{i18next.t('within the last 6 months')}</strong> {i18next.t('and show the company name or logo')}</p>
              <p><em>{i18next.t('Please cover personal information that isn’t relevant.')}</em></p>
              <p><strong>{i18next.t('Official letter from your bank')}</strong></p>
              <p>{i18next.t('A letter, a bank statement or a credit card statement.')}</p>
              <p><strong>{i18next.t('Official letter from your government')}</strong></p>
              <p>{i18next.t('Police, magistrate, tax office or population registry.')}</p>
              <p><strong>{i18next.t('Utility bill')}</strong></p>
              <p>{i18next.t('We can accept water, electricity, gas, broadband or TV package bills but not a mobile phone bill.')}</p>
            </div>
            <div className="file-loading">
              <Previews getFiles={getFiles} is4k={props.data.width >= 3400} />
            </div>
          </div>
        </div>
      }

      {/* additional documents */}
      {props.data.userData.verified_status === 3 &&
        <div className="step-two add-docks">
          <div className="step-title flex">
            {i18next.t('Provide additional documents')}
          </div>
          {
            props.data.userData.verified_messages.map((el,i)=> {
              return (
                <div key={i} className="account-description">
                  {el.message}
                </div>
              )
            })
          }
          <div className="file-loading">
            <Previews getFiles={getFiles} />
          </div>
        </div>
      }

      {props.data.userData.verified_status === 4 &&
        <div className="step-two ">
          <div className="step-title flex">
            {i18next.t('Your registration was denied')}
          </div>
          {
            props.data.userData.verified_messages.map((el,i)=> {
              return (
                <div key={i} className="account-description">
                  {el.message}
                </div>
              )
            })
          }
        </div>
      }

      {/* 0 */}
      {(props.data.userData.verified_status === 0 || props.data.userData.verified_status === 3) && 
        <div className="account-footer-btns flex">
          <div className="cancel-btn left-auto">
            <p>{i18next.t('Cancel')}</p>
          </div>
          <div onClick={verifyAccount} className="save-btn">
            <p>{i18next.t('Save')}</p>
          </div>
        </div>
      }
    </div>
  );
};

export default VerifyAccount;
