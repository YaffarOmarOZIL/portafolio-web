// js/animations.js

/**
 * Animación #1: Título de Héroe Letra por Letra
 * Esta función toma el título principal y lo anima para que aparezca
 * con un efecto de cascada, letra por letra.
 */
export function animateHeroText() {
    const heroTitle = document.querySelector('.ml-hero');
    if (!heroTitle) return; // Si no encuentra el elemento, no hace nada

    // Reemplaza el texto con una serie de <span>, uno por cada letra
    heroTitle.innerHTML = heroTitle.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    // Usa la línea de tiempo de anime.js para controlar la animación
    anime.timeline({ loop: false })
        .add({
            targets: '.ml-hero .letter',
            translateY: [-100, 0],   // Anima desde arriba hacia su posición
            opacity: [0, 1],         // Anima de transparente a opaco
            easing: "easeOutExpo",   // Una curva de animación suave y agradable
            duration: 1400,          // Duración total de la animación
            delay: (el, i) => 30 * i // Retraso escalonado para el efecto cascada
        });
}

/**
 * Animación #2: Aparición de Elementos al Hacer Scroll
 * Usa la API IntersectionObserver (muy eficiente) para detectar cuándo
 * un elemento entra en la pantalla y le añade una clase para animarlo.
 */
export function setupScrollAnimations() {
    const targets = document.querySelectorAll('.animate-on-scroll');
    
    // El observador vigila los elementos
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si el elemento es visible...
            if (entry.isIntersecting) {
                // ...le añadimos la clase que activa la transición CSS
                entry.target.classList.add('is-visible');
                // Dejamos de observar este elemento para que la animación no se repita
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 // La animación se dispara cuando el 10% del elemento es visible
    });

    // Le decimos al observador qué elementos debe vigilar
    targets.forEach(target => {
        observer.observe(target);
    });
}