# 📸 GUÍA: Actualizar Imágenes de Eventos en Producción

## Paso 1: Subir Imágenes a Imgur

1. **Abre tu navegador** y ve a: https://imgur.com/upload

2. **Sube las 5 imágenes** desde esta carpeta:
   ```
   c:\Users\Tosh\gravity\frontend\public\images\events\
   ```
   
   Las imágenes son:
   - barcelona-marathon.png
   - trail-collserola.png
   - san-silvestre.png
   - ultra-pirineu.png
   - carrera-mujer.png

3. **Para cada imagen subida:**
   - Haz clic derecho en la imagen
   - Selecciona "Copiar enlace de imagen" o "Copy image address"
   - La URL debe verse así: `https://i.imgur.com/XXXXXXX.png`
   - Guarda cada URL en un bloc de notas

## Paso 2: Actualizar el Script

1. **Abre el archivo:**
   ```
   c:\Users\Tosh\gravity\backend\update_production_images.js
   ```

2. **Reemplaza las URLs** en las líneas 16-36:
   - Busca: `https://i.imgur.com/XXXXXXX.png`
   - Reemplaza con la URL real de Imgur para cada evento

3. **Guarda el archivo**

## Paso 3: Configurar Conexión a Producción

1. **Abre el archivo .env** en la carpeta backend:
   ```
   c:\Users\Tosh\gravity\backend\.env
   ```

2. **Asegúrate de que DATABASE_URL** apunte a tu base de datos de producción (MongoDB Atlas)
   
   Debería verse algo así:
   ```
   DATABASE_URL="mongodb+srv://usuario:password@cluster.mongodb.net/runtogether?retryWrites=true&w=majority"
   ```

## Paso 4: Ejecutar el Script

1. **Abre PowerShell** en la carpeta backend:
   ```powershell
   cd c:\Users\Tosh\gravity\backend
   ```

2. **Ejecuta el script:**
   ```powershell
   node update_production_images.js
   ```

3. **Verifica la salida:**
   - Deberías ver "✅ Actualizado" para cada evento
   - Si hay errores, revisa las URLs de Imgur

## Paso 5: Verificar en la Web

1. **Abre tu sitio:** https://runthoger2020.netlify.app

2. **Verifica que las imágenes se vean correctamente**

3. **¡Listo!** 🎉

---

## 🆘 Solución de Problemas

### Error de autenticación
- Verifica que DATABASE_URL en .env sea correcta
- Asegúrate de que la IP esté permitida en MongoDB Atlas

### Imágenes no se ven
- Verifica que las URLs de Imgur sean correctas
- Asegúrate de copiar la URL directa de la imagen (termina en .png)
- Prueba abrir la URL en el navegador para confirmar que funciona

### No se encuentran los eventos
- Verifica que los títulos en el script coincidan exactamente con los de la base de datos
- Revisa que los eventos existan en producción
