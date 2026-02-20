/**
 * Sistema de Libro de Visitas (LOCAL / ESTÁTICO)
 * Versión compatible con Neocities usando localStorage.
 */
document.addEventListener('DOMContentLoaded', () => {
    const guestbookForm = document.getElementById('guestbook-form');
    const messagesContainer = document.getElementById('guestbook-messages');
    const STORAGE_KEY = 'ds_guestbook_messages';

    /**
     * Cargar mensajes desde localStorage
     */
    function loadMessages() {
        const savedMessages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        messagesContainer.innerHTML = '';
        // Mostramos los mensajes guardados
        savedMessages.forEach(entry => {
            renderMessage(entry);
        });
    }

    /**
     * Renderiza un mensaje
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
     * Enviar mensaje (Guardar en localStorage)
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

            // Guardar en array local
            const savedMessages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
            savedMessages.push(newEntry);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(savedMessages));

            // Actualizar UI
            renderMessage(newEntry);
            authorInput.value = '';
            messageInput.value = '';
            alert('¡Tu marca ha sido grabada en tu navegador!');
        });
    }

    loadMessages();
});
