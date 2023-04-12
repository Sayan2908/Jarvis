"use client";
import { AppContext } from "../app/context/IsPlayingContext";
import { OrbitControls, SpotLight, useAnimations, useDepthBuffer,useGLTF } from '@react-three/drei';
import React, { useContext, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber';
// import { Vector3 } from 'react-three-fiber/dist/declarations/src';
import {Vector3} from 'three';

const Torch = ({ vec = new Vector3(),...props }) => {
    const light = useRef<THREE.SpotLight>(null);
    const viewport = useThree((state) => state.viewport);
	useFrame((state: { mouse: { x: number; y: number; }; }) => {
		light.current?.target.position.lerp(
			vec.set(
				(state.mouse.x * viewport.width) / 2,
				(state.mouse.y * viewport.height) / 2,
				0
			),
			0.1
		);
		light.current?.target.updateMatrixWorld();
	});
    return <SpotLight ref={light} castShadow penumbra={1} distance={10} angle={0.35} attenuation={5} anglePower={4} intensity={3}
    {...props}/>
};

const Head = () => {
    const { isPlaying, setIsPlaying } = useContext(AppContext);
    const model = useGLTF("/head.glb");
    const animation = useAnimations(model.animations,model.scene);
    const depthBuffer = useDepthBuffer({ frames: 1 });
    const action = animation.actions.Animation;
    useEffect(() => {
		if (isPlaying) {
			action?.play();
		} else {
			action?.fadeOut(0.5);
			setTimeout(() => {
				action?.stop();
			}, 500);
		}
	}, [isPlaying, action]);
    console.log(model);
    return (
    <>
        <primitive object={model.scene} scale={3} rotation-z={0.2} />
        <Torch
            depthBuffer={depthBuffer}
            scale={2}
            color="blue"
            position={[3, 2, 2]}
        />
        <Torch
            depthBuffer={depthBuffer}
            scale={2}
            color="#b00c3f"
            position={[-3, 2, 2]}
        />
    </>
    );
}

const ChatBotCanvas = () => {
  return (
    <Canvas style={{ height: "30vw" , width: "30vw"}} >
        <OrbitControls enableZoom={false} enableDamping maxPolarAngle={2} minAzimuthAngle={-Math.PI*0.5} maxAzimuthAngle={Math.PI*0.5}/>
        <ambientLight intensity={0.15} />
        <Head/>
    </Canvas>
  )
}

export default ChatBotCanvas;