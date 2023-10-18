import React, { useState, useEffect, useRef } from 'react';
import { globalVariables } from '../../store/globalStore';
import gsap from 'gsap';
import emailjs from '@emailjs/browser';
import linkedinLogo from '../../assets/img/linkedin.svg'
import githubLogo from '../../assets/img/github.svg'
import instagramLogo from '../../assets/img/instagram.svg'

const ContactForm = ({ setMessageSend }) => {
  const form = useRef();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { pageMode } = globalVariables()
  const [passPageMode, setPassPageMode] = useState(null)
  const [colorForm, setColorForm] = useState({
    'bgForm': 'bg-red-950',
    'bgTextArea': 'bg-gradient-to-t from-[#69140f] via-black to-gray-800',
    'bgButton': 'bg-gradient-to-r from-[#69140f] via-black to-gray-800',
  })

  useEffect(() => {
    if (passPageMode === pageMode) return
    let colorForm = {}
    if (pageMode === 'red') {
      colorForm = {
        'bgForm': 'bg-red-950',
        'bgTextArea': 'bg-gradient-to-t from-[#69140f] via-black to-gray-800',
        'bgButton': 'bg-gradient-to-r from-[#69140f] via-black to-gray-800',
      }
      setColorForm(colorForm)
    }
    else if (pageMode === 'blue') {
      colorForm = {
        'bgForm': 'bg-[#162453ff] border-blue-950 border-2',
        'bgTextArea': 'bg-[#3b5b74ff]',
        'bgButton': 'bg-[#24628bff] hover:bg-[#0dc7fa] hover:scale-110',
      }
      setColorForm(colorForm)
    }
    setPassPageMode(pageMode)
  }, [pageMode, []]);


  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('OscarDiazDev', 'template_iumejbs', form.current, 'SbPI_e6rPeBvnj24q')
      .then((result) => {
        setMessageSend(true)
      }, (error) => {
        setMessageSend(false)
        console.log(error.text);
      });

    setName('');
    setEmail('');
    setMessage('');
  };


  const handleInvalidField = (e) => {
    if (e.target.name === 'user_name'){
      e.target.setCustomValidity('Please enter your name');
    }
    else if (e.target.name === 'user_email'){
      e.target.setCustomValidity('Please enter your email');
    }
    else if (e.target.name === 'message'){
      e.target.setCustomValidity('Please enter your message');
    }
    else{
      e.target.setCustomValidity('Invalid Field');
    }
  }

  return (
    <>

      <div className={`w-full h-full rounded-2xl ${colorForm.bgForm}` }>
        <form ref={form} className="w-full h-full rounded-2xl flex flex-col gap-3 p-2" onSubmit={sendEmail}>
          <input
            name="user_name"
            title='Enter your name'
            type="text"
            className={`flex p-2 justify-start items-center rounded-xl  ${colorForm.bgTextArea}`}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            onInvalid={handleInvalidField}
            onInput={(e) => e.target.setCustomValidity('')}
          />

          <input
            name="user_email"
            title='Enter your email'
            type="email"
            className={`flex p-2 justify-start items-center rounded-xl ${colorForm.bgTextArea}`}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            onInvalid={handleInvalidField}
            onInput={(e) => e.target.setCustomValidity('')}
          />

          <textarea
            name="message"
            title='Enter your message'
            className={`flex p-2 justify-start flex-grow rounded-xl ${colorForm.bgTextArea}`}
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            onInvalid={handleInvalidField}
            onInput={(e) => e.target.setCustomValidity('')}
          ></textarea>

          <div className="flex p-2 justify-between items-center mt-auto bg-transparent">
            <div className='flex gap-6'>
              <a title='linkedin' href='https://www.linkedin.com/in/oscar-david-diaz-santos' target='_blank' rel='noopener noreferrer'>
                <div className='hover:scale-110 hover:cursor-pointer bg-contain bg-no-repeat w-[20px] h-[20px]' style={{ backgroundImage: `url(${linkedinLogo})` }}></div>
              </a>
              <a title='github' href='https://github.com/oscar2001ds' target='_blank' rel='noopener noreferrer'>
                <div className='hover:scale-110 hover:cursor-pointer bg-contain bg-no-repeat w-[20px] h-[20px]' style={{ backgroundImage: `url(${githubLogo})` }}></div>
              </a>
              <a title='instagram' href='https://www.instagram.com/oscardds10/' target='_blank' rel='noopener noreferrer'>
                <div className='hover:scale-110 hover:cursor-pointer bg-contain bg-no-repeat w-[20px] h-[20px]' style={{ backgroundImage: `url(${instagramLogo})` }}></div>
              </a>
            </div>
            <button
              type="submit"
              className={`rounded-lg h-8 px-8 font-tektur ${colorForm.bgButton}`}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const ContactMsj = () => {
  return (
    <div className="w-full flex flex-col gap-2 px-4">
      <strong className="text-xl md:text-2xl" style={{ color: 'var(--primary-color)' }}> Send me a message, you won't regret it.</strong>
      <strong className="text-4xl md:text-6xl" style={{ color: 'var(--secondary-color)' }}>Contact me</strong>
      <div className="w-[70%] h-[2px]" style={{ backgroundColor: 'var(--secondary-color)' }}></div>
    </div>
  )
}

const AlertMessage = ({ messageSend }) => {
  return (
    <div className='w-[150px] h-[50px] bg-[#242424] rounded-2xl border-2 border-white flex justify-center items-center'>
      {messageSend === true
        ?
        <p>🚀 Message sent</p>
        :
        messageSend === false
          ?
          <p>❌ Error sending</p>
          :
          null
      }
    </div>
  )
}

export const Contact = ({ show }) => {

  const alertMessageContainer = useRef(null)
  const contactMsjContainer = useRef(null)
  const contactFormContainer = useRef(null)
  const [messageSend, setMessageSend] = useState(null)

  useEffect(() => {

    if (show === 'contact') {
      gsap.fromTo(contactMsjContainer.current,
        {
          opacity: 0,
          x: -100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1
        })

      gsap.fromTo(contactFormContainer.current,
        {
          opacity: 0,
          x: -100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1
        })
    }
    else {
      gsap.to(contactMsjContainer.current,
        {
          opacity: 0,
          x: -100,
          duration: 1
        })
      gsap.to(contactFormContainer.current,
        {
          opacity: 0,
          x: -100,
          duration: 1
        })
    }
  }, [show]);

  useEffect(() => {
    if (messageSend === true || messageSend === false) {
      gsap.fromTo(alertMessageContainer.current,
        {
          opacity: 0.5,
          x: '120%',
          duration: 1,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
        }).then(() => {
          setTimeout(() => {
            setMessageSend(null)
          }, 3000);
        })
    }
    else if (messageSend === null) {
      gsap.to(alertMessageContainer.current,
        {
          opacity: 0,
          x: '120%',
          duration: 1,
        })
    }
  }, [messageSend, []]);

  return (
    <>
      <div className="relative flex w-full overflow-hidden h-full justify-center lg:justify-start">
        <div ref={alertMessageContainer} className='absolute z-40 top-5 right-5'>
          <AlertMessage messageSend={messageSend} />
        </div>
        <div className="absolute z-30 w-[85%] lg:w-[70%] h-full flex flex-col justify-start items-center gap-4 pt-10">
          <div ref={contactMsjContainer} className='w-full sm:w-[500px]'>
            <ContactMsj />
          </div>
          <div ref={contactFormContainer} className='w-full h-[40%] sm:w-[500px] lg:h-[65%]'>
            <ContactForm setMessageSend={setMessageSend} />
          </div>
        </div>
      </div>
    </>
  )
}
