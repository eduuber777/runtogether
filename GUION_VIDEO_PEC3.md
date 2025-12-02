# Guion para Vídeo de Demostración - RunTogether
**Duración total: 5 minutos**

---

## 🎬 **Minuto 0:00 - 0:30 | Introducción**

**Texto a decir:**
> "Hola, soy Eduard Berlanga y os presento RunTogether, una plataforma web para organizar y participar en eventos de running. Esta aplicación está desplegada en la nube usando React, Node.js y MongoDB."

**Acciones en pantalla:**
- Mostrar la URL: `https://fancy-manatee-752b81.netlify.app`
- Mostrar la página principal con los 3 eventos

---

## 🎬 **Minuto 0:30 - 1:30 | Registro de Usuario**

**Texto a decir:**
> "Primero voy a registrar un nuevo usuario. El sistema valida el email y encripta la contraseña usando bcrypt."

**Acciones en pantalla:**
1. Hacer clic en **"Registrarse"**
2. Rellenar el formulario:
   - Nombre: `Usuario Demo`
   - Email: `demo@test.com`
   - Contraseña: `demo123`
3. Hacer clic en **"Registrarse"**
4. Mostrar que redirige automáticamente al login

**Punto clave a mencionar:**
> "La contraseña se guarda encriptada en MongoDB Atlas, nuestra base de datos en la nube."

---

## 🎬 **Minuto 1:30 - 2:15 | Login y Autenticación**

**Texto a decir:**
> "Ahora inicio sesión con las credenciales que acabo de crear. El sistema genera un token JWT que se guarda en el navegador."

**Acciones en pantalla:**
1. Rellenar el formulario de login:
   - Email: `demo@test.com`
   - Contraseña: `demo123`
2. Hacer clic en **"Iniciar Sesión"**
3. Mostrar que aparece el nombre del usuario en la esquina superior derecha

**Punto clave a mencionar:**
> "El token JWT permite que el usuario permanezca autenticado durante 7 días sin tener que volver a iniciar sesión."

---

## 🎬 **Minuto 2:15 - 3:30 | Navegación y Visualización de Eventos**

**Texto a decir:**
> "En la página principal vemos los próximos eventos disponibles. Cada evento muestra información clave como fecha, ubicación, distancia y precio."

**Acciones en pantalla:**
1. Hacer scroll por los 3 eventos
2. Hacer clic en **"Ver detalles"** del evento "Maratón de Barcelona"
3. Mostrar la página de detalle con:
   - Descripción completa
   - Fecha y hora
   - Ubicación
   - Precio
   - Botón de inscripción

**Punto clave a mencionar:**
> "Los eventos se almacenan en MongoDB y se recuperan mediante nuestra API REST en Node.js desplegada en Render."

---

## 🎬 **Minuto 3:30 - 4:15 | Inscripción a un Evento**

**Texto a decir:**
> "Voy a inscribirme en este evento. El sistema valida que el usuario esté autenticado y que no esté ya inscrito."

**Acciones en pantalla:**
1. Hacer clic en **"Inscribirme"**
2. Mostrar el mensaje de confirmación (toast)
3. Ir al **Dashboard** (menú "Mis Inscripciones")
4. Mostrar que el evento aparece en la lista de inscripciones del usuario

**Punto clave a mencionar:**
> "El dashboard muestra todas las inscripciones del usuario, permitiendo una gestión centralizada de su participación en eventos."

---

## 🎬 **Minuto 4:15 - 4:50 | Arquitectura y Tecnologías**

**Texto a decir:**
> "La aplicación sigue una arquitectura moderna de 3 capas: Frontend en Netlify con React y Tailwind CSS, Backend en Render con Node.js y Express, y Base de Datos en MongoDB Atlas."

**Acciones en pantalla:**
1. Abrir las **DevTools** (F12)
2. Ir a la pestaña **"Network"**
3. Hacer una acción (ej: recargar eventos)
4. Mostrar las peticiones a `https://runtogether.onrender.com/api/events`

**Punto clave a mencionar:**
> "Todas las comunicaciones entre frontend y backend están protegidas con JWT y CORS configurado correctamente."

---

## 🎬 **Minuto 4:50 - 5:00 | Cierre**

**Texto a decir:**
> "En resumen, RunTogether es una plataforma completa y funcional que cumple con todos los requisitos del proyecto: autenticación segura, gestión de eventos, diseño responsive y despliegue en producción. Gracias por vuestra atención."

**Acciones en pantalla:**
- Hacer clic en **"Salir"** para cerrar sesión
- Mostrar de nuevo la página principal

---

## 📌 **Consejos para la grabación:**

1. **Usa OBS Studio o Loom** para grabar pantalla + voz
2. **Habla con claridad** y a ritmo moderado
3. **Ensaya antes** para ajustar los tiempos
4. **Muestra la URL** en la barra de direcciones para demostrar que está en producción
5. **Si algo falla**, edita el vídeo o graba de nuevo ese fragmento
6. **Exporta en 1080p** para mejor calidad

---

## 🎯 **Puntos clave que DEBES mencionar:**

- ✅ Tecnologías: React, Node.js, MongoDB
- ✅ Despliegue en la nube (Netlify + Render + Atlas)
- ✅ Seguridad: JWT + bcrypt
- ✅ Arquitectura: Frontend → Backend → Base de Datos
- ✅ Funcionalidades: Registro, Login, Eventos, Inscripciones
