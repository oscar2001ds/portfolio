import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { globalVariables } from '../store/globalStore';
import { parseUrl } from '../services/parseUrl';

const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';

const initialPosition = { 'x': 0, 'y': 0, 'z': 0 }
const initialRotation = { 'x': 0, 'y': 0, 'z': 0 }
const scale = { 'x': 2.8, 'y': 2.8, 'z': 2.8 }
const cameraPos = { 'x': -3, 'y': 3, 'z': 6 }
const orbitalControl = true
const animation = false
const zoomAval = false
const statsAval = false


const addMaterial = (model) => {
  model.traverse((child) => {
    if (child.isMesh && child.material.isMeshStandardMaterial) {
      child.material.envMapIntensity = 1.1;
    }
  });
}


export const LoaderSkillsBalls = ({fileId, fileUrl }) => {

  const refContainer = useRef()
  const { refreshContainerSize, setmodelTecHovered, stopRenderBalls, setModelLoaded } = globalVariables()
  const [rendererState, setRendererState] = useState(null)
  const [cameraState, setCameraState] = useState(null)
  const [controlState, setControlState] = useState(null)
  const [sceneState, setSceneState] = useState(null)
  const [modelState, setModelState] = useState(null)
  const [requestAnimationF, setRequestAnimationF] = useState(null)
  const [animationPaused, setAnimationPaused] = useState(null);
  const [velRotation, setVelRotation] = useState({ 'x': 0.005, 'y': 0.005, 'z': 0.005 })


  useEffect(() => {
    const animate = () => {
      if (animationPaused) {
        return;
      }
      setRequestAnimationF(requestAnimationFrame(animate));
      if (!modelState) return
      modelState.rotation.x += velRotation.x;
      modelState.rotation.y += velRotation.y;

      if (controlState) controlState.update();

      if (rendererState && sceneState && cameraState) rendererState.render(sceneState, cameraState);
    }
    if (!animationPaused) {
      cancelAnimationFrame(requestAnimationF);
      animate();
    }

  }, [animationPaused,velRotation]);

  useEffect(() => {
    if (stopRenderBalls && requestAnimationF) {
      // console.log('SkillBall stop')
      cancelAnimationFrame(requestAnimationF);
      setAnimationPaused(true); // Pausa la animación
    } else if (sceneState) {
      // console.log('SkillBall animate')
      setAnimationPaused(false); // Reanuda la animación
    }
  }, [sceneState, stopRenderBalls]);


  useEffect(() => {
    if (refreshContainerSize && rendererState && cameraState) {
      console.log('SkillBall refresh')
      const container = refContainer.current;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      cameraState.aspect = newWidth / newHeight;
      cameraState.updateProjectionMatrix();
      rendererState.setSize(newWidth, newHeight);
    }
  }, [refreshContainerSize]);

  const handleHover = (ev) => {
    if (!modelState) return
    if (ev.type === 'mouseenter') {
      modelState.scale.x = scale.x * 1.2;
      modelState.scale.y = scale.y * 1.2;
      modelState.scale.z = scale.z * 1.2;
      setVelRotation({ 'x': 0.002, 'y': 0.002, 'z': 0.005 })
      setmodelTecHovered(fileId)
    }
    else if (ev.type === 'mouseout') {
      modelState.scale.x = scale.x;
      modelState.scale.y = scale.y;
      modelState.scale.z = scale.z;
      setVelRotation({ 'x': 0.005, 'y': 0.005, 'z': 0.005 })
      setmodelTecHovered('')
    }
  }
  useEffect(() => {
    if (sceneState) {
      // Crear evento de hover:
      rendererState.domElement.addEventListener('mouseenter', handleHover);
      rendererState.domElement.addEventListener('mouseout', handleHover);
    }

  }, [sceneState]);


  useEffect(() => {
    let mixer;
    const clock = new THREE.Clock();
    const container = refContainer.current;

    if (statsAval) {
      const stats = new Stats();
      container.appendChild(stats.dom);
    }

    // Renderer:
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    setRendererState(renderer)

    // Scene:
    const scene = new THREE.Scene();

    // Envaironment map:
    const enviromentMap = new THREE.CubeTextureLoader().setPath('environmentMap/').load([
      'px.png',
      'nx.png',
      'py.png',
      'ny.png',
      'pz.png',
      'nz.png',
    ]);
    scene.environment = enviromentMap;
    scene.background = null;


    // Camera:
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 1, 100);
    camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
    setCameraState(camera)

    // Control orbital:
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = zoomAval;
    controls.target.set(0, 0, 0);
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.enabled = orbitalControl;
    setControlState(controls)



    // Luces:
    const dirLight = new THREE.DirectionalLight(0x900909, 10);
    dirLight.position.set(-10, 0, 0);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // // Light helper:
    // const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 1);
    // scene.add(dirLightHelper);

    // // Axis helper:
    // const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper)

    // Loading Manager:
    const loadingManager = new THREE.LoadingManager()
    loadingManager.onLoad = () => {
      console.log(fileId, "loaded");
      setModelLoaded({[fileId]: true })
    };

    // Draco loader:
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('draco/gltf/');

    // GLTF loader:
    const loader = new GLTFLoader(loadingManager);
    loader.setDRACOLoader(dracoLoader);
    loader.load(parseUrl(STRAPI_API_URL, fileUrl), function (gltf) {

      //console.log(gltf);
      const model = gltf.scene;
      model.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
      model.rotation.set(initialRotation.x, initialRotation.y, initialRotation.z);
      model.scale.set(scale.x, scale.y, scale.z);
      setModelState(model)

      // Añadir Material:
      addMaterial(model);

      // Añadir modelo a escena:
      scene.add(model);

      // Animación:
      if (animation) {
        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play();
      }

      // Render:
      setSceneState(scene)

    }, undefined, function (e) {

      console.error(e);

    });

    function handleWindowResize() {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    }


    window.addEventListener('resize', handleWindowResize); // Use an event listener for window resize

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div className='absolute z-30 w-[90%] h-[90%] cursor-pointer rounded-full overflow-hidden' ref={refContainer}></div>
  )
}
