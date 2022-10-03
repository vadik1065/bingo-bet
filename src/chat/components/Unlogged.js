import React, {useState} from 'react';
import i18next from "i18next";
const Unlogged = (props) => {
  const [inputValue, setInputValue] = useState('');
  function setName(e) {
    e.preventDefault();
    if (inputValue.length > 0) {
      props.setUserName(inputValue);
      props.unloggedStart(inputValue);
      // setInputValue('');
    }
  }
  return (
    <div className="unlogged-container">
      <p className='type-name'>{i18next.t('What is your name?')}</p>
      <form onSubmit={setName}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} type="text"/>
        <button>OK</button>
      </form>
    </div>
  )
}

export default Unlogged
