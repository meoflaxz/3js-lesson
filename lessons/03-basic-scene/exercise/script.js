import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Textures
const textureLoader = new THREE.TextureLoader()
const mkbhdcolor = textureLoader.load('./textures/gambar.jpg')
const mkbhddepth = textureLoader.load('./textures/gambargelap.jpg')

// Object
const material = new THREE.MeshStandardMaterial()
material.map = mkbhdcolor   
material.aoMap = mkbhddepth
material.aoMapIntensity = 0.5

material.displacementMap = mkbhddepth
material.displacementScale = 0.1
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1, 100, 100),
    material
)
scene.add(plane)



// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({color: 'red'}) 
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// Sizes
const sizes = {width: 800, height: 600}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
camera.position.z = 2

scene.add(camera)

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
camera.add(pointLight)

// Controls
const control = new OrbitControls(camera, canvas)
control.enableDamping = true

// Renderer 
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)





// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = 0.1 * elapsedTime
    // plane.rotation.y = 0.1 * elapsedTime
    // torus.rotation.y = 0.1 * elapsedTime

    // sphere.rotation.x = -0.15 * elapsedTime
    // plane.rotation.x = -0.15 * elapsedTime
    // torus.rotation.x = -0.15 * elapsedTime

    // Update controls
    control.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()