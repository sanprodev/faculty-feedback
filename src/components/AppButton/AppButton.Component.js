import React from 'react';

import './AppButton.Styles.scss';

const AppButton = ({children, ...otherProps}) => {
  return (
    <button className="ripple" {...otherProps}>
      { children }
    </button>
  )
}

export default AppButton;
