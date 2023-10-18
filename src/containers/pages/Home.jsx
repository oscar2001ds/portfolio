import homeImageRed from '../../assets/img/oscar_home_red.png';
import homeImageBlue from '../../assets/img/oscar_home_blue.png';
import { ChangeWordsAniamation } from '../../components/ChangeWordsAniamation';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { globalVariables } from '../../store/globalStore';


export const Home = ({ show }) => {

  const imgContainer = useRef(null)
  const textContainer = useRef(null)
  const { refreshContainerSize, pageMode } = globalVariables()
  const [pageColors, setPageColors] = useState(null)

  useEffect(() => {
    if (show == 'home' && refreshContainerSize) {

      gsap.to(imgContainer.current, {
        duration: 1,
        opacity: 1,
        y: 0,
      });

      gsap.to(textContainer.current, {
        duration: 1,
        opacity: 1,
        x: 0,
      });
    }
    else {
      gsap.to(imgContainer.current, {
        duration: 1,
        opacity: 0,
        y: 100,
      });

      gsap.to(textContainer.current, {
        duration: 1,
        opacity: 0,
        x: -100,
      });
    }
  }, [show, refreshContainerSize])

  useEffect(() => {
    setPageColors(
      {
        primaryColor: document.documentElement.style.getPropertyValue('--primary-color'),
        secondaryColor: document.documentElement.style.getPropertyValue('--secondary-color'),
      }
    )
  }, [pageMode]);


  return (
    <>
      <div className='w-full h-full overflow-hidden flex'>
        <div className='w-full h-full grid grid-cols-1 sm:grid-cols-2'>
          <div ref={textContainer}>
            {refreshContainerSize
              ?
              <div className='w-full h-full flex flex-col justify-center items-center gap-6 text-9xl'
                style={{ fontSize: '10vw', lineHeight: '20vh' }} >
                <ChangeWordsAniamation text1={'Hello.'} text1Color={pageColors.primaryColor} text2={'Full'} text2Color={pageColors.primaryColor}
                  a1={'animate-fade-down'} a2={'animate-fade-up-hidden'} a3={'animate-fade-up'} a4={'animate-fade-down-hidden'} />

                <ChangeWordsAniamation text1={"I'm"} text1Color={pageColors.secondaryColor} text2={'Stack'} text2Color={pageColors.secondaryColor}
                  a1={'animate-fade-right'} a2={'animate-fade-left-hidden'} a3={'animate-fade-left'} a4={'animate-fade-right-hidden'} />

                <ChangeWordsAniamation text1={'Oscar'} text1Color={pageColors.secondaryColor} text2={'Dev'} text2Color={pageColors.secondaryColor}
                  a1={'animate-fade-up'} a2={'animate-fade-down-hidden'} a3={'animate-fade-down'} a4={'animate-fade-up-hidden'} />
              </div>
              :
              ''
            }
          </div>
          <div className="w-full h-full overflow-hidden hidden sm:block opacity-0" ref={imgContainer}>
            <div className='w-full h-full animate-fade-up animate-once animate-duration-700 animate-ease-in-out'>
              <div className='w-full h-full bg-no-repeat opacity-100 bg-left bg-cover xl:bg-contain xl:bg-left'
                style={{
                  backgroundImage: `url(${pageMode === 'red' ? homeImageRed : pageMode === 'blue' ? homeImageBlue : ''})`,
                }}></div>
            </div>
          </div>
        </div>


      </div>

    </>
  )
}
