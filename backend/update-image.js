const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateImage() {
    try {
        // Buscar el evento "10K Nocturna"
        const event = await prisma.event.findFirst({
            where: { title: '10K Nocturna' }
        });

        if (event) {
            // Actualizar con una nueva URL de imagen
            await prisma.event.update({
                where: { id: event.id },
                data: {
                    imageUrl: 'https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?w=800'
                }
            });
            console.log('✅ Imagen actualizada correctamente');
        } else {
            console.log('❌ Evento no encontrado');
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

updateImage();
