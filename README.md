# RunTogether - Plataforma de Eventos de Running

Este repositorio contiene el código fuente para la plataforma **RunTogether**, una aplicación Full Stack para la gestión de eventos deportivos.

## 🚀 Enlaces de Despliegue (Cloud)

Para probar la aplicación sin instalar nada:

- **Frontend (Netlify):** [https://runthoger2020.netlify.app](https://runthoger2020.netlify.app)
- **Backend (Render):** [https://runtogether.onrender.com](https://runtogether.onrender.com)
- **Repositorio GitHub:** [https://github.com/eduuber777/runtogether](https://github.com/eduuber777/runtogether)

### 👤 Usuarios de Prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| **Administrador** | `admin@runtogether.com` | `admin123` |
| **Corredor** | `runner@test.com` | `runner123` |

---

## 📋 Manual de Instalación Local

Sigue estos pasos estrictos para ejecutar el proyecto en tu máquina local.

### Prerrequisitos
- Node.js (v18 o superior)
- npm

### 1. Configuración del Backend

1. **Navegar al directorio:**
   ```bash
   cd backend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar Variables de Entorno:**
   - Crea un archivo llamado `.env` en la carpeta `backend`.
   - Copia el contenido de `.env.example` o usa lo siguiente:
     ```env
     DATABASE_URL="file:./dev.db"
     JWT_SECRET="secreto_local_123"
     PORT=3000
     ```

4. **Inicializar Base de Datos:**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Cargar Datos de Prueba (Seed):**
   ```bash
   npm run seed
   ```
   *Esto creará los usuarios admin y runner mencionados arriba.*

6. **Iniciar Servidor:**
   ```bash
   npm run dev
   ```
   El servidor iniciará en `http://localhost:3000`.

### 2. Configuración del Frontend

1. **Abrir una NUEVA terminal** y navegar al directorio:
   ```bash
   cd frontend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar Variables de Entorno:**
   - Crea un archivo llamado `.env` en la carpeta `frontend`.
   - Copia el contenido de `.env.example` o usa lo siguiente:
     ```env
     VITE_API_URL="http://localhost:3000/api"
     ```

4. **Iniciar Cliente:**
   ```bash
   npm run dev
   ```
   
5. **Acceder:**
   Abre tu navegador en `http://localhost:5173`.

---

## 📝 Cambios en esta Entrega (PEC 4)

Respecto a la entrega anterior, se han implementado las siguientes mejoras y correcciones:

### Backend
- **Notificaciones:** Implementación de sistema de notificaciones para inscripciones, likes y comentarios.
- **Admin Events:** Endpoints completos (CRUD) para la gestión de eventos por parte del administrador.
- **Seguridad:** Refuerzo en middleware de autenticación y autorización.

### Frontend
- **Panel de Administración:** Nueva pestaña para gestión integral de eventos (Crear, Editar, Eliminar).
- **Centro de Notificaciones:** Nueva página y componente de navbar para visualizar notificaciones en tiempo real.
- **Mejoras UX:** Feedback visual con `react-toastify` y estados de carga.

### Despliegue
- Configuración completa para despliegue en Render (Backend) y Netlify (Frontend).
- Variables de entorno configuradas para producción.

---

## 🛠 Stack Tecnológico

- **Backend:** Node.js, Express, Prisma ORM, SQLite (Dev) / MongoDB (Prod).
- **Frontend:** React, Vite, TailwindCSS.
- **Auth:** JWT, Bcrypt.
