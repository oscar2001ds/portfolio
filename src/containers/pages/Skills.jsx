import { gsap } from "gsap"
import { useEffect, useRef, useState } from "react"
import { LoaderSkillsBalls } from "../../components/LoaderSkillsBalls"
import { globalVariables } from "../../store/globalStore"



const LevelCard = ({ side, show, delayInAnimation, level, fileObj, pageMode }) => {
  const [initialColorNumber, setInitialColorNumber] = useState(null)
  const [levelBarClass, setLevelBarClass] = useState(null)
  const [levelBarClassActive, setLevelBarClassActive] = useState(null)
  const [passPageMode, setPassPageMode] = useState(null)
  const animateDelays = ['', 'animate-delay-100', 'animate-delay-200', 'animate-delay-300',
    'animate-delay-400', 'animate-delay-500', 'animate-delay-600', 'animate-delay-700',
    'animate-delay-800', 'animate-delay-900']
  const descrContainerRef = useRef(null)
  const [animPosEnd, setAnimPosEnd] = useState(null)
  const [firstTextAnimation, setFirstTextAnimation] = useState(null)

  useEffect(() => {
    if (passPageMode === pageMode) return
    const lBC = `flex w-[20px] md:w-[2vw] justify-center items-center border rounded select-none font-bold animate-duration-75 transition duration-100 text-xs ${pageMode === 'red' ? 'border-red-900' : pageMode === 'blue' ? 'border-blue-900' : ''}`
    setLevelBarClass(lBC)
    const lBCA = `${pageMode === 'red' ? 'hover:text-red-800 bg-gradient-to-t from-[#69140f] via-black to-cyan-800' : pageMode === 'blue' ? 'hover:text-white bg-gradient-to-t from-black via-cyan-700 to-[#0dc7fa]' : ''}`
    setLevelBarClassActive(lBCA)
    const iCN = `${pageMode === 'red' ? 'text-red-800' : pageMode === 'blue' ? 'text-white' : ''}`
    setInitialColorNumber(iCN)
    setPassPageMode(pageMode)


  }, [pageMode, []]);

  useEffect(() => {
    if (show === 'skills') {
      gsap.to(descrContainerRef.current, {
        duration: 0.5,
        delay: delayInAnimation,
        opacity: 1,
        x: 0,
        display: 'flex',
        visibility: 'visible',
      }).then(() => { setAnimPosEnd(true) })
    }
    else {
      setAnimPosEnd(false)
      if (side === 'left') {
        gsap.to(descrContainerRef.current, {
          duration: 1,
          opacity: 0,
          x: -100,
          visibility: 'hidden',
        });
      }
      else if (side === 'right') {
        gsap.to(descrContainerRef.current, {
          duration: 1,
          opacity: 0,
          x: 100,
          visibility: 'hidden',
        });
      }
    }
  }, [show, delayInAnimation]);


  useEffect(() => {
    let timer1;
    let timer2;
    if (show === 'skills') {
      timer1 = setTimeout(() => {
        setFirstTextAnimation(true)
      }, 3000)
      timer2 = setTimeout(() => {
        setFirstTextAnimation(false)
      }, 5000);
    }
    else {
      try {
        clearTimeout(timer1);
      }
      catch (error) { }
      try {
        clearTimeout(timer2);
      }
      catch (error) { }
    }

  }, [show]);

  return (
    <>
      <div ref={descrContainerRef} className="flex items-center">
        {side === 'left' ? <div className="relative flex w-[17vh] h-full justify-center items-center bg-transparent"><LoaderSkillsBalls fileId={Object.keys(fileObj)[0]} fileName={Object.values(fileObj)[0]} /></div> : null}
        <div id={Object.values(fileObj)[0]} className="flex bg-transparent h-[5vh] p-2 transform -skew-x-12">
          {
            animateDelays.map((delay, index) => {
              if (side === 'left') {
                if (index < level) return <div key={side + index.toString()} className={`${levelBarClass} ${animPosEnd ? 'animate-fade-right' : 'invisible'} ${delay} ${firstTextAnimation ? initialColorNumber : 'text-transparent'} ${levelBarClassActive}`}>{index + 1}</div>
                else return <div key={side + index.toString()} className={`${levelBarClass} ${animPosEnd ? 'animate-fade-right' : 'invisible'} ${delay} bg-transparent`}></div>
              }
              else {
                if (index < 10 - level) return <div key={side + index.toString()} className={`${levelBarClass} ${animPosEnd ? 'animate-fade-left' : 'invisible'} ${animateDelays[9 - index]} bg-transparent`}></div>
                else return <div key={side + index.toString()} className={`${levelBarClass} ${animPosEnd ? 'animate-fade-left' : 'invisible'} ${animateDelays[9 - index]}  ${firstTextAnimation ? initialColorNumber : 'text-transparent'} ${levelBarClassActive}`}>{10 - index}</div>
              }

            })
          }
        </div>
        {side === 'right' ? <div className="relative flex w-[17vh] h-full justify-center items-center bg-transparent"><LoaderSkillsBalls fileId={Object.keys(fileObj)[0]} fileName={Object.values(fileObj)[0]}/></div> : null}
      </div>
    </>
  )
}


const EmergentMsg = ({ show, pageMode }) => {
  const [animationEndHoverTec, setAnimationEndHoverTec] = useState(true)
  const { modelTecHovered, maxWidth, maxHeight } = globalVariables()
  const [first, setFirst] = useState(true)
  const [firstAnimStart, setFirstAnimStart] = useState(true)
  const [firstAnimEnd, setFirstAnimEnd] = useState(false)
  const EmergentMsgRefContainer = useRef(null)
  const [modelHoverdPosx, setModelHoverdPosx] = useState(0)
  const [modelHoverdPosy, setModelHoverdPosy] = useState(0)
  

  useEffect(() => {
    if (maxWidth >= 1024 && modelTecHovered != '') {

      setFirst(false)
      setFirstAnimStart(false)
      setFirstAnimEnd(true)
      return
    }

    else if (maxWidth < 1024 && modelTecHovered != '') {
      setFirst(false)
      setFirstAnimStart(false)
      setFirstAnimEnd(true)
      setModelHoverdPosx(document.getElementById(modelTecHovered).getBoundingClientRect().x)
      setModelHoverdPosy(document.getElementById(modelTecHovered).getBoundingClientRect().y)

    }
    
  }, [modelTecHovered]);

  useEffect(() => {
    let timer1;

    if (show === 'skills') {
      timer1 = setTimeout(() => {
        setFirst(true)
        setFirstAnimStart(true)
        setFirstAnimEnd(false)
      }, 800);
    }
    else {
      setFirst(true)
      setFirstAnimStart(false)
      setFirstAnimEnd(true)
    }
    const timer2 = setTimeout(() => {
      setFirstAnimStart(false)
    }
      , 8000);
    return () => {
      try {
        clearTimeout(timer1);
      } catch (error) { }
      clearTimeout(timer2);
    }
  }, [show]);


  const txts = {
    'jsDode.gltf': 'I have worked with javascript on personal and work projects.',
    'reactDode.gltf': 'React is my favorite library, just tell me what page you want and I will make it.',
    'threejsDode.gltf': 'With the help of threeJs I will create a 3D experience for you.',
    'pythonDode.gltf': 'I have worked with Python for more than 4 years in various applications.',
    'djangoDode.gltf': 'I have knowledge in creating apis with django.',
    'blenderDode.gltf': 'I can create 3D models and animations with Blender.',
  }

  const handleHoverTec = (ev) => {
    if (ev.type === "animationend") {
      if (ev.animationName === "flip-up") {
        setAnimationEndHoverTec(false)
      }
      if (ev.animationName === "flip-up-reverse") {
        setAnimationEndHoverTec(true)
      }
    }
  }

  const handleFirst = (ev) => {
    if (ev.type === "animationend") {
      if (ev.animationName === "flip-up-reverse") {
        setFirstAnimEnd(true)
        setFirst(false)
      }
    }
  }
  
  return (
    <>
      {
          first
            ?
            <div id="firstmsg" className={"absolute z-20 pointer-events-none overflow-hidden flex h-[10vh] w-[10vw] bg-[#242424] shadow-md items-center justify-start opacity-90 border animate-once animate-duration-500 " +
              (firstAnimStart ? 'animate-flip-up ' : firstAnimEnd ? 'hidden ' : 'animate-flip-up-reverse ') + (pageMode === 'red' ? 'shadow-red-950 border-red-950 ' : pageMode === 'blue' ? 'shadow-blue-950 border-blue-950 ' : ' ')} onAnimationEnd={handleFirst}
              style={
                {
                  height: maxWidth>1024 ? '10vh' : '100px',
                  width: maxWidth>1024 ? '10vw' : '200px',
                  top: maxWidth>1024 ? '18%' : maxHeight*0.5-50,
                  left: maxWidth>1024 ? '55%' : maxWidth*0.5-100,
                }
              }>
              <p className="text-xs p-2 text-white opacity-100 font-handjet">
                Go over the polygons and I'll tell you about my skills
              </p>
            </div>
            :

            <div ref={EmergentMsgRefContainer} className={"absolute z-20 pointer-events-none overflow-hidden flex bg-[#242424] shadow-md items-center justify-start opacity-90 border animate-once animate-duration-500 " +
              (modelTecHovered != '' ? 'animate-flip-up ' : animationEndHoverTec ? 'hidden ' : 'animate-flip-up-reverse ') + (pageMode === 'red' ? 'shadow-red-950 border-red-950 ' : pageMode === 'blue' ? 'shadow-blue-950 border-blue-950 ' : ' ')} onAnimationEnd={handleHoverTec}
              style={
                {
                  height: maxWidth>1024 ? '10vh' : '80px',
                  width: maxWidth>1024 ? '10vw' : '200px',
                  top: maxWidth>1024 ? '18%' :modelHoverdPosy-20,
                  left: maxWidth>1024 ? '55%' :modelHoverdPosx,
                }
              }>
              <p className="text-xs p-2 text-white opacity-100 font-handjet">
                {
                  modelTecHovered != '' ? txts[modelTecHovered] : null
                }
              </p>
            </div>

      }
    </>
  )
}


export const Skills = ({ show }) => {
  const { pageMode } = globalVariables()
  const files = useRef([{ball1:'jsDode.gltf'},{ball2: 'reactDode.gltf'},{ball3: 'threejsDode.gltf'},
  {ball4:'pythonDode.gltf'}, {ball5:'djangoDode.gltf'}, {ball6:'blenderDode.gltf'}])


  return (
    <>
      <div className="relative flex w-full h-full overflow-hidden">
        <EmergentMsg show={show} pageMode={pageMode} />
        <div className="grid w-full h-full grid-cols-1 gap-0 pb-10 md:grid-cols-2 md:gap-24 md:pb-0 md:px-10">
          <div className="flex justify-start w-full h-[14vh]">
            <LevelCard side={'left'} fileObj={files.current[0]} show={show} delayInAnimation={0.3} level={6} pageMode={pageMode} />
          </div>
          <div className="flex justify-end w-full h-[14vh]">
            <LevelCard side={'right'} fileObj={files.current[3]} show={show} delayInAnimation={0.3} level={6} pageMode={pageMode} />
          </div>
          <div className="flex justify-start w-full h-[14vh]">
            <LevelCard side={'left'} fileObj={files.current[1]} show={show} delayInAnimation={0.6} level={7} pageMode={pageMode} />
          </div>
          <div className="flex justify-end w-full h-[14vh]">
            <LevelCard side={'right'} fileObj={files.current[4]} show={show} delayInAnimation={0.6} level={5} pageMode={pageMode} />
          </div>
          <div className="flex justify-start w-full h-[14vh]">
            <LevelCard side={'left'} fileObj={files.current[2]} show={show} delayInAnimation={0.9} level={4} pageMode={pageMode} />
          </div>
          <div className="flex justify-end w-full h-[14vh]">
            <LevelCard side={'right'} fileObj={files.current[5]} show={show} delayInAnimation={0.9} level={4} pageMode={pageMode} />
          </div>
         
        </div>

      </div >
    </>
  )
}
