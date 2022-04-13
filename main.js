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
const geometry  = new THREE.TorusGeometry(10, 2.5, 16, 64);
const material = new THREE.MeshToonMaterial({color:0x0cf78d});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

function addMonkey(){
    //Loading custom geometry
    const loader = new THREE.BufferGeometryLoader();
    loader.load(
        './monkey_model.json',
        // onLoad callback
        function ( geometry ) {
            const material = new THREE.MeshNormalMaterial();
            geometry.computeVertexNormals();
            const object = new THREE.Mesh( geometry, material );
            
            const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

            object.position.set(x, y, z);
            object.rotation.set(x, y, z);
            object.scale.set(1.5, 1.5, 1.5);
            scene.add(object);
        }
        );
}

//Monkey object spawn
Array(100).fill().forEach(addMonkey);

//Adding background
const comicTexture = new THREE.TextureLoader().load('./background.jpg');
scene.background = comicTexture;

//Adding avatar
const avatarTexture = new THREE.TextureLoader().load('./prashastha.jpg');
const avatar = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.MeshBasicMaterial({map:avatarTexture})
);
scene.add(avatar);

//Adding sphere
const nebulaTexture = new THREE.TextureLoader().load('./nebula.jpg');
const nebula = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({map:nebulaTexture})
);
scene.add(nebula);


nebula.position.z = 30;
nebula.position.setX(-10);

//Scrolling
function moveCamera(){
    const t = document.body.getBoundingClientRect().top;
    nebula.rotation.x += 0.05;
    nebula.rotation.y += 0.075;
    nebula.rotation.z += 0.05;

    avatar.rotation.y += 0.01;
    avatar.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera
moveCamera();

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

    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    torusKnot.rotation.z += 0.01;

    nebula.rotation.x += 0.005;

    controls.update();

    renderer.render(scene, camera);
}


animate();