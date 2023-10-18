import { Home } from "./Home"
import { Skills } from "./Skills"
import { Work } from "./Work"
import { Contact } from "./Contact"
import { Navbar } from '../../components/Navbar'
import { useEffect, useState } from "react"
import { InView, useInView } from "react-intersection-observer"
import { AboutMe } from "./AboutMe"
import { Experience3D } from "./Experience3D"
import { globalVariables } from "../../store/globalStore"
import { LoadingPage } from "./LoadingPage"
import { PageMode } from "../../components/PageMode"


export const PrincipalPageClassic = () => {

    const [currentSection, setCurrentSection] = useState('')
    const [refHome, inViewHome, entryHome] = useInView({ threshold: 0.1, initialInView: true, });
    const [refAboutMe, inViewAboutMe, entryAboutMe] = useInView({ threshold: 0.1, });
    const [refSkills, inViewSkills, entrySkills] = useInView({ threshold: 0.1, });
    const [refWork, inViewWork, entryWork] = useInView({ threshold: 0.1, });
    const [refContact, inViewContact, entryContact] = useInView({ threshold: 0.1, });
    const { refreshContainerSize, setStopRenderRobot, setStopRenderBalls, setStopRenderStatics, maxHeight, setMaxHeight, maxWidth, pageMode } = globalVariables()

    useEffect(() => {

        if (inViewHome && currentSection !== 'home') {
            setStopRenderRobot(true)
            setStopRenderBalls(true)
            setStopRenderStatics({ 'capsule': false, 'laboratory': false, 'labItems': false, })
            setCurrentSection('home')
        }
        else if (inViewAboutMe && currentSection !== 'aboutme') {
            setStopRenderRobot(false)
            setStopRenderBalls(true)
            setStopRenderStatics({ 'capsule': true, 'laboratory': false, 'labItems': true, })
            setCurrentSection('aboutme')
        }
        else if (inViewSkills && currentSection !== 'skills') {
            setStopRenderRobot(false)
            setStopRenderBalls(false)
            setStopRenderStatics({ 'capsule': false, 'laboratory': true, 'labItems': true, })
            setCurrentSection('skills')
        }
        else if (inViewWork && currentSection !== 'work') {
            setStopRenderRobot(true)
            setStopRenderBalls(true)
            setStopRenderStatics({ 'capsule': true, 'laboratory': true, 'labItems': true, })
            setCurrentSection('work')
        }
        else if (inViewContact && currentSection !== 'contact') {
            setStopRenderRobot(false)
            setStopRenderBalls(true)
            setStopRenderStatics({ 'capsule': true, 'laboratory': true, 'labItems': false, })
            setCurrentSection('contact')
        }

    }, [inViewHome, inViewAboutMe, inViewSkills, inViewWork, inViewContact]);

    useEffect(() => {
        let currentHeight = 0
        let passMaxHeight = 0
        const handleTouchMove = (e) => {
            currentHeight = window.innerHeight
            if (currentHeight !== passMaxHeight) {
                setMaxHeight(currentHeight)
                passMaxHeight = currentHeight
            }
        }

        window.addEventListener('touchmove', handleTouchMove, { passive: false })

        return () => {
            window.removeEventListener('touchmove', handleTouchMove)
        }

    }, []);


    return (
        <>
            <main>
                <LoadingPage />

                <div className={`maincontainer relative w-[100vw] overflow-auto snap-y snap-mandatory 
                ${pageMode === 'red' ? 'inset-0 opacity-100  bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-red-950 via-black to-red-950' :
                        pageMode === 'blue' ? 'inset-0 opacity-100  bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-blue-950 via-black to-blue-950'
                            : ''}`}
                    style={{
                        height: `${maxHeight}px`,
                    }}>

                    <Experience3D show={currentSection} />

                    <div>
                        <PageMode />
                    </div>

                    <div className={`${refreshContainerSize ? 'block absolute z-40' : 'hidden'}`}>
                        <Navbar model={currentSection}></Navbar>
                    </div>

                    <div className={"snap-center flex w-full h-full justify-center"} ref={refHome} id="home">
                        <Home show={currentSection}></Home>
                    </div>

                    <div className={"snap-center flex w-full h-full justify-center"} ref={refAboutMe} id="aboutme">
                        <AboutMe show={currentSection}></AboutMe>
                    </div>

                    <div className={"snap-center flex w-full h-full justify-center"} ref={refSkills} id="skills">
                        <Skills show={currentSection}></Skills>
                    </div>

                    <div className={"snap-center flex w-full h-full justify-center"} ref={refWork} id="work">
                        <Work show={currentSection}></Work>
                    </div>

                    <div className="snap-start flex w-full h-[150vh] lg:h-full justify-center" ref={refContact} id="contact">
                        <Contact show={currentSection}></Contact>
                    </div>
                </div>
            </main>

        </>
    )
}

