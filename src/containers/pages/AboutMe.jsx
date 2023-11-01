import { TypeAnimation } from "react-type-animation"
import { gsap } from "gsap";
import { useState, useRef, useEffect } from "react"

export const AboutMe = ({ show }) => {
  const descrContainerRef = useRef(null)
  const [first, setFirst] = useState(false)

  useEffect(() => {
    if (show === 'aboutme') {
      gsap.to(descrContainerRef.current, {
        duration: 1,
        opacity: 1,
        x: 0,
      }).then(() => {
        setTimeout(() => {
          setFirst(true)
        }, 5000)

      })
    }
    else {
      gsap.to(descrContainerRef.current, {
        duration: 1,
        opacity: 0,
        x: 100,
      });
    }

  }, [show]);

  return (
    <>
      <div className="relative z-10 w-full h-full overflow-hidden flex pt-10 justify-center items-start lg:justify-start lg:items-center lg:pl-20">
        <div ref={descrContainerRef} className="flex flex-col justify-center h-full gap-6 items-center w-[80vw] sm:w-[80vw] lg:w-[700px] lg:h-[700px] lg:items-start lg:gap-10 lg:px-20 xl:w-[900px] xl:h-[600px]">
          <div >
            <div className="font-orbitron font-bold xs:text-4xl sm:text-7xl ">About <div className="inline xs:text-4xl sm:text-7xl" style={{ color: 'var(--secondary-color)', }}>Me</div></div>
            {/* <div className="relative flex w-full justify-center">
                  <div className="absolute w-[30vh] h-[30vh] rounded-full bg-gradient-to-l from-red-800 via-red-900 to-gray-300">
                  </div>
                  <div className="w-[30vh] h-[30vh] bg-contain bg-no-repeat bg-center rounded-full z-10" style={{ backgroundImage: `url(${homeImage})` }}>
                  </div>
                </div> */}
          </div>

          {
            show == 'aboutme' || first
              ?
              < div className="overflow-hidden w-full h-full text-xs xs:text-[1rem] xs:leading-[1.4rem] sm:text-xl md:text-2xl lg:text-3xl">
                <div>
                  <TypeAnimation
                    className="font-roboto"
                    sequence={[
                      "I'm Oscar, an engineer with a strong passion for robotics. Despite my background in mechatronics, my primary focus has shifted towards web development, where I take pleasure in crafting exceptional ",
                      1000,
                    ]}
                    speed={85}
                    repeat={0}
                    cursor={false}
                  />
                  <TypeAnimation
                    className="font-roboto"
                    style={{ color: 'var(--secondary-color)' }}
                    sequence={[
                      "",
                      3000,
                      "digital experiences,",
                      1,

                    ]}
                    speed={85}
                    repeat={0}
                    cursor={false}
                  />
                  <TypeAnimation
                    className="font-roboto"
                    sequence={[
                      "",
                      3500,
                      " always with a keen eye on achieving outstanding results.",
                      1,

                    ]}
                    speed={85}
                    repeat={0}
                    cursor={true}
                  />
                </div>
              </div>
              : null
          }
        </div>
      </div >
    </>
  )
}
