import React, { useEffect, useState } from 'react';
import i18next from "i18next";
import { ReactComponent as Send } from '../icons/send-message.svg';
import { ReactComponent as CloseLogo } from '../icons/cancel.svg';
import { useDropzone } from 'react-dropzone';
import Resizer from "react-image-file-resizer";

const Previews = (props) => {
  const style = {
    position: 'absolute',
    width: '100%',
    height: '65px',
    borderRadius: '50%'
  };

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    props.files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [props.files]);

  function deleteImage(image) {
    props.setFiles(prev => prev.filter(img => img.preview !== image));
    props.setImage('');
  }

  return (
    <section className="file-zone-container userpic userpic-container">
      <div 
        // {...props.getRootProps({ className: 'dropzone' })}
      >
        {/* <input  {...getInputProps()} /> */}
        {/* {props.isDragActive && props.files !== [] ?
          <div className={'file-zone-active'}>
            <div className={'file-zone-img'}></div>
            {i18next.t('Drop file here')}
          </div> 
          :
          <div className={'file-zone'}>
            <div
              alt="file"
              // style={{ background: `url(${props.pic})` }}
              // src={props.pic}
              className={'previewImg avatar-prev'}
            />
          </div>
        } */}

        {props.files !== [] &&
          <div style={style} className={'thumbs-container'}>
            {props.files.map(file => (
              <div className={"thumb"} key={file.preview}>
                <div
                  alt="file"
                  style={{ backgroundImage: `url(${file.preview})` }}
                  className={'previewImg avatar-prev'}
                />
                <div className="delete-btn" onClick={() => deleteImage(file.preview)}>
                  <CloseLogo/>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </section>
  );
}

const InputComponent = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [image, setImage] = useState('');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/jpeg, image/png, image/gif',
    onDrop: acceptedFiles => {
      getFiles(acceptedFiles);
      props.setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    },
    multiple: false
  });

  useEffect(() => {
    if (!props.chatOpen) {
      setInputValue('');
    }
  }, [props.chatOpen]);

  function sendMessage(e) {
    e.preventDefault();
    if (inputValue.length > 0) {
      props.addMine(inputValue, 'text');
      setInputValue('');
    }
    if (props.files.length) {
      props.addMine(image, 'image');
      setImage('');
      props.setFiles([]);
    }
  }

  function keyPressHandler(event) {
    if (event.key === 'Enter' && event.ctrlKey) {
      if (inputValue && inputValue !== '\n') {
        sendMessage(event);
      }
    }
  }

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        800,
        800,
        "JPEG",
        100,
        0,
        (uri) => resolve(uri),
        "base64",
      );
    });

  const getFiles = async (data) => {
    try {
      const image = await resizeFile(data[0]);
      setImage(image);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='chat-input'>
      <form onSubmit={sendMessage}>
        <textarea
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={keyPressHandler}
          placeholder={i18next.t("Your message...")}
        />
        <div className="chat-input-buttons">
          <input className="clip-btn" {...getInputProps()} />

          <button 
            type="submit" 
            className={`send-btn ${(!inputValue || inputValue === '\n') && !props.files.length ? 'disabled' : ''}`}
          >
            <Send/>
          </button>
        </div>
        {props.files.length > 0 &&
          <Previews  
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
            files={props.files}
            setFiles={props.setFiles}
            setImage={setImage}
          />
        }
      </form>
    </div>
  )
}

export default InputComponent;
