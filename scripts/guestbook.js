/**
 * Sistema de Libro de Visitas (GLOBAL - Supabase)
 * Versión compatible con Neocities usando la base de datos externa.
 */
document.addEventListener('DOMContentLoaded', () => {
    const guestbookForm = document.getElementById('guestbook-form');
    const messagesContainer = document.getElementById('guestbook-messages');

    // CONFIGURACIÓN SUPABASE
    const SUPABASE_URL = 'https://trefzurplbunevornsrl.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_XMOwGsaOCexesLUn-iXpRQ_bFrMoCfY';

    /**
     * Cargar mensajes desde Supabase
     */
    async function loadMessages() {
        if (SUPABASE_URL.includes('TU_URL')) {
            console.warn('Supabase URL no configurada.');
            return;
        }

        messagesContainer.innerHTML = '<p class="loading">Invocando almas desde la base de datos...</p>';

        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/guestbook?select=*&order=created_at.desc`, {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error de red: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            messagesContainer.innerHTML = '';

            if (data.length === 0) {
                messagesContainer.innerHTML = '<p>El libro está vacío. Sé el primero en dejar tu marca.</p>';
                return;
            }

            // Los mensajes vienen en orden descendente (el más nuevo primero)
            data.forEach(entry => {
                renderMessage(entry);
            });
        } catch (error) {
            console.error('Error cargando mensajes:', error);
            messagesContainer.innerHTML = `
                <div class="pixel-border error-msg" style="color: #ff4444; padding: 10px; margin: 10px 0;">
                    <p><strong>ERROR DE CONEXIÓN:</strong></p>
                    <p>La hoguera no responde. Esto puede deberse a:</p>
                    <ul style="font-size: 0.8em; text-align: left;">
                        <li>Caché del navegador (prueba Control + F5)</li>
                        <li>Configuración de seguridad en Supabase</li>
                        <li>Error de red: ${error.message}</li>
                    </ul>
                </div>
            `;
        }
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
                <span class="entry-date">${entry.date_string}</span>
            </div>
            <div class="entry-content">"${entry.message}"</div>
        `;
        // Usamos append porque el query ya trae el orden correcto
        messagesContainer.appendChild(messageDiv);
    }

    /**
     * Enviar mensaje (Guardar en Supabase)
     */
    if (guestbookForm) {
        guestbookForm.addEventListener('submit', async (e) => {
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
                date_string: new Date().toLocaleDateString()
            };

            try {
                const response = await fetch(`${SUPABASE_URL}/rest/v1/guestbook`, {
                    method: 'POST',
                    headers: {
                        'apikey': SUPABASE_KEY,
                        'Authorization': `Bearer ${SUPABASE_KEY}`,
                        'Content-Type': 'application/json',
                        'Prefer': 'return=representation'
                    },
                    body: JSON.stringify(newEntry)
                });

                if (response.ok) {
                    const savedEntry = (await response.json())[0];
                    renderMessageAtTop(savedEntry);
                    authorInput.value = '';
                    messageInput.value = '';
                    alert('¡Tu marca ha sido grabada globalmente en la hoguera!');
                } else {
                    throw new Error('No se pudo guardar el mensaje');
                }
            } catch (error) {
                console.error('Error al guardar:', error);
                alert('La hoguera se ha apagado... Inténtalo de nuevo más tarde.');
            }
        });
    }

    function renderMessageAtTop(entry) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'pixel-border guestbook-entry';
        messageDiv.innerHTML = `
            <div class="entry-header">
                <span class="entry-author">${entry.author}</span>
                <span class="entry-date">${entry.date_string}</span>
            </div>
            <div class="entry-content">"${entry.message}"</div>
        `;
        messagesContainer.prepend(messageDiv);
    }

    loadMessages();
});
