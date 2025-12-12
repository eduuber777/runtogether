const { PrismaClient } = require('@prisma/client');

// Este script actualiza las imágenes en la base de datos de PRODUCCIÓN
// Asegúrate de tener la variable DATABASE_URL configurada para producción

const prisma = new PrismaClient();

async function updateProductionImages() {
    console.log('🔄 ACTUALIZANDO IMÁGENES EN PRODUCCIÓN...\n');

    // INSTRUCCIONES:
    // 1. Sube las 5 imágenes desde: c:\Users\Tosh\gravity\frontend\public\images\events\
    // 2. Ve a https://imgur.com/upload
    // 3. Sube cada imagen y copia la URL directa (termina en .png)
    // 4. Reemplaza las URLs de abajo con las URLs de Imgur

    const imageUpdates = [
        {
            title: 'Maratón de Barcelona 2025',
            imageUrl: 'https://i.imgur.com/XXXXXXX.png'  // ← REEMPLAZA con tu URL de Imgur
        },
        {
            title: 'Trail Collserola 10K',
            imageUrl: 'https://i.imgur.com/YYYYYYY.png'  // ← REEMPLAZA con tu URL de Imgur
        },
        {
            title: 'San Silvestre Vallecana',
            imageUrl: 'https://i.imgur.com/ZZZZZZZ.png'  // ← REEMPLAZA con tu URL de Imgur
        },
        {
            title: 'Ultra Pirineu XS',
            imageUrl: 'https://i.imgur.com/AAAAAAA.png'  // ← REEMPLAZA con tu URL de Imgur
        },
        {
            title: 'Carrera de la Mujer',
            imageUrl: 'https://i.imgur.com/BBBBBBB.png'  // ← REEMPLAZA con tu URL de Imgur
        }
    ];

    console.log('📝 Eventos a actualizar:');
    imageUpdates.forEach((update, index) => {
        console.log(`   ${index + 1}. ${update.title}`);
    });
    console.log('');

    let successCount = 0;
    let errorCount = 0;

    for (const update of imageUpdates) {
        try {
            const result = await prisma.event.updateMany({
                where: { title: update.title },
                data: { imageUrl: update.imageUrl }
            });

            if (result.count > 0) {
                console.log(`✅ ${update.title} - Actualizado (${result.count} evento(s))`);
                successCount++;
            } else {
                console.log(`⚠️  ${update.title} - No se encontró en la base de datos`);
                errorCount++;
            }
        } catch (error) {
            console.error(`❌ ${update.title} - Error:`, error.message);
            errorCount++;
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`✅ Actualizados: ${successCount}`);
    console.log(`❌ Errores: ${errorCount}`);
    console.log('='.repeat(60));
}

updateProductionImages()
    .catch((e) => {
        console.error('\n❌ ERROR GENERAL:', e.message);
        console.error('\n💡 Verifica que:');
        console.error('   1. La variable DATABASE_URL esté configurada correctamente');
        console.error('   2. Tengas conexión a internet');
        console.error('   3. Las credenciales de la base de datos sean correctas');
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
