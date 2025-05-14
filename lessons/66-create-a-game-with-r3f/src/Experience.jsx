import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import Level from './Level.jsx'
import { Physics } from '@react-three/rapier'

export default function Experience()
{
    return <>

        <OrbitControls makeDefault />

        < Physics debug>
            <Lights>
                <directionalLight
                    castShadow
                    position={ [4,4,1]}
                    intensity={ 1.5}
                    shadow-mapSize={ [1024, 1024]}
                    shadow-camera-near={ 1 }
                    shadow-camera-far={ 10 }
                    shadow-camera-top={ 2 }
                    shadow-camera-right={ 2 }
                    shadow-camera-bottom={ - 2 }
                    shadow-camera-left={ - 2 }
                />
            </Lights>

            <Level />
        </Physics>

        <mesh castShadow position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}