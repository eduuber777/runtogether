# RunTogether - Plataforma de Eventos de Running

Este proyecto contiene el código fuente completo para la plataforma RunTogether, dividido en Backend (API REST) y Frontend (React SPA).

## Estructura del Proyecto

- `/backend`: API desarrollada con Node.js, Express y Prisma (SQLite).
- `/frontend`: Aplicación web desarrollada con React, Vite y TailwindCSS.

## Instrucciones de Instalación

Sigue estos pasos para poner en marcha el proyecto en tu máquina local.

### 1. Configuración del Backend

El backend utiliza SQLite, por lo que no necesitas instalar ninguna base de datos externa.

1. Abre una terminal y navega a la carpeta `backend`:
   ```bash
   cd backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicializa la base de datos (esto creará el archivo `dev.db`):
   ```bash
   npx prisma migrate dev --name init
   ```

4. (Opcional) Carga datos de prueba (usuarios y eventos):
   ```bash
   npm run seed
   ```

5. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   El servidor estará corriendo en `http://localhost:3000`.

### 2. Configuración del Frontend

1. Abre **otra** terminal y navega a la carpeta `frontend`:
   ```bash
   cd frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   
4. Abre tu navegador en `http://localhost:5173`.

## Credenciales de Prueba (Seed)

Si ejecutaste el script de seed, puedes usar estos usuarios:

- **Admin:** `admin@runtogether.com` / `admin123`
- **Runner:** `runner@test.com` / `runner123`

## Tecnologías Utilizadas

- **Backend:** Node.js, Express, Prisma, SQLite, JWT, Bcrypt.
- **Frontend:** React, Vite, TailwindCSS, Axios, React Router, React Toastify.
