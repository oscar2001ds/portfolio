import { LoaderRobot } from "../../components/LoaderRobot";
import { globalVariables } from "../../store/globalStore";
import { useRef, useState, useEffect } from "react"
import { gsap } from "gsap";
import labotaroryBlueImage from '../../../public/img/laboratory_blue.png';
import labotaroryRedImage from '../../../public/img/laboratory_red.png';
import capsuleRed from '../../../public/img/capsule_red.png';
import capsuleBlue from '../../../public/img/capsule_blue.png';
import labItemsRed from '../../../public/img/lab_items_red.png';
import labItemsBlue from '../../../public/img/lab_items_blue.png';



export const Experience3D = ({ show }) => {
  const [animationEndHoverRobot, setAnimationEndHoverRobot] = useState(true)
  const labContainerRef = useRef(null)
  const capsuleContainerRef = useRef(null)
  const labItemsContainerRef = useRef(null)
  const robotContainerRef = useRef(null)
  const [robotModelHovered, setRobotModelHovered] = useState(null)
  const { setAnimation, pageMode, maxHeight, setMaxHeight, maxWidth, setMaxWidth, setRobotScale, pageLoaded } = globalVariables()
  const [passWidth, setPassWidth] = useState(0)
  const [robotContainerDimensions, setRobotContainerDimensions] = useState([0, 0])
  const [prevShow, setPrevShow] = useState('home')
  const [resizeFlag, setResizeFlag] = useState(false)


  const handleHoverRobot = (ev) => {
    if (ev.type === "animationend") {
      if (ev.animationName === "flip-up") {
        setAnimationEndHoverRobot(false)
      }
      if (ev.animationName === "flip-up-reverse") {
        setAnimationEndHoverRobot(true)
      }
    }
    else if (ev.type === "mouseenter") {
      setRobotModelHovered(true)
    }
    else if (ev.type === "mouseleave") {
      setRobotModelHovered(false)
    }
  }

  useEffect(() => {
    const updateMaxDimensions = () => {
      setMaxHeight(window.innerHeight);
      setMaxWidth(window.innerWidth);
      setRobotContainerDimensions([robotContainerRef.current.clientWidth, robotContainerRef.current.clientHeight]);
      setResizeFlag(true);
    }

    updateMaxDimensions();
    window.addEventListener('resize', updateMaxDimensions);

    return () => {
      window.removeEventListener('resize', updateMaxDimensions);
    };
  }, []);

  // Laboratory, capsule animation
  useEffect(() => {
    // Laboratory
    if (show === 'aboutme') {
      gsap.to(labContainerRef.current, {
        duration: 1,
        opacity: 1,
        x: 0,
      });
    }
    else {
      gsap.to(labContainerRef.current, {
        duration: 1,
        opacity: 0,
        x: -200,
      });
    }

    // Capsule
    if (show === 'skills') {
      gsap.to(capsuleContainerRef.current, {
        duration: 1,
        opacity: 1,
        y: 0,
      });
    }
    else {
      gsap.to(capsuleContainerRef.current, {
        duration: 1,
        opacity: 0,
        y: 100,
      });
    }

  }, [show]);


  // robot animations
  useEffect(() => {
    if (!pageLoaded) return;
    if (prevShow === 'home' && show === 'home' || prevShow === 'aboutme' && show === 'home') {
      let posX = (labContainerRef.current.offsetLeft + labContainerRef.current.clientWidth / 2) - robotContainerDimensions[0] / 2;
      let posY = (labContainerRef.current.offsetTop * 0.98 + labContainerRef.current.clientHeight / 2) - robotContainerDimensions[1] / 2;

      if (prevShow === 'home') {
        console.log('Estoy en firstAnimation')
        setAnimation('firstAnimation')
        gsap.to(robotContainerRef.current, {
          opacity: 1,
          x: `${posX - 200}px`,
          y: `${0}px`,
          duration: 0.01,
        });
      }
      else {
        gsap.to(robotContainerRef.current,
          {
            opacity: 0,
            x: `${posX - 200}px`,
            y: `${posY}px`,
            duration: 1,
          });
      }

      setPrevShow('home')
      setResizeFlag(false)
    }

    else if (show === 'work') {
      setPrevShow('work')
    }

    //Aboutme movements
    else if (prevShow != 'aboutme' && show === 'aboutme' || show === 'aboutme' && resizeFlag) {

      let posX = (labContainerRef.current.offsetLeft + labContainerRef.current.clientWidth / 2) - robotContainerDimensions[0] / 2;
      let posY = (labContainerRef.current.offsetTop * 0.98 + labContainerRef.current.clientHeight / 2) - robotContainerDimensions[1] / 2;

      if (!resizeFlag) {
        if (prevShow === 'home') {
          gsap.to(robotContainerRef.current, {
            duration: 1,
            opacity: 1,
            x: `${posX}px`,
            y: `${posY}px`,
          });
          setRobotScale('scale_normal')
          setAnimation('secuencia1_1')
          setPrevShow('aboutme')
        }
        else if (prevShow === 'skills' || prevShow === 'contact' || prevShow === 'work') {
          gsap.to(robotContainerRef.current, {
            duration: 1,
            opacity: 1,
            x: `${posX}px`,
            y: `${posY}px`,

          });
          setRobotScale('scale_normal')
          setAnimation('secuencia1_2')
          setPrevShow('aboutme')
        }

      }
      else {
        gsap.to(robotContainerRef.current, {
          duration: 0.01,
          opacity: 1,
          x: `${posX}px`,
          y: `${posY}px`,
        })
        if (maxWidth < 1024 && passWidth >= 1024) {
          setRobotScale('scale_normal')
          setAnimation('secuencia1_1')
        }
        else if (maxWidth >= 1024 && passWidth < 1024) {
          setRobotScale('scale_normal')
          setAnimation('secuencia1_1')
        }

      }
      setResizeFlag(false)
    }

    // Skills movements
    else if (prevShow != 'skills' && show === 'skills' || show === 'skills' && resizeFlag) {

      let posX = (capsuleContainerRef.current.offsetLeft + capsuleContainerRef.current.clientWidth / 2) - robotContainerDimensions[0] / 2;
      let posY = (capsuleContainerRef.current.offsetTop * 0.95 + capsuleContainerRef.current.clientHeight / 2) - robotContainerDimensions[1] / 2;


      if (maxWidth >= 768) {
        gsap.to(robotContainerRef.current, {
          duration: 0.1,
          opacity: 1,

        });
      }
      else if (maxWidth >= 320 && maxWidth < 768) {
        gsap.to(robotContainerRef.current, {
          duration: 0.1,
          opacity: 0,
        });
      }

      if (!resizeFlag) {
        if (prevShow === 'aboutme' || prevShow === 'home') {
          gsap.to(robotContainerRef.current, {
            duration: 1,
            opacity: 1,
            x: `${posX}px`,
            y: `${posY}px`,

          });
          if (maxWidth >= 768) {
            setRobotScale('scale_normal')
            setAnimation('secuencia1_3')
          }
          setPrevShow('skills')
        }
        else if (prevShow === 'contact' || prevShow === 'work') {
          if (maxWidth >= 768) {
            gsap.fromTo(robotContainerRef.current, {
              duration: 0,
              opacity: 1,
              x: `${posX}px`,
              y: `${maxHeight * 3.2 - robotContainerDimensions[1] / 2}px`,

            }, {
              duration: 1,
              opacity: 1,
              x: `${posX}px`,
              y: `${posY}px`,
            })
            setRobotScale('scale_normal')
            setAnimation('secuencia1_3')
          }
          else {
            gsap.to(robotContainerRef.current, {
              duration: 0,
              opacity: 1,
              x: `${posX}px`,
              y: `${posY}px`,

            });
          }
          setPrevShow('skills')
        }
      }
      else {
        gsap.to(robotContainerRef.current, {
          duration: 0.01,
          opacity: 1,
          x: `${posX}px`,
          y: `${posY}px`,

        })
      }
      setResizeFlag(false)
    }

    // contact movements
    else if (show === 'contact' || resizeFlag) {

      let posX = (labItemsContainerRef.current.offsetLeft * 0.9 + labItemsContainerRef.current.clientWidth / 2) - robotContainerDimensions[0] / 2;
      let posY = (labItemsContainerRef.current.offsetTop + labItemsContainerRef.current.clientHeight / 2) - robotContainerDimensions[1] / 2;

      if (!resizeFlag) {
        if (maxWidth >= 768) {
          gsap.fromTo(robotContainerRef.current, {
            duration: 1,
            opacity: 0,
            x: `${maxWidth * 0.58 - robotContainerDimensions[0] / 2}px`,
            y: `${maxHeight * 5 - robotContainerDimensions[1] / 2}px`,
          }, {
            duration: 1,
            opacity: 1,
            x: `${posX}px`,
            y: `${posY}px`,
          })
          setRobotScale('scale_up2')
          setAnimation('secuencia1_4')
          setPrevShow('contact')
        }
        else {
          gsap.to(robotContainerRef.current, {
            duration: 1,
            opacity: 1,
            x: `${maxWidth * 0.5 - robotContainerDimensions[0] / 2}px`,
            y: `${maxHeight * 5.1 - robotContainerDimensions[1] / 2}px`,
          })
          setRobotScale('scale_up2')
          setAnimation('secuencia1_4')
          setPrevShow('contact')
        }

      }
      else {
        if (maxWidth >= 768) {
          gsap.to(robotContainerRef.current, {
            duration: 0,
            opacity: 1,
            x: `${posX}px`,
            y: `${posY}px`,
          })
        }
        else {
          gsap.to(robotContainerRef.current, {
            duration: 0,
            opacity: 1,
            x: `${maxWidth * 0.5 - robotContainerDimensions[0] / 2}px`,
            y: `${maxHeight * 5.1 - robotContainerDimensions[1] / 2}px`,
          })
        }
      }
      setResizeFlag(false)
    }

    setPassWidth(maxWidth);
  }, [show, robotContainerDimensions, pageLoaded]);

  return (
    <div className="absolute w-full overflow-hidden" style={{ height: `${maxWidth < 1024 ? maxHeight * 5.5 : maxHeight * 5}px` }} >

      {/* laboratory (888/721 es la relación del ancho y alto de la imagen)*/}
      <div ref={labContainerRef} className="absolute z-0 w-full lg:h-full lg:left-[200px] lg:w-[120%] lg:py-20"
        style={{ top: `${maxWidth >= 1024 ? maxHeight * 1.0 : maxHeight * 1.4}px`, height: `${maxWidth >= 1024 ? maxHeight : maxHeight * 0.5}px` }}>
        <img
          style={{
            width: '100%',
            height: '100%',
            objectFit: `${maxWidth / (maxHeight * 0.5) > 888 / 721 ? 'contain' : 'cover'}`,
            transform: 'rotateY(180deg)',
          }}
          src={`${pageMode === 'red' ? labotaroryRedImage : pageMode === 'blue' ? labotaroryBlueImage : ''}`}
          alt="laboratory"
        />
      </div>

      {/* capsule */}
      <div ref={capsuleContainerRef} className="absolute h-full w-[320px] z-0 inset-x-0 mx-auto hidden lg:flex"
        style={{ top: `${maxHeight * 2.0}px`, height: `${maxHeight}px` }}>
        <img
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'fill',
          }}
          src={`${pageMode === 'red' ? capsuleRed : pageMode === 'blue' ? capsuleBlue : ''}`}
          alt="capsule"
        />
      </div>

      {/* lab items */}
      <div ref={labItemsContainerRef} className="absolute z-0 flex w-full h-[300px] right-0 lg:w-[550px] lg:h-[550px] lg:right-[5%]"
        style={{ top: `${maxWidth > 1024 ? maxHeight * 4.1 : maxWidth > 768 ? maxHeight * 4.9 : maxHeight * 4.95}px` }}>
        <img
          style={{
            width: '100%',
            height: '100%',
            objectFit: `contain`,
          }}
          src={`${pageMode === 'red' ? labItemsRed : pageMode === 'blue' ? labItemsBlue : ''}`}
          alt="labItems"
        />
      </div>

      {/* robot */}
      <div id="robotContainerId" ref={robotContainerRef} className={`opacity-0 absolute z-20 overflow-visible pointer-events-none lg:pointer-events-auto xs:w-[300px] lg:w-[500px] `} style={{ height: `${maxWidth >= 1024 ? maxHeight * 0.83 : maxHeight * 0.5}px`, }}>
        <LoaderRobot />
        <div onMouseEnter={handleHoverRobot} onMouseLeave={handleHoverRobot} className="absolute top-[20%] left-[40%] w-[20%] h-[60%]"></div>
        <div className={(show === 'skills' || show === 'contact' ? 'hidden ' : '') + "absolute pointer-events-none overflow-hidden w-[100px] flex h-[10vh]  bg-[#242424] shadow-md items-center justify-start opacity-90 border animate-once animate-duration-500 " +
          (robotModelHovered ? 'animate-flip-up ' : animationEndHoverRobot ? 'hidden ' : 'animate-flip-up-reverse ') + (pageMode === 'red' ? 'shadow-red-950 border-red-950 ' : pageMode === 'blue' ? 'shadow-blue-950 border-blue-950 ' : ' ')}
          onAnimationEnd={handleHoverRobot}
          style={{
            top: `${maxHeight * 0.15}px`,
            left: `${maxWidth > 1024 ? maxWidth * 0.15 : maxWidth > 640 ? maxWidth * 0.40 : maxWidth * 0.44}px`,
          }}>
          <p className="text-xs text-white opacity-100">
            Me gustan los carros deportivos y los supercoches.
          </p>
        </div>
      </div>
    </div>
  )
}