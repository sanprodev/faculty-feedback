import React from 'react';

import './AppRadioButtonGroup.Styles.scss';

const AppRadioButtonGroup = ({handleOnChange, label, values, block, ...otherProps}) => {
  return (
    <div className="input-radio-group">
      { label ?  <label>{ label }</label> : null }
      <div className="radio-buttons" style={block ? {display: "block"} : {} }>
        {block ? (
          values.map((item, index) => {
            return (
              <div key={index} className="radio-button">
                <input
                  type="radio"
                  onChange={handleOnChange}
                  value={item.value} 
                  {...otherProps}
                />
                { item.label }
              </div>
            )
          })
        ) : (
          values.map((item, index) => {
            return (
              <div key={index} className="radio-button">
                <input
                  type="radio"
                  onChange={handleOnChange}
                  value={item} 
                  {...otherProps}
                />
                { item }
              </div>
            )
          })
        )}

        {/* {
          values.map((item, index) => {
            return (
              <div key={index} className="radio-button">
                <input
                  type="radio"
                  onChange={handleOnChange}
                  value={item.value} 
                  {...otherProps}
                />
                { item.label }
              </div>
            )
          })
        } */}
      </div>
    </div>
  )
}

export default AppRadioButtonGroup;
