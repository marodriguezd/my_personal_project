# Proyecto: MIGUEL | NO MUERTO (Retro Dark Souls x Neocities)

Este documento resume el estado actual del proyecto, las decisiones técnicas clave y la estructura tras la integración del sistema de persistencia global.

## 🎯 Objetivo General

Rediseño de un portfolio personal con una estética **retro de los 2000 (estilo GeoCities)** fusionada con la atmósfera oscura de **Dark Souls**. El sitio es 100% compatible con el hosting estático de **Neocities.org**.

## 🛠️ Características Técnicas Implementadas

### 1. Sistema de Fondo "Split-Frame"

- **Técnica**: Imagen `firelink.png` dividida en dos mitades con degradado horizontal de transparencia hacia el centro.
- **Escalado**: `background-size: auto 100vh` para respetar proporciones en cualquier resolución.
- **Oscuridad**: Variable CSS `--ds-bg-darkness` para control global de la atmósfera.

### 2. Persistencia y Servicios Externos

- **Bitácora del No Muerto (Blog)**: Sistema de micro-blogging estático integrado.
  - **Estructura**: Índice central (`blog.html`) y entradas individuales (`run_XX.html`).
  - **Interconexión**: Navegación circular completa habilitada en todas las secciones.
  - **Narrativa**: Formato de "Runs" y "Hogueras" para documentar el progreso técnico y personal.

### 3. Narrativa y Estética Souls

- **Crónicas del No Muerto (Lore)**: Contenido redactado con tono épico y melancólico, centrado en la perseverancia ante el código.
- **Inventario (Equipo)**: Referencias temáticas a herramientas de desarrollo (VS Code, GitHub) y el "Anillo de la Voluntad del No Muerto" como símbolo de persistencia.
- **UI Clean-up**: Eliminación de elementos corruptos e imágenes rotas para un acabado pulido y profesional.

## 📂 Estructura del Proyecto

- `/index.html`: Página de inicio (Humanidad Restaurada).
- `/style.css`: Estilos globales, tipografías 'Jersey 10' y 'Silkscreen'.
- `/scripts/`:
  - `counter.js`: Lógica del contador de almas.
- `/pages/`:
  - `lore.html`: Crónicas del No Muerto.
  - `equipo.html`: Inventario y herramientas.
  - `blog.html`: Índice de la Bitácora.
  - `run_01.html`: Primera entrada de la Bitácora.
  - `libro.html`: Libro de visitas global (Atabook).
- `/resources/`: Arte y assets procesados.

## 📝 Notas de Mantenimiento

- Para cambiar la apariencia del libro de visitas, se debe acceder al panel de control de **Atabook.org**. Los cambios se reflejarán automáticamente en el sitio.
- Se recomienda el uso de `Control + F5` tras subir cambios a Neocities para evitar problemas con la caché del navegador.
