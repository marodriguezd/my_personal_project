# Proyecto: THE UNDEAD PORTFOLIO (Retro Dark Souls x Neocities)

Este documento resume el estado actual del proyecto, las decisiones técnicas clave y la estructura para futuras iteraciones en Neocities.

## 🎯 Objetivo General

Rediseño de un portfolio personal con una estética **retro de los 2000 (estilo GeoCities)** fusionada con la atmósfera oscura de **Dark Souls**. El sitio es 100% estático y compatible con **Neocities.org**.

## 🛠️ Características Técnicas Implementadas

### 1. Sistema de Fondo "Split-Frame"

- **Técnica**: La imagen `firelink.png` (4:3) se ha dividido en dos mitades (`firelink_left_fade.png` y `firelink_right_fade.png`) usando **ImageMagick**.
- **Efecto**: Cada mitad está anclada a los laterales (`left` y `right`) con un degradado horizontal de transparencia hacia el centro. Esto crea un "marco" natural para el contenido.
- **Escalado**: Se usa `background-size: auto 100vh` en el CSS para asegurar que el arte respete su proporción original sin zoom excesivo en pantallas panorámicas.
- **Oscuridad Ajustable**: Existe una variable CSS `--ds-bg-darkness` en `:root` para controlar la opacidad del fondo de forma global.

### 2. Persistencia Estática (Neocities Ready)

- **Contador de Almas**: Implementado un sistema **aleatorio** en `scripts/counter.js` que genera un número de almas entre 500k y 5M cada vez que se recarga la página.
- **Libro de Visitas**: Global y persistente. Utiliza el servicio **Atabook** integrado mediante un iframe para garantizar compatibilidad total con las políticas de seguridad de Neocities Free. Cualquiera puede leer y escribir.
- **Sin Backend**: Se ha eliminado `server.js` y el uso de archivos `.txt` en el servidor para garantizar compatibilidad total con hosting estático.

### 3. Layout y Estética Retro

- **Estructura**: Basada en un contenedor centrado con `flexbox` para evitar scroll innecesario.
- **Elementos Clásicos**: Marquesinas (`marquee`), bordes de "piedra" (`inset`), y efecto de parpadeo (`blink`).
- **Tipografía**: 'Jersey 10' para legibilidad retro y 'Silkscreen' para encabezados.
- **Hoguera (Bonfire)**: Imagen pixel art personalizada con efectos de aura en CSS.

## 📂 Estructura del Proyecto

- `/index.html`: Página principal.
- `/style.css`: Estilos globales y capas de fondo.
- `/scripts/`:
  - `counter.js`: Lógica del contador aleatorio.
  - `guestbook.js`: Lógica del libro de visitas (localStorage).
- `/pages/`:
  - `lore.html`, `equipo.html`, `libro.html`.
- `/resources/`:
  - `firelink.png`: Imagen original.
  - `firelink_left_fade.png` / `firelink_right_fade.png`: Fondos procesados.
  - `bonfire.png`: Pixel art de la hoguera.

## 📝 Comandos de Procesamiento (ImageMagick)

Si se desea regenerar el fondo, se usó:

```bash
# Ejemplo para la mitad izquierda con fade horizontal
convert resources/firelink.png -crop 120x169+0+0 resources/firelink_left.png
convert -size 120x169 xc: -sparse-color Barycentric '0,0 white 119,0 black' resources/mask_left.png
composite -compose CopyOpacity resources/mask_left.png resources/firelink_left.png resources/firelink_left_fade.png
```

## 🚀 Pendientes / Próximas Ideas

- Integrar un servicio externo (como Cbox o SmartGuestbook) si se desea un libro de visitas compartido globalmente en Neocities.
- Añadir pequeños "easter eggs" sonoros (pixel sound) al pasar el cursor por los botones.
