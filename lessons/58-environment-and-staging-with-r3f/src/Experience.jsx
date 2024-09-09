import { useThree, useFrame } from '@react-three/fiber'
import { Environment, Sky, ContactShadows, RandomizedLight, AccumulativeShadows, SoftShadows, BakeShadows, useHelper, OrbitControls } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { useControls} from 'leva'

export default function Experience()
{
    const { envMapIntensity } = useControls('environment map', {
        envMapIntensity: { value: 3.5, min: 0, max: 12 }
    })
    const scene = useThree(state => state.scene)
    useEffect(() =>
    {
        scene.environmentIntensity = envMapIntensity
    }, [ envMapIntensity ])

    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)
    const cube = useRef()
    
    const { sunPosition } = useControls('sky', {
        sunPosition: { value: [1, 2, 3 ]}
    })

    const { color, opacity, blur } = useControls('contact shadows', {
        color: '#000000',
        opacity: { value: 0.5, min: 0, max: 1 },
        blur: { value: 1, min: 0, max: 10 }
    })

    useFrame((state, delta) =>
    {
        cube.current.rotation.y += delta * 0.2
        // const time = state.clock.elapsedTime
        // cube.current.position.x = 2 + Math.sin(time)
    })

    return <>

        <Environment
            preset='sunset'
            ground={{
                height: 7,
                radius: 28,
                scale: 100
            }}>
            {/* <color args={ [ 'blue' ] } attach="background" />
                <mesh position-z={ - 5 } scale={ 10 }>
                    <planeGeometry />
                    <meshBasicMaterial color="red" />
                </mesh> */}
        </Environment>
        <ContactShadows 
            position={ [ 0, 0, 0 ] }
            scale={10}
            resolution={512}
            far={5}
            color={color}
            opacity={opacity}
            blur={blur}
            frames={1}/>
        {/* <SoftShadows size={25} samples={10} focus={0}/> */}
        
        {/* <color attach={'background'}/> */}

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight
            ref={ directionalLight }
            position={ sunPosition }
            castShadow
            intensity={ 4.5 }
            shadow-mapSize={ [ 1024, 1024 ] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 10 }
            shadow-camera-top={ 5 }
            shadow-camera-right={ 5 }
            shadow-camera-bottom={ 5 }
            shadow-camera-left={ 5 }/>
        {/* <AccumulativeShadows
            position={[0, - 0.99, 0]}
            scale={10}
            color="#316d39"
            opacity={ 0.8 }
            frames={ Infinity }
            temporal
            blend={100}
            >
                <RandomizedLight
                    position={[1, 2, 3]}
                    amount={ 8 }
                    radius={ 1 }
                    ambient={ 0.5 }
                    intensity={ 3 }
                    bias={ 0.001 }/>             
        </AccumulativeShadows> */}
        <ambientLight intensity={ 5 } />

        <mesh castShadow position-y={ 1 } position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow ref={ cube } position-y={ 1 } position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh receiveShadow position-y={ 0 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>
    </>
}