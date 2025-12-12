# 🚀 GUÍA RÁPIDA: Poblar Base de Datos de Producción

## Problema
- No se ven eventos en la página principal
- El muro social está vacío
- La base de datos de producción no tiene datos

## Solución Simple (3 pasos)

### Paso 1: Verificar conexión a producción

Abre el archivo `.env` en la carpeta `backend` y asegúrate de que `DATABASE_URL` apunta a MongoDB Atlas (producción).

Debería verse algo así:
```
DATABASE_URL="mongodb+srv://usuario:contraseña@cluster.mongodb.net/runtogether?retryWrites=true&w=majority"
```

### Paso 2: Ejecutar el script

Abre PowerShell en la carpeta backend y ejecuta:

```powershell
cd c:\Users\Tosh\gravity\backend
node seed_production.js
```

### Paso 3: Verificar

1. Abre tu sitio: https://runthoger2020.netlify.app
2. Deberías ver 5 eventos en la página principal
3. El muro social debería funcionar (aunque estará vacío hasta que alguien publique)

---

## ✅ Qué hace este script

- ✅ Verifica si ya hay eventos en la base de datos
- ✅ Si no hay eventos, crea 5 eventos de ejemplo
- ✅ No borra datos existentes
- ✅ Muestra mensajes claros de lo que está haciendo

## 🆘 Si hay errores

### Error de autenticación
- Verifica que DATABASE_URL sea correcta
- Asegúrate de que tu IP esté permitida en MongoDB Atlas:
  1. Ve a MongoDB Atlas
  2. Network Access
  3. Añade tu IP actual o usa 0.0.0.0/0 (permite todas las IPs)

### No se conecta
- Verifica tu conexión a internet
- Comprueba que las credenciales de MongoDB sean correctas

---

## 📊 Eventos que se crearán

1. **Maratón de Barcelona 2025** - 42.195 km (Avanzado)
2. **Trail Collserola 10K** - 10 km (Principiante)
3. **San Silvestre Vallecana** - 10 km (Intermedio)
4. **Ultra Pirineu XS** - 25 km (Avanzado)
5. **Carrera de la Mujer** - 5 km (Principiante)

Todos los eventos son **GRATIS** (precio: 0€)
