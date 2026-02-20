/**
 * Sistema de Contador de Almas (GLOBAL)
 * Ahora consulta el servidor (Node.js) para obtener el conteo compartido por todos los usuarios.
 */
document.addEventListener('DOMContentLoaded', () => {
    const counterElement = document.getElementById('hit-counter');

    // Si abrimos el archivo directamente (file://), usamos la URL absoluta del servidor.
    // Si estamos en el servidor (localhost), usamos la ruta relativa.
    const apiBase = window.location.protocol === 'file:' ? 'http://localhost:3000' : '';

    fetch(`${apiBase}/api/counter`)
        .then(response => response.json())
        .then(data => {
            if (counterElement) {
                // Formateamos con ceros a la izquierda (look retro)
                counterElement.textContent = data.souls.toString().padStart(7, '0');
            }
        })
        .catch(err => {
            console.error('Error al conectar con el servidor de almas:', err);
            if (counterElement) {
                counterElement.textContent = 'ERROR';
            }
        });
});
