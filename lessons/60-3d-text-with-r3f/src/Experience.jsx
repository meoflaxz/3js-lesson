import { useMatcapTexture, Center,Text3D, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()

export default function Experience()
{     
    const donutsGroup = useRef()
    const text = useRef()
    const donuts = useRef([])
    // const [ torusGeometry, setTorusGeometry ] = useState()
    // const [ material, setMaterial ] = useState()
    useFrame((state, delta) =>
    {
        for ( const donut of donutsGroup.current.children )
        {
            donut.rotation.y += delta * 0.5
        }

        if (text.current) {
            text.current.rotation.y += delta * 0.5
        }
    })

    useEffect(() =>
    {
        matcapTexture.colorSpace = THREE.SRGBColorSpace
        matcapTexture.needsUpdate = true

        material.matcap = matcapTexture
        material.needsUpdate = true
    }, [])

    const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)

    return <>

        <Perf position="top-left" />
        <OrbitControls makeDefault />

        <Center ref={ text }>
            <Text3D 
                font="./fonts/helvetiker_regular.typeface.json"
                material={ material}
                size={ 0.75 }
                height={ 0.2 }
                curveSegments={ 12 }
                bevelEnabled
                bevelThickness={ 0.02 }
                bevelSize={ 0.02 }
                bevelOffset={ 0 }
                bevelSegments={ 5 }> 
                HELLO R3F
            </Text3D>
        </Center>

        <group ref={ donutsGroup }>
            { [...Array(100)].map((value, index)=>
                <mesh
                    ref={() => {} }
                    key = { index }
                    geometry={ torusGeometry}
                    material = { material }
                    position={ [
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10]}
                        scale={ 0.2 + Math.random() * 0.5 }
                        rotation={[
                            Math.random() * Math.PI,
                            Math.random() * Math.PI,
                            0
                        ]}>
                </mesh>
            )}
        </group>
    </>
}