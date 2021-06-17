import React from 'react'
import './AlarmButton.css';
const Button = ({text, color, handleClick}) => {
  
    return (
      <div>
        <button className='btn' 
        style={{backgroundColor: color}}
        onClick={handleClick}
        >{text}
        </button>
      </div>
    )
  }
  
  export default Button
  
  
  