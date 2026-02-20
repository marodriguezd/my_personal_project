/**
 * Sistema de Libro de Visitas GLOBAL y PERSISTENTE
 * Ahora guarda y carga los mensajes desde el servidor (mensajes.txt).
 */
document.addEventListener('DOMContentLoaded', () => {
    const guestbookForm = document.getElementById('guestbook-form');
    const messagesContainer = document.getElementById('guestbook-messages');

    // Detectar si estamos abriendo el archivo localmente o vía servidor
    const apiBase = window.location.protocol === 'file:' ? 'http://localhost:3000' : '';

    /**
     * Cargar mensajes desde el servidor
     */
    function loadMessages() {
        fetch(`${apiBase}/api/guestbook`)
            .then(response => response.json())
            .then(savedMessages => {
                messagesContainer.innerHTML = '';
                // Renderizamos del más antiguo al más nuevo (o al revés)
                // Usamos reverse() para que el más nuevo esté arriba
                savedMessages.forEach(entry => {
                    renderMessage(entry);
                });
            })
            .catch(err => console.error('Error al cargar mensajes:', err));
    }

    /**
     * Renderiza un mensaje con estética de "marca de invocación"
     */
    function renderMessage(entry) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'pixel-border guestbook-entry';
        messageDiv.innerHTML = `
            <div class="entry-header">
                <span class="entry-author">${entry.author}</span>
                <span class="entry-date">${entry.date}</span>
            </div>
            <div class="entry-content">"${entry.message}"</div>
        `;
        messagesContainer.prepend(messageDiv);
    }

    /**
     * Enviar mensaje al servidor
     */
    if (guestbookForm) {
        guestbookForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const authorInput = document.getElementById('author-name');
            const messageInput = document.getElementById('message-text');

            if (!authorInput.value.trim() || !messageInput.value.trim()) {
                alert('¡Un viajero debe dejar su nombre y su mensaje!');
                return;
            }

            const newEntry = {
                author: authorInput.value.trim(),
                message: messageInput.value.trim(),
                date: new Date().toLocaleDateString()
            };

            // Enviamos el mensaje al servidor vía POST
            fetch(`${apiBase}/api/guestbook`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEntry)
            })
                .then(() => {
                    renderMessage(newEntry);
                    authorInput.value = '';
                    messageInput.value = '';
                    alert('¡Tu marca ha sido grabada en la piedra del servidor!');
                })
                .catch(err => {
                    console.error('Error al guardar mensaje:', err);
                    alert('La conexión con la hoguera ha fallado.');
                });
        });
    }

    loadMessages();
});
