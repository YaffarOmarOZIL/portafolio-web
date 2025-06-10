import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Registrar el plugin de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- 1. CONFIGURACIÓN DE LA ESCENA 3D ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    alpha: true // Fondo transparente para ver el CSS
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 0.5, 4);

// --- 2. ILUMINACIÓN ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// --- 3. CARGADOR DEL MODELO 3D (ZORRO) ---
const loader = new GLTFLoader();
let fox;

loader.load(
    'assets/models/low_poly_fox_model.glb', 
    function (gltf) {
        fox = gltf.scene;
        fox.scale.set(1.5, 1.5, 1.5); // ¡OJO! La escala puede variar, ajústala
        fox.position.y = -1.2;
        scene.add(fox);
    },
    undefined,
    (error) => console.error('Error al cargar el modelo 3D:', error)
);

// --- 4. INTERACTIVIDAD CON EL MOUSE ---
let mouseX = 0;
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
});

// --- 5. BUCLE DE ANIMACIÓN ---
function animate() {
    requestAnimationFrame(animate);

    // Animación sutil del zorro siguiendo el mouse
    if (fox) {
        fox.rotation.y += (mouseX * 0.8 - fox.rotation.y) * 0.05;
    }

    renderer.render(scene, camera);
}
animate();

// --- 6. MANEJAR REDIMENSIONAMIENTO ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- 7. ANIMACIONES CON GSAP Y SCROLLTRIGGER ---
// Animación de entrada del Hero
gsap.to(".animate-hero", {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    delay: 0.5
});

// Animaciones al hacer scroll
const sections = document.querySelectorAll('.content-section');
sections.forEach(section => {
    const sectionTitle = section.querySelector('.section-title');
    const elementsToAnimate = section.querySelectorAll('.project-card, .skill-category, form');

    // Animar título de la sección
    if(sectionTitle) {
        gsap.fromTo(sectionTitle, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                }
            }
        );
    }
    
    // Animar contenido de la sección
    if(elementsToAnimate.length > 0) {
        gsap.fromTo(elementsToAnimate,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                }
            }
        );
    }
});