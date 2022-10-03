import React, { useEffect } from 'react';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';

const gf = new GiphyFetch('fo4u6pMuYgrHJDeMobXvyXGXBlvkTcHr');

const Giphy = ({ addMineMessage, width, is4k }) => {
  
  useEffect(() => {
    fetchGifs();
  }, []);

  const fetchGifs = async (offset) => {
    // return gf.search(searchTerm, { offset, limit: 10 });
    const result = await gf.trending({ limit: 10, offset, rating: 'g' });
    return result;
  }

  const onGifClick = (gif) => {
    // console.log(gif.images.fixed_height.url);
    addMineMessage('image', gif.images.fixed_height.url);
  }

  const getWidth = () => {
    if (width >= 3400) {
      console.log(1);
      return 768;
    } else if (width > 767) {
      console.log(2);
      return 328;
    } else {
      console.log(3);
      return 300;
    }
  }

  const mobWidth = () => {
    // console.log(width);
    let w = width - 32;
    return w;
  }

  return (
    <div className="giphy-container">
      <Grid 
        width={getWidth}
        width={width >= 3400 ? 768 : width < 768 ? mobWidth() : 328}
        // width={is4k ? 786 : 328}
        // width={width >= 3400 ? 768 : width < 768 ? 'calc(100vw - 32px)' : 328}
        columns={2}
        fetchGifs={fetchGifs} 
        noLink={true}
        onGifClick={onGifClick}
        gutter={is4k ? 10 : 5}
      />
    </div>
  );
};

export default Giphy;
