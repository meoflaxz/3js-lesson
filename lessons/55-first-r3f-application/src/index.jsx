import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))
const cameraSettings = {
    fov: 45,
    // zoom: - 1000,
    near: 0.1,
    far: 2000,
    position: [ 3, 2, 4000 ]
}

root.render(
    <Canvas camera={ cameraSettings }>
        <Experience />
    </Canvas>
)