import { useState, useEffect, useRef } from "react"
import { WorkCard } from "./WorkCard"
import { gsap } from "gsap"
import { globalVariables } from "../store/globalStore"


export const Carrousel = ({ show, cards, initialCardId }) => {
    const [currentCard, setCurrentCard] = useState(initialCardId)
    const [cardsIds, setCardsIds] = useState([])
    const { pageMode } = globalVariables()
    const [passPageMode, setPassPageMode] = useState(null)
    const [buttonsColor, setButtonsColor] = useState(null)
    const [startX, setStartX] = useState(null)
    const [startY, setStartY] = useState(null)
    const [proxCard, setProxCard] = useState(null)
    const carrouselContainerRef = useRef(null)


    useEffect(() => {
        if (passPageMode === pageMode) return
        if (pageMode === 'red') {
            setButtonsColor('bg-red-800 hover:bg-red-600')
        }
        else if (pageMode === 'blue') {
            setButtonsColor('bg-cyan-700 [hover:bg-blue-600')
        }
        setPassPageMode(pageMode)
    }, [pageMode, []]);

    useEffect(() => {
        if (show === 'work') {
            const ids = cards.map(card => card.id)
            setCardsIds(ids)
            const indexCurrentCard = ids.indexOf(currentCard)
            const currentPosXcurrentCard = document.getElementById(currentCard).getBoundingClientRect().x
            ids.forEach((id, index) => {
                const currentPosX = document.getElementById(id).getBoundingClientRect().x
                const offsetX = Math.abs(currentPosXcurrentCard - currentPosX)
                if (id === currentCard) {
                    gsap.fromTo(`#${currentCard}`, { opacity: 0.1, y: 100 }, { opacity: 1, duration: 0.75, position: 'absolute', x: 0, y: 0, })
                }
                else if (index < indexCurrentCard) {
                    gsap.fromTo(`#${id}`, { opacity: 0.1, x: -600, }, { opacity: 0.1, duration: 0.75, position: 'absolute', x: -offsetX, })
                }
                else if (index > indexCurrentCard) {
                    gsap.fromTo(`#${id}`, { opacity: 0.1, x: 600, }, { opacity: 0.1, duration: 0.75, position: 'absolute', x: offsetX, })
                }
            })
        }
        return () => {
        }
    }, [show]);

    useEffect(() => {
        const currentPosXcurrentCard = document.getElementById(currentCard).getBoundingClientRect().x
        cardsIds.forEach((id, index) => {
            const currentPosX = document.getElementById(id).getBoundingClientRect().x
            const offsetX = currentPosX - currentPosXcurrentCard
            if (id === currentCard) {
                gsap.fromTo(`#${currentCard}`, { opacity: 0.1 }, { opacity: 1, duration: 0.75, position: 'absolute', x: 0, })
            }
            else {
                gsap.to(`#${id}`, { opacity: 0.1, duration: 0.75, position: 'absolute', x: offsetX, })
            }

        })
    }, [currentCard])


    useEffect(() => {
        if (proxCard === null) return
        const index = cardsIds.indexOf(currentCard)
        if (proxCard === 'previousTouch') {
            if (index === 0) {
                setCurrentCard(cardsIds[cardsIds.length - 1])
            } else {
                setCurrentCard(cardsIds[index - 1])
            }
        }
        else if (proxCard === 'afterTouch') {
            if (index === cardsIds.length - 1) {
                setCurrentCard(cardsIds[0])
            } else {
                setCurrentCard(cardsIds[index + 1])
            }
        }
        else if (proxCard === 'previousButton') {
            if (index === 0) {
                setCurrentCard(cardsIds[cardsIds.length - 1])
            } else {
                setCurrentCard(cardsIds[index - 1])
            }
            setProxCard(null)
        }
        else if (proxCard === 'afterButton') {
            if (index === cardsIds.length - 1) {
                setCurrentCard(cardsIds[0])
            } else {
                setCurrentCard(cardsIds[index + 1])
            }
            setProxCard(null)
        }
        
    }, [proxCard]);

    const handleClick = (e) => {
        const id = e.target.id
        if (id === 'previous') {
            setProxCard('previousButton')
        }
        else if (id === 'after') {
            setProxCard('afterButton')
        }
    }


    useEffect(() => {
        const handleTouchStart = (e) => {
            setStartX(e.touches[0].clientX)
            setStartY(e.touches[0].clientY)
        }

        const handleTouchMove = (e) => {
            const currentY = e.touches[0].clientY
            const diffY = currentY - startY
            if (Math.abs(diffY) < 50 && startX !== null) {
                e.preventDefault()
                const currentX = e.touches[0].clientX
                const diffX = currentX - startX
    
                if (diffX > 50) {
                    setProxCard('previousTouch')
                }
                else if (diffX < -50) {
                    setProxCard('afterTouch')
                }
            }

        }

        const handleTouchEnd = (e) => {
            setStartX(null)
            setStartY(null)
            setProxCard(null)
        }

        carrouselContainerRef.current.addEventListener('touchstart', handleTouchStart)
        carrouselContainerRef.current.addEventListener('touchmove', handleTouchMove, { passive: false })
        carrouselContainerRef.current.addEventListener('touchend', handleTouchEnd)

        return () => {
            carrouselContainerRef.current.removeEventListener('touchstart', handleTouchStart)
            carrouselContainerRef.current.removeEventListener('touchmove', handleTouchMove)
            carrouselContainerRef.current.removeEventListener('touchend', handleTouchEnd)
        }
    }, [startX]);


    return (
        <>
            <div className="w-full h-full flex flex-col items-center justify-start gap-7">
                <div ref={carrouselContainerRef} className="relative w-[90%] h-[80%] flex justify-center items-center gap-7">
                    {
                        cards.map((card, index) => (
                            <WorkCard key={card.id} id={card.id} img={card.img} title={card.title} tecs={card.tecs} desc={card.desc} pageDir={card.pageDir} codeDir={card.codeDir} currentCard={currentCard} setCurrentCard={setCurrentCard} />
                        ))
                    }
                </div>
                <div className="flex gap-5">
                    <button id="previous" className={`rounded-full w-[40px] h-[40px] sm:hover:scale-110 ${buttonsColor}`} onClick={handleClick}>{'<'}</button>
                    <button id="after" className={`rounded-full w-[40px] h-[40px] sm:hover:scale-110 ${buttonsColor}`} onClick={handleClick}>{'>'}</button>
                </div>
            </div>
        </>
    );
}