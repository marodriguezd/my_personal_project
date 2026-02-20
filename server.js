const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const COUNTER_FILE = path.join(__dirname, 'conteos.txt');
const MESSAGES_FILE = path.join(__dirname, 'mensajes.txt');

// Asegurar que los archivos existen
if (!fs.existsSync(COUNTER_FILE)) fs.writeFileSync(COUNTER_FILE, '0');
if (!fs.existsSync(MESSAGES_FILE)) fs.writeFileSync(MESSAGES_FILE, '[]');

const server = http.createServer((req, res) => {
    // API: Contador Global
    if (req.url === '/api/counter' && req.method === 'GET') {
        let count = parseInt(fs.readFileSync(COUNTER_FILE, 'utf8') || '0');
        count++;
        fs.writeFileSync(COUNTER_FILE, count.toString());
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' // Permitir peticiones desde cualquier origen (CORS)
        });
        return res.end(JSON.stringify({ souls: count }));
    }

    // API: Libro de Visitas (Obtener mensajes)
    if (req.url === '/api/guestbook' && req.method === 'GET') {
        const messages = fs.readFileSync(MESSAGES_FILE, 'utf8');
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        return res.end(messages);
    }

    // API: Libro de Visitas (Guardar mensaje)
    if (req.url === '/api/guestbook' && req.method === 'POST') {
        // Manejar Preflight request (CORS)
        if (req.method === 'OPTIONS') {
            res.writeHead(204, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            });
            return res.end();
        }

        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            const newEntry = JSON.parse(body);
            const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8') || '[]');
            messages.push(newEntry);
            fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
            res.writeHead(201, { 'Access-Control-Allow-Origin': '*' });
            res.end();
        });
        return;
    }

    // Servidor de Archivos Estáticos
    let filePath = '.' + req.url;
    if (filePath === './') filePath = './index.html';

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('Archivo no encontrado');
            } else {
                res.writeHead(500);
                res.end('Error del servidor: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Servidor retro corriendo en http://localhost:${PORT}`);
    console.log('El contador global se guarda en conteos.txt');
});
