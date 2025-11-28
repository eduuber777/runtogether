# Guía de Despliegue: RunTogether

Para que tu aplicación funcione en internet, necesitas desplegar dos partes:
1.  **Backend:** El servidor (Node.js) -> Recomendamos **Render** (Gratis).
2.  **Frontend:** La web (React) -> Recomendamos **Netlify** (Gratis).

---

## Parte 1: Desplegar el Backend (Render)

Como tu frontend en Netlify no puede conectarse a tu ordenador (`localhost`), primero debemos subir el backend.

1.  Sube tu código a **GitHub** (si no lo has hecho ya).
2.  Ve a [render.com](https://render.com) y crea una cuenta.
3.  Haz clic en **"New +"** y selecciona **"Web Service"**.
4.  Conecta tu repositorio de GitHub.
5.  Configura lo siguiente:
    *   **Root Directory:** `backend` (¡Importante!)
    *   **Build Command:** `npm install`
    *   **Start Command:** `npm start`
6.  Abajo, en **Environment Variables**, añade:
    *   `DATABASE_URL`: (Pega la misma URL de MongoDB Atlas que pusiste en tu .env local).
    *   `JWT_SECRET`: (Inventa una contraseña secreta).
    *   `NODE_ENV`: `production`
7.  Dale a **"Create Web Service"**.
8.  Espera a que termine. Render te dará una URL (ej: `https://runtogether-api.onrender.com`). **Cópiala.**

---

## Parte 2: Desplegar el Frontend (Netlify)

1.  Ve a [netlify.com](https://www.netlify.com) y crea una cuenta.
2.  Haz clic en **"Add new site"** -> **"Import from Git"**.
3.  Selecciona tu repositorio de GitHub.
4.  Configura lo siguiente:
    *   **Base directory:** `frontend`
    *   **Build command:** `npm run build`
    *   **Publish directory:** `frontend/dist`
5.  **¡OJO! Variables de Entorno:**
    *   Antes de darle a Deploy, busca el botón **"Advanced"** o ve luego a "Site settings" > "Environment variables".
    *   Añade una variable llamada: `VITE_API_URL`
    *   Valor: La URL de tu backend en Render (ej: `https://runtogether-api.onrender.com`).
6.  Dale a **"Deploy Site"**.

---

## Parte 3: Ajuste Final en el Código

Para que el frontend sepa a qué backend conectarse en producción, asegúrate de que tu archivo `frontend/src/services/api.js` use la variable de entorno.

Si tu código actual usa `/api` (proxy), funcionará en local, pero para producción necesitamos que use la URL completa si existe.

**Verifica `frontend/src/services/api.js`:**
```javascript
const baseURL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: baseURL,
  // ...
});
```
