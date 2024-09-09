import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'
import Model from './Model.jsx'
import Placeholder from './Placeholder.jsx'
import Hamburger from './Hamburger.jsx'
import Fox from './Fox.jsx'
export default function Experience()
{

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow
            position={ [ 1, 2, 3 ] }
            intensity={ 4.5 }
            shadownormalBias={ 0.04 }/>
        <ambientLight intensity={ 1.5 } />

        <mesh receiveShadow rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <Suspense
            fallback={ <Placeholder position-y={ 0.5 } scale={ [ 2, 3, 2 ]  }/> }>
            <Hamburger scale={ 0.35 }/>
        </Suspense>
        <Fox/>
    </>
}