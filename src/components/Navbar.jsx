import { split } from "postcss/lib/list";
import { useState, useEffect } from "react"

export const Navbar = ({ model }) => {

    
    const [estado, setEstado] = useState(0)
    const [endHomeInAnimation, setEndHomeInAnimation] = useState(true)
    const [endHomeOutAnimation, setEndHomeOutAnimation] = useState(false)
    const [endOtherInAnimation, setEndOtherInAnimation] = useState(false)
    const [endOtherOutAnimation, setEndOtherOutAnimation] = useState(false)

    useEffect(() => {
        //console.log(model)

        if (model === 'home' && endHomeInAnimation) {
            setEstado(0) 
        }

        if (model != 'home' && endHomeInAnimation) {
            setEstado(1)         
        }

        if (model != 'home' && endHomeOutAnimation) {
            setEstado(2)    
        }

        if (model === 'home' && endOtherInAnimation) {
            setEstado(3)     
        }

        if (model === 'home' && endOtherOutAnimation) {
            setEstado(0)
        }



    }, [model, endHomeInAnimation, endHomeOutAnimation, endOtherInAnimation, endOtherOutAnimation]);


    const handleAnimation1 = () => {
        setEndHomeInAnimation(true)
        setEndHomeOutAnimation(false)
        setEndOtherInAnimation(false)
        setEndOtherOutAnimation(false)
    }

    const handleAnimation2 = () => {
        setEndHomeInAnimation(false)
        setEndHomeOutAnimation(true)
        setEndOtherInAnimation(false)
        setEndOtherOutAnimation(false)
    }

    const handleAnimation3 = () => {
        setEndHomeInAnimation(false)
        setEndHomeOutAnimation(false)
        setEndOtherInAnimation(true)
        setEndOtherOutAnimation(false)
    }

    const handleAnimation4 = () => {
        setEndHomeInAnimation(false)
        setEndHomeOutAnimation(false)
        setEndOtherInAnimation(false)
        setEndOtherOutAnimation(true)
    }
    return (
        <>
            {estado === 0
                ?
                <aside className={'overflow-hidden flex justify-center items-center fixed flex-col right-0 w-[120px] h-[100vh] font-handjet text-lg sm:text-2xl '}>
                    <nav className={"flex justify-center items-center font-bold gap-8 sm:gap-10 flex-col "}>
                        <div className={'flex animate-once animate-duration-500 animate-delay-300 animate-fade-left'}>
                            <a name="home" href='#home' className={'sm:hover:opacity-100 sm:hover:scale-125 transition duration-100 ' +
                                (model === 'home' ? 'active opacity-100' : 'opacity-40')}>Home</a>
                        </div>
                        <div className={'flex animate-once animate-duration-500 animate-delay-[400ms] animate-fade-left'}>
                            <a name="aboutme" href='#aboutme' className={'sm:hover:opacity-100 sm:hover:scale-125 transition duration-100 ' +
                                (model === 'aboutme' ? 'active opacity-100' : 'opacity-40')}>About Me</a>
                        </div>
                        <div className={'flex animate-once animate-duration-500 animate-delay-500 animate-fade-left'}>
                            <a name="skills" href='#skills' className={'sm:hover:opacity-100 sm:hover:scale-125 transition duration-100 ' +
                                (model === 'skills' ? 'active opacity-100' : 'opacity-40')}>Skills</a>
                        </div>
                        <div className={'flex animate-once animate-duration-500 animate-delay-[600ms] animate-fade-left'}>
                            <a name="work" href='#work' className={'sm:hover:opacity-100 sm:hover:scale-125 transition duration-100 ' +
                                (model === 'work' ? 'active opacity-100' : 'opacity-40')}>Work</a>
                        </div>
                        <div className={'flex animate-once animate-duration-500 animate-delay-700 animate-fade-left '} onAnimationEnd={handleAnimation1}>
                            <a name="contact" href='#contact' className={'sm:hover:opacity-100 sm:hover:scale-125 transition duration-100 ' +
                                (model === 'contact' ? 'active opacity-100' : 'opacity-40')}>Contact</a>
                        </div>
                    </nav>
                </aside>
                : estado === 1
                    ?
                    <aside className={'overflow-hidden flex justify-center items-center fixed flex-col right-0 w-[120px] h-[100vh] font-handjet text-lg sm:text-2xl '}>
                        <nav className={"flex justify-center items-center font-bold gap-8 sm:gap-10 flex-col "}>
                            <div className={'flex animate-once animate-duration-100 animate-delay-100 animate-fade-right-hidden'}>
                                <a name="home" href='#home' className={'sm:hover:opacity-100 sm:hover:scale-125 transition duration-100 opacity-40 '}>Home</a>
                            </div>
                            <div className={'flex animate-once animate-duration-100 animate-delay-[200ms] animate-fade-right-hidden'}>
                                <a name="aboutme" href='#aboutme' className={'sm:hover:opacity-100 sm:hover:scale-125 transition duration-100 opacity-40 '}>About Me</a>
                            </div>
                            <div className={'flex animate-once animate-duration-100 animate-delay-300 animate-fade-right-hidden'}>
                                <a name="skills" href='#skills' className={'sm:hover:opacity-100 sm:hover:scale-125 transition duration-100 opacity-40 '}>Skills</a>
                            </div>
                            <div className={'flex animate-once animate-duration-100 animate-delay-[400ms] animate-fade-right-hidden'}>
                                <a name="work" href='#work' className={'sm:hover:opacity-100 sm:hover:scale-125 transition duration-100 opacity-40 '}>Work</a>
                            </div>
                            <div className={'flex animate-once animate-duration-100 animate-delay-500 animate-fade-right-hidden'} onAnimationEnd={handleAnimation2}>
                                <a name="contact" href='#contact' className={'sm:hover:opacity-100 sm:hover:scale-125 transition duration-100 opacity-40 '}>Contact</a>
                            </div>
                        </nav>
                    </aside>
                    : estado === 2
                        ?
                        <aside className={'overflow-hidden flex justify-center items-center fixed  bottom-0 w-[100vw] h-[12vh] font-handjet text-lg sm:text-2xl '}>
                            <nav className={"flex justify-center items-center font-bold gap-8 sm:gap-10 "}>
                                <div className={'flex animate-once animate-duration-500 animate-delay-300 animate-fade-up'}>
                                    <a name="home" href='#home' className={'sm:hover:opacity-100 sm:hover:scale-125 transition duration-100 ' +
                                        (model === 'home' ? 'active opacity-100' : 'opacity-40')}>Home</a>
                                </div>
                                <div className={'flex animate-once animate-duration-500 animate-delay-[400ms] animate-fade-up'}>
                                    <a name="aboutme" href='#aboutme' className={'sm:hover:opacity-100 sm:hover:scale-125 transition duration-100 ' +
                                        (model === 'aboutme' ? 'active opacity-100' : 'opacity-40')}>About Me</a>
                                </div>
                                <div className={'flex animate-once animate-duration-500 animate-delay-500 animate-fade-up'}>
                                    <a name="skills" href='#skills' className={'sm:hover:opacity-100 sm:hover:scale-125 transition duration-100 ' +
                                        (model === 'skills' ? 'active opacity-100' : 'opacity-40')}>Skills</a>
                                </div>
                                <div className={'flex animate-once animate-duration-500 animate-delay-[600ms] animate-fade-up'}>
                                    <a name="work" href='#work' className={'sm:hover:opacity-100 sm:hover:scale-125 transition duration-100 ' +
                                        (model === 'work' ? 'active opacity-100' : 'opacity-40')}>Work</a>
                                </div>
                                <div className={'flex animate-once animate-duration-500 animate-delay-700 animate-fade-up '} onAnimationEnd={handleAnimation3}>
                                    <a name="contact" href='#contact' className={'sm:hover:opacity-100 sm:hover:scale-125 transition duration-100 ' +
                                        (model === 'contact' ? 'active opacity-100' : 'opacity-40')}>Contact</a>
                                </div>
                            </nav>
                        </aside>
                        : estado === 3
                            ?
                            <aside className={'overflow-hidden flex justify-center items-center fixed bottom-0 w-[100vw] h-[12vh] font-handjet text-lg sm:text-2xl '}>
                                <nav className={"flex justify-center items-center font-bold gap-8 sm:gap-10 "}>
                                    <div className={'flex animate-once animate-duration-100 animate-delay-100 animate-fade-down-hidden'}>
                                        <a name="home" href='#home' className={'sm:hover:opacity-100 sm:hover:scale-125 transition duration-100 opacity-40 '}>Home</a>
                                    </div>
                                    <div className={'flex animate-once animate-duration-100 animate-delay-[200ms] animate-fade-down-hidden'}>
                                        <a name="aboutme" href='#aboutme' className={'sm:hover:opacity-100 sm:hover:scale-125 transition duration-100 opacity-40 '}>About Me</a>
                                    </div>
                                    <div className={'flex animate-once animate-duration-100 animate-delay-300 animate-fade-down-hidden'}>
                                        <a name="skills" href='#skills' className={'sm:hover:opacity-100 sm:hover:scale-125 transition duration-100 opacity-40 '}>Skills</a>
                                    </div>
                                    <div className={'flex animate-once animate-duration-100 animate-delay-[400ms] animate-fade-down-hidden'}>
                                        <a name="work" href='#work' className={'sm:hover:opacity-100 sm:hover:scale-125 transition duration-100 opacity-40 '}>Work</a>
                                    </div>
                                    <div className={'flex animate-once animate-duration-100 animate-delay-500 animate-fade-down-hidden'} onAnimationEnd={handleAnimation4}>
                                        <a name="contact" href='#contact' className={'sm:hover:opacity-100 sm:hover:scale-125 transition duration-100 opacity-40 '}>Contact</a>
                                    </div>
                                </nav>
                            </aside>
                            : ''
            }
        </>
    )
}
