import { shaderMaterial, Sparkles, useTexture, useGLTF, OrbitControls, Center } from '@react-three/drei'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#ffffff') ,
        uColorEnd: new THREE.Color('#000000') 
    },
    portalVertexShader,
    portalFragmentShader
)

extend({PortalMaterial})

export default function Experience()
{
    const { nodes } = useGLTF('./model/portal.glb')
    const bakedTexture = useTexture('./model/baked.jpg')
    bakedTexture.flipY = false

    const portalMaterial = useRef()
    const model = useRef()
    useFrame((state, delta) => 
    {
        portalMaterial.current.uTime += delta
        model.current.rotation.y += delta * -0.2

    })
    return <>

        <color
            args={ ['#030202']}
            attach="background"/>

        <OrbitControls makeDefault />

        <Center ref={model}>
            <mesh geometry={ nodes.baked.geometry }>
                <meshBasicMaterial map={ bakedTexture } />
            </mesh>

            <mesh
                geometry={ nodes.poleLightA.geometry }
                position={ nodes.poleLightA.position }>
                    <meshBasicMaterial color = "white" />
            </mesh>

            <mesh
                geometry={ nodes.poleLightB.geometry }
                position={ nodes.poleLightB.position }>
                    <meshBasicMaterial color = "white" />
            </mesh>

            <mesh
                geometry={ nodes.portalLight.geometry }
                position={ nodes.portalLight.position }
                rotation={ nodes.portalLight.rotation }>
                <portalMaterial ref={ portalMaterial }/>

            </mesh>
        </Center>
            <Sparkles
                size={6}
                scale={[ 4, 2, 4 ]}
                position-y={-0.01}
                speed={0.8}
                count={40}/>

    </>
}