import { Text, Html, ContactShadows, PresentationControls, Float, Environment, useGLTF, OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'

export default function Experience()
{
    const macbook = useGLTF('https://threejs-journey.com/resources/models/macbook_model.gltf')
    const { position } = useControls( {position: [ 0, -0.65 ,0 ] } )
    const { scale } = useControls( {scale: 1 } )
    return <>

        {/* <OrbitControls makeDefault /> */}
        <Environment preset="city" />

        <color
            args={['#241a1a']}
            attach={"background"} />

        <PresentationControls
            global
            rotation={ [ 0.13, 0.1, 0]}
            polar={ [ -0.4, 0.2 ]}
            azimuth={ [ -1, 0.75 ]}
            config={ {mass: 2, tension: 400 }}
            snap={ { mass: 4, tension: 400 } }
            >
            <Float rotationIntensity={ 0.4 }>
                <rectAreaLight
                    width={ 2.5 }
                    height={ 1.65 }
                    intensity={ 20 }
                    color={ '#FFFFFF' }
                    rotation={ [ - 0.1, Math.PI, 0 ] }
                    position={ [ 0, 0.55, - 1.15 ] }/>

                <primitive
                    object={ macbook.scene }
                    position-y={ - 1.2 }>
                    <Html
                        transform
                        wrapperClass='htmlScreen'
                        distanceFactor={ 1.17 }
                        position={ [ 0, 1.56, - 1.4 ] }
                        rotation-x={ - 0.256 }>
                        <iframe src='https://meoflaxz.dev/'/>
                    </Html>
                </primitive>

                <Text
                    font="./bangers-v20-latin-regular.woff"
                    fontSize={1}
                    position={ [ 2, 0.75, 0.75 ] }
                    rotation-y={ - 1.25 }
                    maxWidth={ 2 }
                    >meoflaxz
                </Text>

                <Text
                    // position={position }
                    scale={ 0.5 }
                    // font="./bangers-v20-latin-regular.woff"
                    fontSize={0.1}
                    position={ [ 1.07, - 0.67 ,-0.35 ] }
                    // rotation-y={ - 1.25 }
                    // maxWidth={ 2 }
                    rotation-x={ - 1.6 }
                    >ENTER
                </Text>

            </Float>
        </PresentationControls>

        <ContactShadows
            position-y={ - 1.4 }
            opacity={ 0.4 }
            scale={ 5 }
            blur={ 2.5 }/>
    </>
}