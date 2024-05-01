import React from 'react'
import './Breadcrumb.css'
import arrow_icon from './Assets/breadcrumb_arrow.png';

const Breadcrumb = (props) => {
    const {product} = props;

  return (
    <div className='breadcrumb'>
        Home <img src={arrow_icon} alt=""/> Shop <img src={arrow_icon} alt=""/> 
    </div>
  )
}

export default Breadcrumb