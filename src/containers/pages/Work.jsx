import { useEffect, useRef } from "react"
import { TypeAnimation } from "react-type-animation"
import { gsap } from "gsap";
import SwiperSlider from "../../components/SwiperSlider";
import { WorkCard } from "../../components/WorkCard";
import { globalVariables } from "../../store/globalStore";

export const Work = ({ show, data }) => {
  const { pageMode } = globalVariables()
  const descrContainerRef = useRef(null)
  const projectTypesSequence = data?.projectTypes?.map(type => ` ${type.text} `).flatMap(type => [type, 1000]) || []

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
        <div className="flex flex-col w-full sm:w-[80vw] h-full justify-center items-center gap-6 sm:gap-9">
          <div ref={descrContainerRef} className="w-full flex flex-col gap-4 px-8">
            <strong className="text-5xl md:text-6xl font-tektur">Works</strong>
            <div className="text-lg md:text-2xl truncate">
              <p className="font-roboto"> Know a few of my
                {
                  projectTypesSequence.length > 0 &&
                  <TypeAnimation
                    className={"font-roboto"}
                    style={{ color: 'var(--secondary-color)' }}
                    sequence={projectTypesSequence}
                    speed={1}
                    repeat={Infinity}
                    cursor={true}
                  />
                }
                projects.
              </p>
            </div>
            <div className="w-[40%] h-[2px]" style={{ backgroundColor: 'var(--secondary-color)' }}></div>
          </div>
          <div className="relative w-full h-[60%]">
            <SwiperSlider
              spaceBetween={16}
              slidesPerView={4}
              slidesPerGroup={4}
              grabCursor={false}
              loop={true}
              paginationContainerId="work-swiper-pagination"
              nextButtonId="work-swiper-button-next"
              prevButtonId="work-swiper-button-prev"
              className="px-5 sm:px-0"
              classNameSwiper=""
              classNamePrevButton="-translate-y-[22dvh] hidden sm:block"
              classNameNextButton="-translate-y-[22dvh] hidden sm:block"
              buttonsStyle={pageMode === 'blue' ? 'primary' : pageMode === 'red' ? 'secondary' : 'primary'}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 2,
                  slidesPerGroup: 1,
                  spaceBetween: 16,
                },
                1024: {
                  slidesPerView: 3,
                  slidesPerGroup: 1,
                  spaceBetween: 16,
                },
                1280: {
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                  spaceBetween: 16,
                },
              }}
            >
              {data?.projects?.map((card, index) => (
                <WorkCard
                  key={`${card.slug}-${index}`}
                  id={card.slug}
                  image={card.image.url}
                  title={card.title}
                  tecs={card.tecs}
                  description={card.description}
                  pageUrl={card.pageUrl}
                  codeUrl={card.codeUrl}
                />
              ))}
            </SwiperSlider>
          </div>
        </div>
      </div>
    </>
  )
}

