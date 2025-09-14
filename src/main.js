import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Pane } from 'tweakpane';

const pane = new Pane();

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const planeGeometry = new THREE.PlaneGeometry(1, 1);

const material = new THREE.MeshPhysicalMaterial();
material.color = new THREE.Color('green');

pane.addBinding(material, 'metalness', { min: 0, max: 1, step: 0.01 });
pane.addBinding(material, 'roughness', { min: 0, max: 1, step: 0.01 });
// reflectivity
pane.addBinding(material, 'reflectivity', { min: 0, max: 1, step: 0.01 });
// clearcoat
pane.addBinding(material, 'clearcoat', { min: 0, max: 1, step: 0.01 });

const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(torusKnotGeometry, material);
mesh2.position.x = 1.5;

const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -1.5;

scene.add(mesh);
scene.add(mesh2);
scene.add(plane);

const light = new THREE.AmbientLight('white', 0.4);
scene.add(light);

const pointLight = new THREE.PointLight('white', 10);
pointLight.position.set(2, 2, 2);
scene.add(pointLight);


const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);

camera.position.z = 5;

const canvas = document.querySelector('canvas.threejs');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const renderLoop = () => {

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};

renderLoop();

