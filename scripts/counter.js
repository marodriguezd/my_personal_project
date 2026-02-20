/**
 * Sistema de Contador de Almas (ALEATORIO)
 * En lugar de persistir, genera un número aleatorio cada vez para dar esa sensación
 * de que hay millones de almas en el nexo.
 */
document.addEventListener('DOMContentLoaded', () => {
    const counterElement = document.getElementById('hit-counter');

    // Generar un número aleatorio grande (ej: entre 500,000 y 5,000,000)
    const randomSouls = Math.floor(Math.random() * (5000000 - 500000 + 1)) + 500000;

    // Mostrar con el formato retro (7 dígitos con ceros a la izquierda)
    if (counterElement) {
        counterElement.textContent = randomSouls.toString().padStart(7, '0');
    }
});
