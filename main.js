import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

//Adding light source
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.5 );
scene.add( directionalLight );

//Adding helpers
const gridHelper = new THREE.GridHelper(200,50);
scene.add( gridHelper);

//Adding contrls
const controls = new OrbitControls(camera, renderer.domElement);

//Addding torus knot
const geometry  = new THREE.TorusKnotGeometry(10, 3, 100, 64);
const material = new THREE.MeshToonMaterial({color:0x80ff00});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

function addMonkey(){
    //Loading custom geometry
    const loader = new THREE.BufferGeometryLoader();
    loader.load(
        'monkey_model.json',
        // onLoad callback
        function ( geometry ) {
            const material = new THREE.MeshNormalMaterial();
            geometry.computeVertexNormals();
            const object = new THREE.Mesh( geometry, material );
            
            const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

            object.position.set(x, y, z);
            object.rotation.set(x, y, z);
            //object.scale.set(0.75, 0.75, 0.75);
            scene.add(object);
        }
        );
}

//Monkey object spawn
Array(100).fill().forEach(addMonkey);

//Adding background
const comicTexture = new THREE.TextureLoader().load('background.jpg');
scene.background = comicTexture;

//Window resizer
window.addEventListener( 'resize', onWindowResize );

function onWindowResize() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );

}

function animate(){
    requestAnimationFrame(animate);

    torusKnot.rotation.x += 0.02;
    torusKnot.rotation.y += 0.02;

    controls.update();

    renderer.render(scene, camera);
}


animate();