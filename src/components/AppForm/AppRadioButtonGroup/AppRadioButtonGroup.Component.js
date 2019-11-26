import React from 'react';

import './AppRadioButtonGroup.Styles.scss';

const AppRadioButtonGroup = ({handleOnChange, label, values, style, ...otherProps}) => {
  return (
    <div className="input-radio-group">
      { label ?  <label>{ label }</label> : null }
      <div className="radio-buttons" style={style}>
        {
          values.map(value => {
            return (
              <div key={value} className="radio-button">
                <input
                  type="radio"
                  onChange={handleOnChange}
                  value={value} 
                  {...otherProps}
                />
                { value }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AppRadioButtonGroup;
