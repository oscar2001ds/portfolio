import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { globalVariables } from "../store/globalStore"

export const WorkCard = ({ id, img, title, tecs, desc, currentCard, setCurrentCard, pageDir, codeDir }) => {
  const colors = ['bg-yellow-600', 'bg-blue-300', 'bg-transparent border-[1px] rounded-full', 'bg-indigo-300', 'bg-purple-300', 'bg-pink-300', 'bg-gray-300', 'bg-yellow-300']
  const [pointer, setPointer] = useState(true)
  const { pageMode } = globalVariables()
  const [passPageMode, setPassPageMode] = useState(null)

  const [colorCard, setColorCard] = useState({
    'bgCard': 'bg-red-900',
    'bgHoverCard': 'hover:bg-red-600',
    'bgImg': 'bg-red-400',
    'bgVisit': 'bg-orange-700',
    'bgVisitHover': 'hover:bg-orange-500',
  })

  const handleClick = (e) => {
    setCurrentCard(id)
  }

  useEffect(() => {
    if (passPageMode === pageMode) return
    let colCard = {}
    if (pageMode === 'red') {
      colCard = {
        'bgCard': 'bg-red-900',
        'bgHoverCard': 'sm:hover:bg-red-600',
        'bgImg': 'bg-red-400',
        'bgVisit': 'bg-gradient-to-r from-[#69140f] via-black to-cyan-950 opacity-70',
        'bgVisitHover': 'hover:opacity-100',
      }
      setColorCard(colCard)
    }
    else if (pageMode === 'blue') {
      colCard = {
        'bgCard': 'bg-[#24628bff]',
        'bgHoverCard': 'sm:hover:bg-blue-600',
        'bgImg': 'bg-gray-300',
        'bgVisit': 'bg-gradient-to-r from-gray-500 via-cyan-700 to-[#0dc7fa] opacity-70',
        'bgVisitHover': 'hover:opacity-100',
      }
      setColorCard(colCard)
    }
    setPassPageMode(pageMode)
  }, [pageMode, []]);

  useEffect(() => {
    if (currentCard === id) {
      setPointer(false)
    } else {
      setPointer(true)
    }
  }, [currentCard]);

  return (
    <>
      <div id={id} className={`flex ${pointer ? 'cursor-pointer' : ''}`} onClick={handleClick}>
        <div className={`w-[250px] h-[44vh] rounded-xl ${colorCard.bgCard} overflow-hidden flex flex-col ${pointer ? colorCard.bgHoverCard+' sm:hover:-translate-y-2' : 'translate-y-0'}`}>
          <div className={`h-[50%] rounded-lg m-[0.38rem] overflow-hidden ${colorCard.bgImg}`}>
            <img src={`img/${img} `} alt="" className="w-full h-full object-cover" style={{objectFit:'cover'}} />
          </div>
          <div className="font-bold text-lg flex justify-start mx-[0.38rem] pointer-events-none">
            {title}
          </div>
          <div className="flex">
            {
              tecs.map((tec, index) => {
                return (
                  <div key={uuidv4()} className={`${colors[index]} rounded-md flex justify-center overflow-hidden px-1 ml-[0.38rem] pointer-events-none`} style={{ fontSize: '0.5rem', lineHeight: '0.8rem' }}>
                    {tec}
                  </div>
                )
              })
            }
          </div>
          <div className="flex-grow rounded-md overflow-hidden m-[0.38rem] text-gray-300 text-start text-xs pointer-events-none">
            {desc}
          </div>
          <div className="flex items-center m-[0.38rem] mt-auto gap-1">
            <a href={`${codeDir}`} target='_blank' className={`rounded-lg bg-gray-500 px-1 overflow-hidden text-sm font-bold pb-[0.2rem] opacity-70 ${pointer ? '' : 'cursor-pointer hover:opacity-100'}`}>{'</>'}</a>
            <a href={`${pageDir}`} target='_blank' className={`rounded-lg ${colorCard.bgVisit} px-1 overflow-hidden text-sm font-bold pb-[0.2rem] ${pointer ? '' : colorCard.bgVisitHover+' cursor-pointer'} flex flex-grow justify-center`}>visit</a>
          </div>
        </div>
      </div>
    </>
  )
}