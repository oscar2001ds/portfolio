import gsap from "gsap"
import { useEffect, useRef, useState } from "react"
import { globalVariables } from "../store/globalStore"



export const PageMode = () => {
    const {pageMode, setPageMode } = globalVariables()
    const modeContainer = useRef(null)

    useEffect(() => {
        const interval = setInterval(() => {
            gsap.fromTo(modeContainer.current, {
                x: 0,
                y: -10,
                duration: 0.5,
                repeat: 1,
                ease: 'power2.inOut',
            }, {
                x: 0,
                y: 0,
                duration: 0.5,
                repeat: 1,
                ease: 'power2.inOut',
                yoyo: true,
            })
        }, 5000)
        
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (pageMode === 'red') {
            document.documentElement.style.setProperty('--secondary-color', 'var(--secondary-color-1)')
        }
        else if (pageMode === 'blue') {
            document.documentElement.style.setProperty('--secondary-color', 'var(--secondary-color-2)')
        }
    }, [pageMode]);
    
    const handleClick = () => {
        if (pageMode === 'red') {
            setPageMode('blue')
        }
        else if (pageMode === 'blue') {
            setPageMode('red')
        }
    }

    return (
        <div ref={modeContainer} className={`fixed z-40 m-5 rounded-full w-[30px] h-[30px] flex justify-center items-center bg-black overflow-hidden cursor-pointer border-gray-300 border-2 ${pageMode === 'red' ? 'hover:bg-cyan-800' : 'hover:bg-red-900'}`} onClick={handleClick}>
            {pageMode === 'red' ? <div>🥏</div> : pageMode==='blue' ? <div>💀</div> : ''}
        </div>
    )
}
