import React, { useState } from 'react'
import {images} from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import {client} from '../../client';

import './Footer.scss'

const Footer = () => {

  const [formData, setformData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmited, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {name, email, message} = formData;
  const handleChangeInput = (e) =>{
    const {name, value} = e.target;
    setformData({...formData, [name]: value});
  }

  const handleSubmit =  () => {
    setLoading(true);
    
    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message
    }

    client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })

  }


  return (
    <>
      <h2 className='head-text'>Take a coffe & chat whit me</h2>
      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} alt='email'/>
          <a href='mailto:brandonf2345@gmail.com' className='p-text'>brandonf2345@gmail.com</a>
        </div>

        <div className='app__footer-card'>
          <img src={images.mobile} alt='mobile'/>
          <a href='tel:+52 (722) 681-07-75' className='p-text'>+52 (722) 681-07-75</a>
        </div>
      </div>

      {!isFormSubmited ?
      <div className='app__footer-form app__flex'>
        <div className='app__flex'>
          <input className='p-text' type='text' placeholder='Your Name' name='name' value={name} onChange={handleChangeInput}>
          </input>
        </div>

        <div className='app__flex'>
          <input className='p-text' type='email' placeholder='Your Email' name='email' value={email} onChange={handleChangeInput}>
          </input>
        </div>

        <div className=''>
          <textarea
            className='p-text'
            placeholder='Your Message'
            value={message}
            name='message'
            onChange={handleChangeInput}
          />
        </div>
          <button className='p-text' onClick={handleSubmit}>{loading ? 'Sending' : 'Send Message'}</button>
      </div>
      : <div>
          <h3 className='head-text'>Thank you for getting in touch</h3>
        </div>}

    </>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg'
)
