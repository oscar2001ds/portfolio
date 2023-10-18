import { useEffect, useRef } from "react"
import { Carrousel } from "../../components/Carrousel"
import { TypeAnimation } from "react-type-animation"
import { gsap } from "gsap";

export const Work = ({ show }) => {
  const descrContainerRef = useRef(null)
  const cards = useRef([
    { id: 'workBeatBliss', img: 'workBeatImg.jpg', title: 'BeatBliss', tecs: ['JavaScript', 'React','PostgreSQL'], pageDir:'https://beatblissoscar.netlify.app', codeDir:'https://github.com/oscar2001ds/ReactBeatBliss', desc: "A functional application inspired by Spotify, where you can enjoy a wide variety of songs and create an account to save your favorite playlists." },
    { id: 'worMusicApi', img: 'workApiImg.jpg', title: 'Music Api', tecs: ['Python', 'Django', 'Django-Rest-Framework','PostgreSQL'], pageDir:'https://beat-bliss-api-django.onrender.com/api/', codeDir:'https://github.com/oscar2001ds/BeatBlissApiDjango', desc: 'A REST API that allows you to manage artists, albums and songs, with a user system and authentication.'},
    { id: 'workPalace', img: 'workPalaceImg.jpg', title: 'El Palacio', tecs: ['JavaScript','HTML','CSS'], pageDir:'https://sites.google.com/view/parcelacion-el-palacio/inicio', codeDir:'', desc: 'In this project the client needed a page to show their lot project, where users could learn about the space and contact the seller.' },
    { id: 'workPortfolio', img: 'workPortfolioImg.jpg', title: 'Portfolio', tecs: ['JavaScript', 'Threejs'], pageDir:'https://oscardiaz.netlify.app', codeDir:'https://github.com/oscar2001ds/portfolio', desc: 'My portfolio, where you can learn something about me, my knowledge and see my work.'},
    // { id: 'workUao', img: 'workUaoImg.jpg', title: 'UAO', tecs: ['JavaScript', 'nodejs','mongoDB'], pageDir:'', codeDir:'', desc: 'a CRUD project designed for the loan of objects from the engineering laboratory of the Autonomous University of the West.' },
  ])
  
  useEffect(() => {
    if (show === 'work') {
      gsap.to(descrContainerRef.current, {
        duration: 1,
        opacity: 1,
        x: 0,
        display: 'flex'
      });
    }
    else {
      gsap.to(descrContainerRef.current, {
        duration: 1,
        opacity: 0,
        x: -100,
        display: 'none'
      });
    }
  }, [show]);
  return (
    <>
      <div className="w-full h-full overflow-hidden flex justify-center">
        <div className="flex flex-col w-full h-full justify-center items-center gap-9">
          <div ref={descrContainerRef} className="w-full flex flex-col gap-4 px-8">
            <strong className="text-5xl md:text-6xl font-tektur">Works</strong>
            <div className="text-lg md:text-2xl">
              <p className="font-roboto"> Know a few of my 
              <TypeAnimation
                className={"font-roboto"}
                style={{color:'var(--secondary-color)'}}
                sequence={[
                  ' comercial ',
                  1000,
                  ' 3D ',
                  1000,
                  ' backend ',
                  1000,
                ]}
                speed={1}
                repeat={Infinity}
                cursor={true}
              />
              projects.
              </p>
            </div>
            <div className="w-[40%] h-[2px]" style={{backgroundColor:'var(--secondary-color)'}}></div>
          </div>
          <div className="relative w-full h-[60%]">
            <Carrousel show={show} cards={cards.current} initialCardId={'workBeatBliss'} />
          </div>
        </div>
      </div>
    </>
  )
}

 