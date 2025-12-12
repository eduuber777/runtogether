// INSTRUCCIONES:
// 1. Asegúrate de que tu archivo .env tenga DATABASE_URL apuntando a MongoDB Atlas (producción)
// 2. Ejecuta: node seed_production.js
// 3. Este script creará los 5 eventos si no existen

const { PrismaClient, Difficulty, Terrain } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('🚀 Iniciando seed de producción...\n');

    // Verificar eventos existentes
    const existingEvents = await prisma.event.findMany();
    console.log(`📊 Eventos actuales en la base de datos: ${existingEvents.length}`);

    if (existingEvents.length >= 5) {
        console.log('\n✅ Ya hay eventos en la base de datos.');
        console.log('Si quieres recrearlos, borra los eventos primero desde el panel de admin.\n');

        // Mostrar eventos existentes
        existingEvents.forEach((event, index) => {
            console.log(`${index + 1}. ${event.title} - ${event.location}`);
        });

        return;
    }

    console.log('\n📝 Creando eventos...\n');

    const events = [
        {
            title: 'Maratón de Barcelona 2025',
            description: 'Recorre las calles más emblemáticas de Barcelona. Sagrada Familia, Camp Nou y mar.',
            date: new Date('2025-03-15T08:00:00Z'),
            location: 'Barcelona, España',
            distance: 42.195,
            price: 0,
            difficulty: Difficulty.ADVANCED,
            imageUrl: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1200&h=600&fit=crop&q=80',
            maxParticipants: 5000,
            elevation: 150,
            terrainType: Terrain.ASPHALT
        },
        {
            title: 'Trail Collserola 10K',
            description: 'Carrera de montaña perfecta para iniciarse. Vistas espectaculares.',
            date: new Date('2025-04-10T09:00:00Z'),
            location: 'Sant Cugat, España',
            distance: 10.0,
            price: 0,
            difficulty: Difficulty.BEGINNER,
            imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=600&fit=crop&q=80',
            maxParticipants: 300,
            elevation: 350,
            terrainType: Terrain.TRAIL
        },
        {
            title: 'San Silvestre Vallecana',
            description: 'La carrera más divertida del año. Disfraces y mucho running.',
            date: new Date('2025-12-31T17:00:00Z'),
            location: 'Madrid, España',
            distance: 10.0,
            price: 0,
            difficulty: Difficulty.INTERMEDIATE,
            imageUrl: 'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=1200&h=600&fit=crop&q=80',
            maxParticipants: 2000,
            elevation: 50,
            terrainType: Terrain.ASPHALT
        },
        {
            title: 'Ultra Pirineu XS',
            description: 'Desafío técnico en el corazón de los Pirineos.',
            date: new Date('2025-06-20T07:00:00Z'),
            location: 'Bagà, España',
            distance: 25.0,
            price: 0,
            difficulty: Difficulty.ADVANCED,
            imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop&q=80',
            maxParticipants: 150,
            elevation: 1200,
            terrainType: Terrain.TRAIL
        },
        {
            title: 'Carrera de la Mujer',
            description: 'Evento solidario. Circuito urbano llano.',
            date: new Date('2025-05-05T10:00:00Z'),
            location: 'Valencia, España',
            distance: 5.0,
            price: 0,
            difficulty: Difficulty.BEGINNER,
            imageUrl: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1200&h=600&fit=crop&q=80',
            maxParticipants: 1000,
            elevation: 10,
            terrainType: Terrain.ASPHALT
        }
    ];

    for (const eventData of events) {
        try {
            const event = await prisma.event.create({ data: eventData });
            console.log(`✅ ${event.title}`);
        } catch (error) {
            console.error(`❌ Error creando ${eventData.title}:`, error.message);
        }
    }

    const finalCount = await prisma.event.count();
    console.log(`\n✅ Seed completado. Total de eventos: ${finalCount}`);
}

main()
    .catch((e) => {
        console.error('\n❌ ERROR:', e.message);
        console.error('\n💡 Asegúrate de que:');
        console.error('   1. DATABASE_URL en .env apunta a MongoDB Atlas (producción)');
        console.error('   2. Tienes conexión a internet');
        console.error('   3. Tu IP está permitida en MongoDB Atlas');
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
