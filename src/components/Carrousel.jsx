import { useState, useEffect, useRef } from "react";
import { WorkCard } from "./WorkCard";
import { globalVariables } from "../store/globalStore";
import { PrevButton } from '../assets/PrevButton.jsx';
import { NextButton } from '../assets/NextButton.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export const Carrousel = ({ show, cards, initialCardId }) => {
    const { pageMode } = globalVariables()
    const [passPageMode, setPassPageMode] = useState(null)
    const [buttonsColor, setButtonsColor] = useState('bg-red-800 hover:bg-red-600')

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

    return (
        <div className="relative">
            <Swiper
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={3}
                navigation={true}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {cards.map((card) => (
                    <SwiperSlide key={card.id}>
                        <WorkCard
                            id={card.id}
                            img={card.img}
                            title={card.title}
                            tecs={card.tecs}
                            desc={card.desc}
                            pageDir={card.pageDir}
                            codeDir={card.codeDir}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* Botones fuera del Swiper para asegurar que Swiper los detecte */}
            <div className="flex gap-5 absolute left-1/2 -translate-x-1/2 bottom-0 z-10">
                <button className={`swiper-button-prev rounded-full w-[40px] h-[40px] ${pageMode === 'red' ? 'bg-orange-400' : 'bg-[#0dc7fa]'} sm:hover:scale-110 p-2`}><PrevButton /></button>
                <button className={`swiper-button-next rounded-full w-[40px] h-[40px] ${pageMode === 'red' ? 'bg-orange-400' : 'bg-[#0dc7fa]'} sm:hover:scale-110 p-2`}><NextButton /></button>
            </div>
        </div>
    );
}
