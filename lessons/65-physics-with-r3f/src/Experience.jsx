import { useGLTF, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { InstancedRigidBodies, CylinderCollider, CuboidCollider, RigidBody, Physics } from '@react-three/rapier'
import { useMemo,useState, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Experience()
{
    const [ hitSound ] = useState(() => new Audio('/hit.mp3'))

    const collisionEnter = () =>
    {
        hitSound.currentTime = 0
        hitSound.volume = Math.random()
        hitSound.play()
    }
    const hamburger = useGLTF('./hamburger.glb')
    const twister = useRef()
    const cube = useRef()
    const cubes = useRef()


    useFrame((state) =>
    {
        const time = state.clock.getElapsedTime()
        const eulerRotation = new THREE.Euler(0, time * 10, 0)
        const quaternionRotation = new THREE.Quaternion()
        quaternionRotation.setFromEuler(eulerRotation)
        twister.current.setNextKinematicRotation(quaternionRotation)

        const angle = time * 0.5
        const x = Math.cos(angle) * 2
        const z = Math.sin(angle) * 2
        // twister.current.setNextKinematicTranslation({ x: x, y: - 0.8, z: z })
    })

    const cubesCount = 100
    const instances = useMemo(() =>
    {
        const instances = []

        for(let i = 0; i < cubesCount; i++)
        {
            instances.push({
                key: 'instance_' + i,
                position:
                    [
                        (Math.random() - 0.5) * 8,
                        6 * i * 0.2,
                        (Math.random() - 0.5) * 8
                    ],
                rotation: [ Math.random(), Math.random(), Math.random() ],
            })
        }
        return instances
    }, [])
    // useEffect(() =>
    // {
    //     for(let i = 0; i < cubesCount; i++)
    //     {
    //         const matrix = new THREE.Matrix4()
    //         matrix.compose(
    //             new THREE.Vector3(i * 2, 0, 0),
    //             new THREE.Quaternion(),
    //             new THREE.Vector3(1, 1, 1)
    //         )
    //         cubes.current.setMatrixAt(i, matrix)
    //     }
    // })
    const cubeJump = () =>
    {
        const mass = cube.current.mass()
        cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 })
        cube.current.applyTorqueImpulse({   x: Math.random() - 0.5,
                                            y: Math.random() - 0.5,
                                            z: Math.random() - 0.5 })
    }
    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        <Physics  gravity={ [ 0, - 9.81, 0 ] }>
            <RigidBody colliders="ball" position={ [ - 1.5, 2, 0 ] }>
                <mesh castShadow >
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </RigidBody>

            <RigidBody
                ref={ cube }
                position={ [ 1.5, 2, 0 ] }
                gravityScale={ 1 }
                restitution={ 0 }
                friction={ 0.7 }
                colliders={ false }
                // onCollisionEnter={ collisionEnter }
                // onCollisionExit={ () => console.log('exit') }
                >
                <mesh castShadow onClick={ cubeJump}>
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                    <CuboidCollider mass={ 2 } args={ [ 0.5, 0.5, 0.5 ] } />
                </mesh>
            </RigidBody>

            <RigidBody
                type='fixed'
                restitution={ 0 }
                friction={ 0.7 }>
                <mesh receiveShadow position-y={ - 1.25 }>
                    <boxGeometry args={ [ 10, 0.5, 10 ] } />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
            </RigidBody>

            <RigidBody type="fixed">
                <CuboidCollider args={ [ 5, 2, 0.5 ] } position={ [ 0, 1, 5.5 ] } />
                <CuboidCollider args={ [ 5, 2, 0.5 ] } position={ [ 0, 1, - 5.5 ] } />
                <CuboidCollider args={ [ 0.5, 2, 5 ] } position={ [ 5.5, 1, 0 ] } />
                <CuboidCollider args={ [ 0.5, 2, 5 ] } position={ [ - 5.5, 1, 0 ] } />
            </RigidBody>

            <RigidBody
                ref={ twister }
                position={ [ 0, - 0.8, 0 ] }
                friction={ 0 }
                type='kinematicPosition'>
                <mesh castShadow scale={ [ 0.4, 0.4, 5 ] }>
                    <boxGeometry/>
                    <meshStandardMaterial color="red" />
                </mesh>
            </RigidBody>

            <RigidBody colliders={false} position={ [ 0, 4, 0 ] }>
                <primitive object={ hamburger.scene } scale={ 0.25 }/>
                <CylinderCollider args={ [ 0.5, 1.25 ] } />
            </RigidBody>

            <InstancedRigidBodies instances={ instances }>
                <instancedMesh
                    castShadow
                    receiveShadow
                    args={ [ null, null, cubesCount]}>
                    <boxGeometry/>
                    <meshStandardMaterial color='tomato'/>
                </instancedMesh>
            </InstancedRigidBodies>
        </Physics>
    </>
}



// import React, { useRef } from 'react'
// import { useFrame } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import { CuboidCollider,RigidBody, Physics } from '@react-three/rapier'

// const RandomCube = ({ position, rotation }) => {
//   const meshRef = useRef()

//   return (
//     <RigidBody position={position} rotation={rotation}>
//       <mesh ref={meshRef}>
//         <boxGeometry args={[0.5, 0.5, 0.5]} />
//         <meshStandardMaterial color="purple" />
//       </mesh>
//     </RigidBody>
//   )
// }

// const CubeContainer = () => {
//   const containerSize = 20
//   const spacing = 1.5
//   const cubes = []

//   for (let i = 0; i < 1000; i++) {
//     const position = [
//       (Math.random() - 0.5) * (containerSize - spacing),
//       (Math.random() - 0.5) * (containerSize - spacing),
//       (Math.random() - 0.5) * (containerSize - spacing)
//     ]
//     const rotation = [
//       Math.random() * Math.PI * 2,
//       Math.random() * Math.PI * 2,
//       Math.random() * Math.PI * 2
//     ]
//     cubes.push(<RandomCube key={i} position={position} rotation={rotation} />)
//   }

//   return (
//     <group>
//       {cubes}
//     </group>
//   )
// }

// const Scene = () => {

//     const sunRef = useRef()

//     useFrame(() => {
//       if (sunRef.current) {
 //     Apply custom gravity downward to the ball
//         sunRef.current.applyImpulse({ x: 0, y: -287, z: 0 }, true)
//       }
//     })
//   return (
//     <>
//         <OrbitControls makeDefault />
//         <directionalLight castShadow position={ [ 1, 2, 3 ] } />
//         <ambientLight intensity={ 1.5 } />
//         <Physics>
//         <CubeContainer position={[0, 30, 0]} />

//         <RigidBody type='fixed' position={[0, -10, 0]}>
//             {/* Floor */}
//             <mesh position={[0, 0, 0]}>
//                 <boxGeometry args={[25, 0.5, 25]} />
//                 <meshStandardMaterial color="greenyellow" />
//             </mesh>
//             {/* Left Wall */}
//             <mesh position={[-12.5, 1.25, 0]}>
//                 <boxGeometry args={[0.5, 5, 25]} />
//                 <meshStandardMaterial color="greenyellow" />
//             </mesh>
//             {/* Right Wall */}
//             <mesh position={[12.5, 1.25, 0]}>
//                 <boxGeometry args={[0.5, 5, 25]} />
//                 <meshStandardMaterial color="greenyellow" />
//             </mesh>
//             {/* Front Wall */}
//             <mesh position={[0, 1.25, -12.5]}>
//                 <boxGeometry args={[25, 5, 0.5]} />
//                 <meshStandardMaterial color="greenyellow" />
//             </mesh>
//             {/* Back Wall */}
//             <mesh position={[0, 1.25, 12.5]}>
//                 <boxGeometry args={[25, 5, 0.5]} />
//                 <meshStandardMaterial color="greenyellow" />
//             </mesh>
//         </RigidBody>

//         <RigidBody
//             ref={sunRef}
//             colliders="ball"
//             position={[0, 100, 0]}
//             gravity={ [ 0, -287, 0 ] }>
//             <mesh >
//                 <sphereGeometry/>
//                 <meshStandardMaterial color="red" />
//             </mesh>
//         </RigidBody>
//       </Physics>
//     </>
//   )
// }

// export default Scene
