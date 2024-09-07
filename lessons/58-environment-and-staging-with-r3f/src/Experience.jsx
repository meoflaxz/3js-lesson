import { useFrame } from '@react-three/fiber'
import { BakeShadows, useHelper, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'

export default function Experience()
{
    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)
    const cube = useRef()
    
    useFrame((state, delta) =>
    {
        cube.current.rotation.y += delta * 0.2
    })

    return <>
        <BakeShadows/>
        
        <color args={['#ivory']} attach={'background'}/>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight ref={ directionalLight } castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        <mesh castShadow position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow ref={ cube } position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}