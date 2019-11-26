import React from 'react';

import './AppInputField.Styles.scss';

const AppInputField = ({handleOnChange, label, ...otherProps}) => {
  return (
    <div className="input-group">
      { label ?  <label>Email</label> : null }
      <input onChange={handleOnChange} {...otherProps} />
    </div>
  )
}

export default AppInputField;
