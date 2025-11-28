# Guía para obtener tu Base de Datos MongoDB (Gratis)

Sigue estos pasos para conseguir la "URL de conexión" que necesita tu proyecto. Usaremos **MongoDB Atlas**, que es gratuito y está en la nube.

## Paso 1: Crear Cuenta y Cluster
1. Ve a [mongodb.com/atlas](https://www.mongodb.com/atlas/database) y regístrate (puedes usar tu cuenta de Google).
2. Te pedirá crear un "Deployment". Elige la opción **FREE** (M0).
3. Dale a "Create" (deja las opciones por defecto, proveedor AWS y región la que salga).

## Paso 2: Crear Usuario de Base de Datos
1. Una vez creado el cluster, te pedirá configurar la seguridad.
2. En **Database Access** (o "Security Quickstart"):
   - Crea un usuario.
   - **Username:** `admin` (o lo que quieras).
   - **Password:** Escribe una contraseña segura y **APÚNTALA** (la necesitarás luego).
   - Dale al botón "Create User".

## Paso 3: Permitir Conexiones (Network Access)
1. En el menú de la izquierda, ve a **Network Access**.
2. Dale a "Add IP Address".
3. Elige la opción **"Allow Access from Anywhere"** (Permitir acceso desde cualquier lugar). Pondrá `0.0.0.0/0`.
4. Dale a "Confirm". *Esto es importante para que puedas conectarte desde tu casa.*

## Paso 4: Obtener la URL (Connection String)
1. Ve al menú **Database** (izquierda) y verás tu Cluster. Dale al botón **Connect**.
2. Elige la opción **Drivers**.
3. Asegúrate que pone **Node.js**.
4. Verás una cadena de texto parecida a esta:
   ```
   mongodb+srv://admin:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
   ```
5. **COPIA esa cadena.**

## Paso 5: Ponerla en tu Proyecto
1. Vuelve a tu editor de código.
2. Abre el archivo `backend/.env`.
3. Pega la cadena que copiaste donde dice `DATABASE_URL="..."`.
4. **IMPORTANTE:** Cambia donde dice `<password>` por la contraseña real que creaste en el Paso 2. (Quita los símbolos `<` y `>`).

   *Ejemplo final:*
   `DATABASE_URL="mongodb+srv://admin:miContrasenaSecreta123@cluster0.abcde.mongodb.net/runtogether?retryWrites=true&w=majority"`

5. Guarda el archivo `.env`.

---
**¡Listo!** Una vez hecho esto, avísame y yo terminaré la configuración.
