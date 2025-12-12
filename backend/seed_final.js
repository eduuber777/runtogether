const { PrismaClient, Difficulty, Terrain } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('--- INICIANDO ACTUALIZACIÓN DE PRODUCCIÓN ---');

    // 1. Actualizar usuarios existentes (para que tengan foto)
    try {
        console.log('Actualizando fotos de usuarios...');
        await prisma.user.updateMany({
            where: { email: 'admin@runtogether.com' },
            data: { photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80' }
        });
        await prisma.user.updateMany({
            where: { email: 'runner@test.com' },
            data: { photoUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80' }
        });
    } catch (e) {
        console.log('Nota: No se pudieron actualizar usuarios (quizás no existen), continuando...');
    }

    // 2. Borrar datos antiguos (Limpieza total)
    try {
        console.log('Borrando datos antiguos...');
        // Borrar inscripciones primero para evitar errores de integridad
        await prisma.inscription.deleteMany({});
        await prisma.comment.deleteMany({}); // También comentarios
        await prisma.event.deleteMany({});
        console.log('Datos antiguos eliminados correctamente.');
    } catch (e) {
        console.log('Nota: Error al limpiar datos antiguos (continuando...):', e.message);
    }

    // 3. Crear Eventos Nuevos (Gratis y con fotos personalizadas)
    const events = [
        {
            title: 'Maratón de Barcelona 2025',
            description: 'Recorre las calles más emblemáticas de Barcelona. Sagrada Familia, Camp Nou y mar.',
            date: new Date('2025-03-15T08:00:00Z'),
            location: 'Barcelona, España',
            distance: 42.195,
            price: 0,
            difficulty: Difficulty.ADVANCED,
            imageUrl: '/images/events/barcelona-marathon.png',
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
            imageUrl: '/images/events/trail-collserola.png',
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
            imageUrl: '/images/events/san-silvestre.png',
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
            imageUrl: '/images/events/ultra-pirineu.png',
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
            imageUrl: '/images/events/carrera-mujer.png',
            maxParticipants: 1000,
            elevation: 10,
            terrainType: Terrain.ASPHALT
        }
    ];

    console.log('Creando eventos nuevos...');
    for (const event of events) {
        await prisma.event.create({ data: event });
    }

    console.log('--- ACTUALIZACIÓN COMPLETADA CON ÉXITO ---');
}

main()
    .catch((e) => {
        console.error('ERROR:', JSON.stringify(e, null, 2));
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
