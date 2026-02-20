/**
 * Sistema de Contador de Almas (TIEMPO DE VIDA)
 * Calcula el total de horas transcurridas desde el 28 de agosto de 1999 a las 20:00.
 */
document.addEventListener('DOMContentLoaded', () => {
    const counterElement = document.getElementById('hit-counter');
    const birthDate = new Date('1999-08-28T20:00:00');

    function updateCounter() {
        if (!counterElement) return;

        const now = new Date();
        const diffMs = now - birthDate;
        const hours = Math.floor(diffMs / (1000 * 60 * 60));

        // Mostrar con el formato retro (7 dígitos con ceros a la izquierda)
        counterElement.textContent = hours.toString().padStart(7, '0');
    }

    // Actualizar al cargar
    updateCounter();

    // Actualizar cada minuto para mantener la precisión
    setInterval(updateCounter, 60000);
});
