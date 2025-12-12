const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixMissingImages() {
    try {
        console.log('🔍 Actualizando imágenes de eventos...\n');

        // Actualizar cada evento por título
        const updates = [
            {
                title: 'Maratón de Barcelona 2025',
                imageUrl: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1200&h=600&fit=crop&q=80'
            },
            {
                title: 'Trail Collserola 10K',
                imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=600&fit=crop&q=80'
            },
            {
                title: 'San Silvestre Vallecana',
                imageUrl: 'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=1200&h=600&fit=crop&q=80'
            },
            {
                title: 'Ultra Pirineu XS',
                imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop&q=80'
            },
            {
                title: 'Carrera de la Mujer',
                imageUrl: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1200&h=600&fit=crop&q=80'
            }
        ];

        let updated = 0;

        for (const update of updates) {
            try {
                const result = await prisma.event.updateMany({
                    where: { title: update.title },
                    data: { imageUrl: update.imageUrl }
                });

                if (result.count > 0) {
                    console.log(`✅ ${update.title}: ${result.count} evento(s) actualizado(s)`);
                    updated += result.count;
                } else {
                    console.log(`⚠️  ${update.title}: No se encontró`);
                }
            } catch (err) {
                console.log(`❌ Error en ${update.title}:`, err.message);
            }
        }

        console.log(`\n🎉 Completado! ${updated} evento(s) actualizado(s)`);

    } catch (error) {
        console.error('❌ Error general:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

fixMissingImages();
