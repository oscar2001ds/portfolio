import React from 'react'
import { globalVariables } from '../../store/globalStore';
import { useEffect } from 'react';


export const LoadingPage = () => {
    const { refreshContainerSize, setRefreshContainerSize, modelLoaded, pageMode, maxHeight, setPageLoaded } = globalVariables()

    useEffect(() => {
        if (Object.values(modelLoaded).every((valor) => (valor === true))) {
            setTimeout(() => {
                setRefreshContainerSize(true)
                setPageLoaded(true)
            }, 500)

        }
    }, [modelLoaded]);

    return (
        <>
            <div className={`absolute z-30 w-screen inset-0 opacity-100 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] via-black flex justify-center items-center gap-6
            ${refreshContainerSize ? 'hidden' : 'block'} ${pageMode === 'red' ? 'from-red-950 to-red-950' : pageMode === 'blue' ? 'from-blue-950 to-blue-950' : ''}`}
                style={{
                    height: `${maxHeight}px`,
                }}>
                <strong className='font-tektur text-3xl'>Loading</strong>
                <div className={`inline w-[2vw] h-[2vw] border-b-2 border-r-2 border-l-2 rounded-full overflow-hidden bg-transparent animate-spin animate-infinite
                ${pageMode === 'red' ? 'border-red-800' : pageMode === 'blue' ? 'border-blue-800' : ''}`}></div>
            </div>
        </>
    )
}
