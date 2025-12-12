const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Script simple: SOLO actualiza las URLs de las imágenes
async function main() {
    console.log('📸 Actualizando imágenes...\n');

    const updates = [
        ['Maratón de Barcelona 2025', 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1200&h=600&fit=crop&q=80'],
        ['Trail Collserola 10K', 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=600&fit=crop&q=80'],
        ['San Silvestre Vallecana', 'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=1200&h=600&fit=crop&q=80'],
        ['Ultra Pirineu XS', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop&q=80'],
        ['Carrera de la Mujer', 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1200&h=600&fit=crop&q=80']
    ];

    for (const [title, imageUrl] of updates) {
        const result = await prisma.event.updateMany({
            where: { title },
            data: { imageUrl }
        });
        console.log(`${result.count > 0 ? '✅' : '❌'} ${title}`);
    }

    console.log('\n✅ Listo!');
}

main()
    .catch(e => console.error('Error:', e.message))
    .finally(() => prisma.$disconnect());
