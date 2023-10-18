import { create } from "zustand";

export const globalVariables = create((set) => ({
    // Variables:
    animation: 'anim1',
    setAnimation: ( newanimation) => set(state=>({ 
        animation : newanimation
    })),

    robotScale: 'scale_normal',
    setRobotScale: ( newrobotScale) => set(state=>({ 
        robotScale : newrobotScale
    })),


    modelLoaded: {'robot':false,},
    setModelLoaded: ( newmodelLoaded) => set(state=>({
        modelLoaded : {...state.modelLoaded,...newmodelLoaded}
    })),

    refreshContainerSize: false,
    setRefreshContainerSize: ( newrefreshContainerSize) => set(state=>({
        refreshContainerSize : newrefreshContainerSize
    })),

    modelTecHovered: '',
    setmodelTecHovered: ( newmodelTecHovered) => set(state=>({ 
        modelTecHovered : newmodelTecHovered
    })),

    stopRenderRobot: false,
    setStopRenderRobot: ( newstopRenderRobot) => set(state=>({
        stopRenderRobot : newstopRenderRobot
    })),

    stopRenderBalls: false,
    setStopRenderBalls: ( newstopRenderBalls) => set(state=>({
        stopRenderBalls : newstopRenderBalls
    })),

    stopRenderStatics: {'capsule':true,'laboratory':true,'labItems':true,},
    setStopRenderStatics: ( newstopRenderStatics) => set(state=>({
        stopRenderStatics : {...state.stopRenderStatics,...newstopRenderStatics}
    })),

    changueRobotToFinalImage: false,
    setChangueRobotToFinalImage: ( newchangueRobotToFinalImage) => set(state=>({
        changueRobotToFinalImage : newchangueRobotToFinalImage
    })),

    pageMode: 'blue',
    setPageMode: ( newpageMode) => set(state=>({ 
        pageMode : newpageMode
    })),

    maxHeight: window.innerHeight,
    setMaxHeight: ( newmaxHeight) => set(state=>({ 
        maxHeight : newmaxHeight
    })),

    maxWidth: window.innerWidth,
    setMaxWidth: ( newmaxWidth) => set(state=>({
        maxWidth : newmaxWidth
    })),
    
}));