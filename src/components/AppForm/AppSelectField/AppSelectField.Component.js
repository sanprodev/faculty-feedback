import React from 'react';

import './AppSelectField.Styles.scss';

const AppSelectField = ({handleOnChange, lable, options, name}) => {
  return (
    <div className="input-group">
      { lable ?  <lable>Email</lable> : null }
      <select defaultValue={"default"} onChange={handleOnChange} name={name}>
      <option value="default" disabled>Select {name}</option>
        {
          options.map(option => {
            return <option key={option} value={option}>{option}</option>
          })
        }
      </select>
    </div>
  )
}

export default AppSelectField;
