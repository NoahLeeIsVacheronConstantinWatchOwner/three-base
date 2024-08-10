import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const abc = 1234;
const string = "The truth of NYU ITP IMA"
const obj = {
    name: "Rachel",
    funcA: () =>{
        return "hello"
    }
    
}
console.log (obj.funcA())
const arr = [1, 2, 3, 4, 5]
console.log(arr)
const func = (a, b) => {
    return a + b;
}

console.log(func(abc, arr[4]));
const bool = true;
console.log(bool);
const n = null;

class Person {
    constructor(name){
        this.name = name
    }
    greeting(word){
        return`${word} ${this.name}`
    }
}
const holly = new Person(`holly`).greeting("hi there");
const johnny = new Person(`johnny`).greeting("welcome");
console.log(holly, johnny);

console.log(abc);
console.log(string);
console.log(obj.name);
const textureloader = new THREE.TextureLoader();
const matcaptexture = textureloader.load("/textures/matcaps/8.png")
const boxtexture = textureloader.load("/textures/matcaps/1.png")
const spheretexture = textureloader.load("/textures/matcaps/3.png")



/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
const material = new THREE.MeshMatcapMaterial()//new THREE.MeshBasicMaterial()
material.matcap = matcaptexture
const boxmaterial =  new THREE.MeshMatcapMaterial()//new THREE.MeshBasicMaterial()
boxmaterial.matcap = boxtexture
const spherematerial = new THREE.MeshMatcapMaterial()//new THREE.MeshBasicMaterial()
spherematerial.matcap = spheretexture
const sphere = new THREE.Mesh(new THREE.SphereGeometry (0.5, 16, 16), spherematerial)
const torus = new THREE.Mesh(new THREE.SphereGeometry (0.5, 16, 16), material)
const box = new THREE.Mesh(new THREE.BoxGeometry (1, 1, 1), boxmaterial)
torus.position.x = 1.5
box.position.x = -1.5
scene.add(sphere, torus, box)
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
const amp = 1
const freq = 5
const offset = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const spherescaleanimation1 = Math.sin(elapsedTime*freq+offset)*amp+2
    const spherescaleanimation2 = Math.cos(elapsedTime*freq+offset)*amp+2

    // Update controls
    controls.update()
    // box.rotation.x = spherescaleanimation1
    // box.scale.x = spherescaleanimation1
    //torus.rotation.y = elapsedTime*5
    //torus.rotation.x = elapsedTime*5
    //torus.scale.x = Math.sin(elapsedTime*2)+2
    //torus.scale.y = Math.sin(elapsedTime*2)+2
    //torus.scale.z = Math.sin(elapsedTime*2)+2
    // sphere.scale.x = spherescaleanimation1
    // sphere.scale.y = spherescaleanimation1
    // sphere.scale.z = spherescaleanimation1
    //sphere.position.x = Math.sin(elapsedTime)//spherescaleanimation1
    sphere.position.y = Math.sin(elapsedTime)//spherescaleanimation2
    sphere.position.z = Math.cos(elapsedTime)//spherescaleanimation1

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()