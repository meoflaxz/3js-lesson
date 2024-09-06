import { MeshNormalMaterial } from "three/src/Three.js";
import { useRef } from 'react'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useThree, extend, useFrame } from '@react-three/fiber'
extend({ OrbitControls})
import CustomObject from "./CustomObject";
export default function Experience ()
{
    const { camera, gl } = useThree()
    const cubeRef = useRef()
    const groupRef = useRef()
    useFrame((state, delta) =>
        {
            const angle = state.clock.elapsedTime
            state.camera.position.x = Math.sin(angle) * 8
            state.camera.position.z = Math.cos(angle) * 8
            state.camera.lookAt(0,0,0)
            cubeRef.current.rotation.y += delta
        })

    return <>
        <directionalLight/>
        <ambientLight intensity={ 1.5 } />
        <orbitControls args={[camera, gl.domElement]} />

        <group ref={ groupRef }>
            <mesh ref={ cubeRef } position-x={ - 2 }>
                <sphereGeometry />
                <meshStandardMaterial color="lightblue"/>
            </mesh>

            <mesh ref={ cubeRef } rotation-y={ Math.PI * 0.25 } position-x={ 2 } scale={ 1.5 }>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple"/>
            </mesh>

            <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow"/>
            </mesh>
        </group>
        <CustomObject/>
    </>
}

