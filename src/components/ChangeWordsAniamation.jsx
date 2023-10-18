import React, { useState, useEffect} from 'react';

export const ChangeWordsAniamation = ({ text1, text2, text1Color, text2Color, a1, a2, a3, a4}) => {

  let fontText = 'font-tektur'
  const [timeChange, setTimeChange] = useState(false)
  const [av1, setAv1] = useState(true)
  const [av2, setAv2] = useState(false)

  const handleAnimationEnd1_1 = () => {
    const interval = setInterval(() => {
      setTimeChange(true)
      clearInterval(interval)
    },
      1000
    )
  }
  const handleAnimationEnd1_2 = (block) => {
    block.target.style.display = 'none'
    setAv1(false)
    setAv2(true)

  }

  const handleAnimationEnd2_1 = () => {
    const interval = setInterval(() => {
      setTimeChange(false)
      clearInterval(interval)
    },
      1000
    )
  }
  const handleAnimationEnd2_2 = (block) => {
    block.target.style.display = 'none'
    setAv1(true)
    setAv2(false)
  }
  return (
    <>
      <div className=''>
        {av1 ?
          timeChange
            ?
            <>
              <div className={'select-none animate-once animate-duration-700 ' + (' ') + (a2)} onAnimationEnd={handleAnimationEnd1_2}>
                <strong className={fontText} style={{color:text1Color}}>{text1}</strong>
              </div>
            </>
            :
            <>
              <div className={'select-none animate-ease-in animate-once animate-duration-700 ' + (' ') + (a1)} onAnimationEnd={handleAnimationEnd1_1} style={{ display: 'block' }}>
                <strong className={fontText} style={{color:text1Color}}>{text1}</strong>
              </div>

            </>
          : null
        }

        {av2 ?
          timeChange
            ? <div className={'select-none animate-ease-in animate-once animate-duration-700 ' + (' ') + (a3)} onAnimationEnd={handleAnimationEnd2_1} style={{ display: 'block' }}>
              <strong className={fontText} style={{color:text2Color}}>{text2}</strong>
            </div>
            : <div className={'select-none animate-once animate-duration-700 ' + (' ') + (a4)} onAnimationEnd={handleAnimationEnd2_2}>
              <strong className={fontText} style={{color:text2Color}}>{text2}</strong>
            </div>
          : null
        }

      </div>
    </>
  )
}
