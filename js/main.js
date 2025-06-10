// Espera a que todo el contenido del DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // --- Animación de entrada para el título ---
    gsap.from(".hero-title", {
        duration: 1.5,
        y: 50, // Mover desde 50px abajo
        opacity: 0,
        ease: "power3.out",
        delay: 0.5
    });

    // --- Animaciones interactivas para los proyectos ---
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const animationType = card.dataset.animationType;

        card.addEventListener('mouseenter', () => {
            // Animación común para todas las tarjetas
            gsap.to(card.querySelector('img'), {
                duration: 0.5,
                scale: 1.05,
                ease: 'power2.out'
            });

            // Animación ESPECÍFICA basada en el data-attribute
            if (animationType === 'tech-glow') {
                // Ejemplo: hacer que el borde brille con el color principal
                gsap.to(card, { 
                    duration: 0.5, 
                    boxShadow: `0 0 25px ${getComputedStyle(document.documentElement).getPropertyValue('--color-principal')}` 
                });
            } else if (animationType === 'data-viz') {
                // Podrías tener pequeños elementos SVG dentro que se animan
                // simulando una gráfica. ¡Aquí la creatividad es el límite!
            }
        });

        card.addEventListener('mouseleave', () => {
            // Revertir las animaciones
            gsap.to(card.querySelector('img'), {
                duration: 0.5,
                scale: 1,
                ease: 'power2.out'
            });
            gsap.to(card, { duration: 0.5, boxShadow: 'none' });
        });
    });

});