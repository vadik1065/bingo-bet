import React, { useState } from 'react';
import Picker from 'emoji-picker-react';

const Emoji = ({ color, is4k, setTextareaValue }) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setTextareaValue(prev => prev.concat(emojiObject.emoji));
  };

  const pickerStyle = {
    width: '100%',
    background: color ? '#171f21' : '#ffffff',
    borderColor: color ? '#61696b' : '#CACACA',
    borderRadius: is4k ? 14 : 8,
    boxShadow: 'none',
  }

  return (
    <div className="emoji-container">
      <Picker 
        onEmojiClick={onEmojiClick} 
        pickerStyle={pickerStyle}
        disableSearchBar={true}
      />
    </div>
  )
};

export default Emoji;
