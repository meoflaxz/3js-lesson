import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const edges = new THREE.EdgesGeometry(geometry)
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 'white'}))
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
mesh.add(line)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// Clock
const clock = new THREE.Clock()

gsap.to(mesh.position, {duration: 1, delay:1, x:2})

// Animations
const tick = () =>
{
    // Clock
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    mesh.rotation.y = Math.sin(elapsedTime) * 10000
    mesh.rotation.x = Math.cos(elapsedTime)
    mesh.position.x = Math.sin(elapsedTime) * 0.5
    mesh.position.y = Math.cos(elapsedTime)
    
    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()