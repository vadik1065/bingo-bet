import React from 'react';

const ProgressBar = ({ children, completed }) => {
  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    borderTopLeftRadius: 'inherit',
    borderBottomLeftRadius: 'inherit',
    textAlign: 'right',
  }

  // const labelStyles = {
  //   padding: '0 5px',
  //   color: 'white',
  //   fontWeight: 'bold'
  // }

  return (
    <>
      {children}
      <div className="premium-vip-progress-bar">
        <div style={fillerStyles} className="progress-bar-filler">
          {/* <span style={labelStyles}>{`${completed}%`}</span> */}
        </div>
      </div>
    </>
  )
}

export default ProgressBar;
