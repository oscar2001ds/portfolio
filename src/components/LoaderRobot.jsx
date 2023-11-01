import { useRef, useState } from 'react'
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { useEffect } from 'react';
import { globalVariables } from '../store/globalStore';


const fileName = 'robot/robot.FBX'
const initialPosition = { 'x': 0, 'y': -12, 'z': 0 }
const initialRotation = { 'x': 0, 'y': Math.PI / 3.8, 'z': 0 }
//const initialRotation= {'x': 0, 'y': 0, 'z': 0}
const scale = { 'x': 0.12, 'y': 0.12, 'z': 0.12 }
const cameraPos = { 'x': 15, 'y': 15, 'z': 40 }
const orbitalControl = false
const animationEnabled = true
const zoomAval = false

let animaciones = {}
let animacionesCargadas = false
let mixer
let clock
let currentAnimationS1 = 'animGreeting';
let S1_2 = false;
let S1_3 = false;
let S1_4 = false;
let S1_First = false;

export const LoaderRobot = () => {

  const refContainer = useRef()
  const {animation, setAnimation, setModelLoaded, refreshContainerSize, stopRenderRobot, setChangueRobotToFinalImage, pageMode, maxWidth, robotScale } = globalVariables()
  const [passPageMode, setPassPageMode] = useState(null)
  const [rendererState, setRendererState] = useState(null)
  const [cameraState, setCameraState] = useState(null)
  const [controlState, setControlState] = useState(null)
  const [sceneState, setSceneState] = useState(null)
  const [requestAnimationF, setRequestAnimationF] = useState(null)
  const [animationPaused, setAnimationPaused] = useState(null);
  const [modelo, setModelo] = useState(null)
  const [passWireframe, setPassWireframe] = useState(false)


  // Añadir Material:
  const addMaterial = ({ wireframe = false, m = null }) => {
    (m ? m : modelo).traverse((child) => {
      if (child.isMesh) {
        //console.log("Material: ", child)
        
        if (child.name === 'Ground') {
          const material = new THREE.MeshBasicMaterial({
            color: 0x49FF00,
            opacity: 0,
            transparent: true,
          });
          child.material = material;
        }
        else if (child.name === 'Robot_Mesh') {
          let material;
          let diffuseTexture;
          const texturePath = '3Dmodels/robot/textures/'
                  

          material = child.material[0];
          if (pageMode === 'red') material.color = new THREE.Color(0xBF0000);
          else if (pageMode === 'blue') material.color = new THREE.Color("rgb(13, 199, 250)");
          diffuseTexture = new THREE.TextureLoader().load(`${texturePath}Paint_diffuse.jpg`)
          material.map = diffuseTexture;
          material.wireframe = wireframe;
          material.envMapIntensity = 1.1;
          material.needsUpdate = true;

          material = child.material[1];
          diffuseTexture = new THREE.TextureLoader().load(`${texturePath}ID2_Metal_albedo.jpeg`);
          material.map = diffuseTexture;
          material.wireframe = wireframe;
          material.envMapIntensity = 1.1;
          material.needsUpdate = true;

          material = child.material[2];
          diffuseTexture = new THREE.TextureLoader().load(`${texturePath}ID3_Rubber_albedo.jpeg`);
          material.map = diffuseTexture;
          material.wireframe = wireframe;
          material.envMapIntensity = 1.1;
          material.needsUpdate = true;

        }
      }
    });
  }

  // Change robot color:
  useEffect(() => {
    if(passPageMode === pageMode) return
    if (sceneState) addMaterial({ wireframe: passWireframe })
    setPassPageMode(pageMode)
  }, [pageMode]);

  // Render:
  useEffect(() => {
    const animate = () => {
      if (animationPaused) {
        return;
      }
      if (animationEnabled && clock && mixer) {
        const delta = clock.getDelta();
        setRequestAnimationF(requestAnimationFrame(animate));
        mixer.update(delta);
      }

      if (controlState) controlState.update();

      if (rendererState && sceneState && cameraState) rendererState.render(sceneState, cameraState);
    }
    if (!animationPaused) {
      cancelAnimationFrame(requestAnimationF);
      animate();
    }
  }, [animationPaused]);

  // Pause Render:
  useEffect(() => {
    if (stopRenderRobot && requestAnimationF) {
      cancelAnimationFrame(requestAnimationF);
      setAnimationPaused(true); // Robot stop
    } else if (sceneState) {
      setAnimationPaused(false); // Robot animate
    }
  }, [sceneState, stopRenderRobot]);

  // Refresh Container Size:
  useEffect(() => {
    if (refreshContainerSize && rendererState && cameraState) {
      console.log('Robot refresh')
      const container = refContainer.current;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      cameraState.aspect = newWidth / newHeight;
      cameraState.updateProjectionMatrix();
      rendererState.setSize(newWidth, newHeight);
    }
  }, [refreshContainerSize]);

  // Change robot scale:
  useEffect(() => {
    if (modelo && robotScale) {
      if (robotScale === 'scale_down') {
        modelo.scale.set(scale.x * 0.6, scale.y * 0.6, scale.z * 0.6);
      }
      else if (robotScale === 'scale_normal') {
        modelo.scale.set(scale.x * 1, scale.y * 1, scale.z * 1);
      }
      else if (robotScale === 'scale_up') {
        modelo.scale.set(scale.x * 1.2, scale.y * 1.2, scale.z * 1.2);
      }
      else if (robotScale === 'scale_up2') {
        modelo.scale.set(scale.x * 1.4, scale.y * 1.4, scale.z * 1.4);
      }
    }
  }, [robotScale]);

  // Play Animation:
  useEffect(() => {

    function crossfade(animFrom, animTo, duration) {
      animFrom.fadeOut(duration).play();
      animTo.fadeIn(duration).play();
    }

    const stopAnimations = () => {
      animaciones['animGreeting'].stop();
      animaciones['animStand'].stop();
      animaciones['animStretch'].stop();
      animaciones['animJump1'].stop();
      animaciones['animJump2'].stop();
      animaciones['animFalling'].stop();
      animaciones['animFloating'].stop();
      animaciones['animFloating2'].stop();
      animaciones['animDance'].stop();
      animaciones['animThumbs'].stop();
    }

    const secuence1 = (ev) => {
      stopAnimations();

      switch (currentAnimationS1) {
        case 'animGreeting':
          animaciones['animGreeting'].repetitions = 1;
          if (S1_First) {
            crossfade(animaciones['animFalling'], animaciones['animGreeting'], 0.6)
            S1_First = false;
          }
          else{
            crossfade(animaciones['animStretch'], animaciones['animGreeting'], 0.5)
          }
          currentAnimationS1 = 'animStand';
          break;
        case 'animStand':
          animaciones['animStand'].repetitions = 1;
          if (S1_2) {
            crossfade(animaciones['animJump2'], animaciones['animStand'], 2)
            S1_2 = false;
          }
          else if (S1_4) {
            crossfade(animaciones['animThumbs'], animaciones['animStand'], 0.5)
            setChangueRobotToFinalImage(true)
            S1_4 = false;
          }
          else {
            crossfade(animaciones['animGreeting'], animaciones['animStand'], 0.5)
          }
          currentAnimationS1 = 'animStretch';
          break;
        case 'animStretch':
          animaciones['animStretch'].repetitions = 1;
          crossfade(animaciones['animStand'], animaciones['animStretch'], 0.5)
          currentAnimationS1 = 'animGreeting';
          break;

        case 'animFloating':
          if (S1_3) {
            animaciones['animFloating'].repetitions = Infinity;
            crossfade(animaciones['animFalling'], animaciones['animFloating'], 1)
            addMaterial({ wireframe: true })
            setPassWireframe(true)
            S1_3 = false;
            break;
          }

        case 'animOnlyFalling':
          animaciones['animFalling'].repetitions = 1;
          animaciones['animFalling'].play();
          addMaterial({ wireframe: false })
          setPassWireframe(false)
          currentAnimationS1 = 'animOnlyFalling';

        case 'animThumbs':
          animaciones['animThumbs'].repetitions = 1;
          crossfade(animaciones['animFalling'], animaciones['animThumbs'], 1)
          addMaterial({ wireframe: false })
          setPassWireframe(false)
          currentAnimationS1 = 'animStand';
          break;

        default:
          break;
      }
    };


    if (!animacionesCargadas) return;

    if (animation === 'secuenciaBase') {
      secuence1();
      try {
        mixer.removeEventListener('finished', secuence1);
      } catch (error) { }
      mixer.addEventListener('finished', secuence1);
    }
    else if (animation === 'secuencia1_1') {
      modelo.rotation.y = -initialRotation.y * 0.2
      modelo.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
      S1_2 = false;
      S1_3 = false;
      S1_4 = false;
      currentAnimationS1 = 'animGreeting';
      setAnimation('secuenciaBase');
    }
    else if (animation === 'secuencia1_2') {
      modelo.rotation.y = -initialRotation.y * 0.2
      modelo.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
      S1_2 = true;
      S1_3 = false;
      S1_4 = false;
      currentAnimationS1 = 'animStand';
      addMaterial({ wireframe: false })
      setPassWireframe(false)
      setAnimation('secuenciaBase');
    }
    else if (animation === 'secuencia1_3') {
      modelo.rotation.y = initialRotation.y
      modelo.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
      S1_2 = false;
      S1_3 = true;
      S1_4 = false;
      currentAnimationS1 = 'animFloating';
      setAnimation('secuenciaBase');
    }
    else if (animation === 'secuencia1_4') {
      modelo.rotation.y = -initialRotation.y * 0.2
      modelo.position.set(initialPosition.x, initialPosition.y - 4, initialPosition.z);
      S1_2 = false;
      S1_3 = false;
      S1_4 = true;
      currentAnimationS1 = 'animThumbs';
      setAnimation('secuenciaBase');
    }
    else if (animation === 'firstAnimation') {
      modelo.rotation.y = -initialRotation.y * 0.2
      modelo.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
      S1_2 = false;
      S1_3 = false;
      S1_4 = false;
      S1_First = true;
      currentAnimationS1 = 'animOnlyFalling';
      setAnimation('secuenciaBase');   
    }


    return () => {
      try {
        mixer.removeEventListener('finished', secuence1);
      } catch (error) { }
    }
  }, [animation]);


  // Create Scene:
  useEffect(() => {

    clock = new THREE.Clock();
    const container = refContainer.current;

    // Renderer:
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    setRendererState(renderer)
    container.appendChild(renderer.domElement);

    // Envaironment:
    const scene = new THREE.Scene();
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
    controls.enabled = orbitalControl
    setControlState(controls)

    // Luces:
    const dirLight = new THREE.DirectionalLight(0xffffff, 10);
    dirLight.position.set(0, 0, 30);
    dirLight.castShadow = false;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = - 2;
    dirLight.shadow.camera.left = - 2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
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
      console.log('Robot Loaded');
      setModelLoaded({robot: true })
    };

    // FBX loader:
    const loader = new FBXLoader(loadingManager);
    let model1
    loader.load(`3Dmodels/${fileName}`, function (model) {
      model1 = model
      model.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
      model.rotation.set(initialRotation.x, initialRotation.y, initialRotation.z);
      model.scale.set(scale.x, scale.y, scale.z);


      // Añadir Material:
      addMaterial({ m: model });
      setModelo(model)

      // Animación:
      if (animationEnabled) {

        animacionesCargadas = false
        mixer = new THREE.AnimationMixer(model);

        const animationFBX = new FBXLoader();
        animationFBX.setPath('3Dmodels/robot/animations/');
        animationFBX.load('StandingGreeting.fbx', (fbxAnim) => {
          animationFBX.load('Jumping Down.fbx', (fbxAnim2) => {
            animationFBX.load('Jumping.fbx', (fbxAnim3) => {
              animationFBX.load('Falling Idle.fbx', (fbxAnim4) => {
                animationFBX.load('Treading Water.fbx', (fbxAnim5) => {
                  animationFBX.load('Male Dynamic Pose.fbx', (fbxAnim6) => {
                    animationFBX.load('Dance.fbx', (fbxAnim7) => {
                      animationFBX.load('ThumbsUp.fbx', (fbxAnim8) => {
                        animaciones = {
                          'animGreeting': mixer.clipAction(fbxAnim.animations[0]),
                          'animStand': mixer.clipAction(model.animations[1]),
                          'animStretch': mixer.clipAction(model.animations[0]),
                          'animJump1': mixer.clipAction(fbxAnim2.animations[0]),
                          'animJump2': mixer.clipAction(fbxAnim3.animations[0]),
                          'animFalling': mixer.clipAction(fbxAnim4.animations[0]),
                          'animFloating': mixer.clipAction(fbxAnim5.animations[0]),
                          'animFloating2': mixer.clipAction(fbxAnim6.animations[0]),
                          'animDance': mixer.clipAction(fbxAnim7.animations[0]),
                          'animThumbs': mixer.clipAction(fbxAnim8.animations[0]),
                        }
                        animacionesCargadas = true
                      });
                    });
                  });
                });
              });
            });
          });
        });

      }

      // Añadir modelo a escena:
      scene.add(model);
      setSceneState(scene);

    }, undefined, function (e) { console.error(e); });


    function handleWindowResize() {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth/newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    }


    window.addEventListener('resize', handleWindowResize); // Use an event listener for window resize

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);



  return (
    <div className='w-full h-full' ref={refContainer}></div>
  )
}
