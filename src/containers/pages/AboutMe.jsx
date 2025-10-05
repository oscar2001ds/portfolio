"use client"

import { gsap } from "gsap"
import { useState, useRef, useEffect } from "react"

export const AboutMe = ({ show, data }) => {
  const descrContainerRef = useRef(null)
  const [first, setFirst] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const fullText = data?.description ?? ""
  
  useEffect(() => {
    if (show === "aboutme") {
      gsap
        .to(descrContainerRef.current, {
          duration: 1,
          opacity: 1,
          x: 0,
        })
        .then(() => {
          if (!first) {
            setIsTyping(true)
            setFirst(true)
          }
        })
    } else {
      gsap.to(descrContainerRef.current, {
        duration: 1,
        opacity: 0,
        x: 100,
      })
    }
  }, [show])

  useEffect(() => {
    if (!isTyping) return

    let currentIndex = 0
    const typingSpeed = 15 // milliseconds per character

    const typeNextChar = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1))
        currentIndex++
        setTimeout(typeNextChar, typingSpeed)
      } else {
        setIsTyping(false)
      }
    }

    typeNextChar()

    return () => {
      currentIndex = fullText.length
    }
  }, [isTyping])

  const renderText = (text) => {
    const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean)

    return parts.map((part, index) => {
      if (part.startsWith("*") && part.endsWith("*")) {
        const content = part.slice(1, -1)
        return (
          <span key={index} style={{ color: "var(--secondary-color)" }}>
            {content}
          </span>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  return (
    <div className="relative z-10 w-full h-full overflow-hidden flex pt-10 justify-center items-start lg:justify-start lg:items-center lg:pl-20">
      <div
        ref={descrContainerRef}
        className="flex flex-col justify-center h-full gap-6 items-center w-[80vw] sm:w-[80vw] lg:w-[700px] lg:h-[700px] lg:items-start lg:gap-10 lg:px-20 xl:w-[900px] xl:h-[600px]"
      >
        <div>
          <div className="font-orbitron font-bold xs:text-4xl sm:text-7xl">
            About{" "}
            <div className="inline xs:text-4xl sm:text-7xl" style={{ color: "var(--secondary-color)" }}>
              Me
            </div>
          </div>
        </div>

        {(show === "aboutme" || first) && (
          <div className="overflow-hidden w-full h-full text-xs xs:text-[1rem] xs:leading-[1.4rem] sm:text-xl md:text-2xl lg:text-3xl">
            <div className="font-roboto">
              {renderText(displayedText)}
              {isTyping && <span className="animate-pulse">|</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
