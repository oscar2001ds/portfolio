"use client"

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import ChevronBackIcon from "./Icons/ChevronBack"
import ChevronForwardIcon from "./Icons/ChevronForward"

const SwiperButton = ({
  id,
  className,
  buttonsStyle,
  children,
}) => (
  <button
    id={id}
    className={`${className} ${buttonsStyle === "primary" ? "bg-cyan-700 hover:bg-blue-600" : "bg-red-800 hover:bg-red-600"} text-white rounded-full p-1 shadow-md transition-all duration-500 disabled:pointer-events-none disabled:opacity-0`}
  >
    {children}
  </button>
)

const SwiperSlider = ({
  children,
  loop = false,
  spaceBetween = 10,
  slidesPerView = 1,
  slidesPerGroup = 1,
  grabCursor = true,
  allowTouchMove = true,
  paginationContainerId = "__",
  nextButtonId = "__",
  prevButtonId = "__",
  animation,
  breakpoints = {},
  buttonsStyle = "primary",
  className,
  classNameSwiper,
  classNamePrevButton = "bottom-[50%] left-1",
  classNameNextButton = "bottom-[50%] right-1",
}) => {
  return (
    <div className={`${className}`}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        loop={loop}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerGroup}
        grabCursor={grabCursor}
        allowTouchMove={allowTouchMove}
        pagination={{
          el: `#${paginationContainerId}`,
          clickable: true,
        }}
        autoHeight={false}
        navigation={{
          prevEl: `#${prevButtonId}`,
          nextEl: `#${nextButtonId}`,
        }}
        breakpoints={breakpoints}
        autoplay={
          animation
            ? {
              delay: animation.delay,
              disableOnInteraction: animation.disableOnInteraction,
              pauseOnMouseEnter: animation.pauseOnMouseEnter,
            }
            : false
        }
        className={`!px-2 ${classNameSwiper}`}
      >
        {children?.map((child, index) => (
          <SwiperSlide key={index} className="h-full">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="relative z-30 mx-auto flex h-10 w-full items-center justify-center sm:justify-between">
        {prevButtonId !== "__" && (
          <SwiperButton
            id={prevButtonId}
            className={`${classNamePrevButton} -translate-x-8`}
            buttonsStyle={buttonsStyle}
          >
            <ChevronBackIcon className="h-6 w-6" />
          </SwiperButton>
        )}
        {paginationContainerId !== "__" && (
          <div
            id={paginationContainerId}
            className="flex w-full items-center justify-center gap-1 overflow-hidden text-center max-w-[280px] sm:max-w-none"
          ></div>
        )}
        {nextButtonId !== "__" && (
          <SwiperButton
            id={nextButtonId}
            className={`${classNameNextButton} translate-x-8`}
            buttonsStyle={buttonsStyle}
          >
            <ChevronForwardIcon className="h-6 w-6" />
          </SwiperButton>
        )}
      </div>
    </div>
  )
}

export default SwiperSlider
