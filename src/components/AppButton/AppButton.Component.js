import React from 'react';

import './AppButton.Styles.scss';

const AppButton = ({children, handleOnClick, ...otherProps}) => {
  return (
    <button
      className="ripple"
      {...otherProps}
      onClick={handleOnClick}
    >
      { children }
    </button>
  )
}

export default AppButton;
