# 🎨 NFT en Realidad Aumentada con p5.js + p5.SimpleAR

Este proyecto es una pieza experimental de arte generativo en realidad aumentada desarrollada con **p5.js** y **p5.SimpleAR**. La obra utiliza un marcador visual (`6wFrame.png`) para activar una animación de arcos de colores que interactúan dinámicamente sobre un plano de realidad aumentada.

## 🚀 Cómo usar

1. Abre la página desde tu **dispositivo móvil** (puedes escanear el código QR generado).
2. Permite el **acceso a la cámara**.
3. Apunta al **marcador `6wFrame.png`** que se encuentra en la carpeta `/markers/`.
4. La pieza se desplegará en AR sobre el marcador.

## 📁 Estructura del proyecto

ar-piece/
├── index.html # Página principal con referencias a p5.js y p5.ar.js
├── style.css # Estilos básicos
├── sketch.js # Código p5.js con lógica generativa y animación AR
└── markers/
└── 6wFrame.png # Marcador AR requerido para activar la pieza

> 📌 Asegúrate de que el proyecto esté alojado en un servidor HTTPS para que la cámara funcione correctamente en navegadores móviles.

## 🧠 Tecnologías utilizadas

- [p5.js](https://p5js.org/) – Librería de dibujo creativo en JavaScript
- [p5.SimpleAR](https://github.com/tetunori/p5.simpleAR) – Librería ligera de AR basada en AR.js
- HTML5 + CSS3

## 🖼 Sobre la pieza

Esta obra fue concebida como un experimento de **NFT interactivo** que trasciende la imagen estática, permitiendo una experiencia de realidad aumentada accesible desde cualquier navegador móvil. Ideal para exposiciones, galerías o instalación física acompañada del marcador y el QR.

---

### ✨ Autor

**Daniel Oropeza**  
[GitHub](https://github.com/danieloropeza) · [X](https://x.com/tu_usuario) · [objkt](https://objkt.com/)

---

## 📄 Licencia y créditos

Este proyecto está licenciado bajo la licencia MIT.

### p5.SimpleAR
- Copyright (c) 2023 Tetsunori Nakayama
- Licencia: [MIT License](https://github.com/tetunori/p5.simpleAR/blob/main/LICENSE)
- Repositorio: [github.com/tetunori/p5.simpleAR](https://github.com/tetunori/p5.simpleAR)

Se agradece el trabajo de Tetsunori Nakayama por hacer posible esta integración de realidad aumentada con p5.js.




