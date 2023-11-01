import { create } from "zustand";

export const globalVariables = create((set) => ({
    // Variables:
    animation: '',
    setAnimation: ( newanimation) => set(state=>({ 
        animation : newanimation
    })),

    robotScale: 'scale_normal',
    setRobotScale: ( newrobotScale) => set(state=>({ 
        robotScale : newrobotScale
    })),

    pageLoaded: false,
    setPageLoaded: ( newpageLoaded) => set(state=>({ 
        pageLoaded : newpageLoaded
    })),

    modelLoaded: {'robot':false, 'ball1':false, 'ball2':false, 'ball3':false, 'ball4':false, 'ball5':false, 'ball6':false,  },
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