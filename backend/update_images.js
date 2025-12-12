const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateImages() {
    console.log('--- ACTUALIZANDO IMÁGENES DE EVENTOS ---');

    const imageUpdates = [
        { title: 'Maratón de Barcelona 2025', imageUrl: '/images/events/barcelona-marathon.png' },
        { title: 'Trail Collserola 10K', imageUrl: '/images/events/trail-collserola.png' },
        { title: 'San Silvestre Vallecana', imageUrl: '/images/events/san-silvestre.png' },
        { title: 'Ultra Pirineu XS', imageUrl: '/images/events/ultra-pirineu.png' },
        { title: 'Carrera de la Mujer', imageUrl: '/images/events/carrera-mujer.png' }
    ];

    for (const update of imageUpdates) {
        try {
            const result = await prisma.event.updateMany({
                where: { title: update.title },
                data: { imageUrl: update.imageUrl }
            });
            console.log(`✓ Actualizado: ${update.title} (${result.count} eventos)`);
        } catch (error) {
            console.error(`✗ Error actualizando ${update.title}:`, error.message);
        }
    }

    console.log('--- ACTUALIZACIÓN COMPLETADA ---');
}

updateImages()
    .catch((e) => {
        console.error('ERROR:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
