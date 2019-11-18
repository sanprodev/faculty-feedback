import React from 'react';

import './AppInputField.Styles.scss';

const FormInput = ({handleOnChange, lable, ...otherProps}) => {
  return (
    <div className="input-group">
      { lable ?  <lable>Email</lable> : null }
      <input onChange={handleOnChange} {...otherProps} />
    </div>
  )
}

export default FormInput;
