import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';

var scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 1);
var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setClearColor(0x808080);
var canvas = renderer.domElement
document.body.appendChild(canvas);

const controls = new OrbitControls(camera, renderer.domElement);

// var light = new THREE.HemisphereLight( 0xffffff, 0x222222, 1 );
// scene.add( light );

const loader = new GLTFLoader();

loader.load( './assets/images/Craftroom_Plans2.glb', function ( gltf ) {
  console.log(gltf);
  gltf.scene.position.z = -5;
  gltf.scene.position.x = -2;
  gltf.scene.position.y = -2;
  scene.add( gltf.scene );

}, undefined, function ( error ) {

  console.error( error );

} );

render();

function render() {
    if (resize(renderer)) {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function resize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
    renderer.setSize(width, height, false);
    }
    return needResize;
}