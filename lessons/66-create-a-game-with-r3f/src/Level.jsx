
function BlockStart()
{
    return <mesh position = {[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={ [4, 0.2, 4] } />
        <meshStandardMaterial color="limegreen" />
    </mesh>
}


export default function Level()
{
    return <>
        <mesh castShadow position-x={ -2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh receiveShadow position-y={ -1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <BlockStart />
    </>
}