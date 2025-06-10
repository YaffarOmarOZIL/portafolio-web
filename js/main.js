// js/main.js

// Importamos las funciones específicas desde nuestro módulo de animaciones
import { animateHeroText, setupScrollAnimations } from './animations.js';

/**
 * Función Principal de la Aplicación
 * Se ejecuta una sola vez, cuando todo el contenido del HTML está listo.
 */
function initializePortfolio() {
    
    // Llama a las funciones para activar todas las animaciones del sitio
    animateHeroText();
    setupScrollAnimations();
    
    console.log("Portafolio de David cargado y animado. ¡Éxito!");
}

// Este es el punto de entrada. Espera a que el DOM esté completamente
// cargado antes de ejecutar nuestro código para evitar errores.
document.addEventListener('DOMContentLoaded', initializePortfolio);