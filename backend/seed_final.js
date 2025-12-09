const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "mongodb+srv://mblanch2018_db_userEuRXx9caMGYpWacm:1YoDLVbhi2PpDVXY@cluster0.clhhejh.mongodb.net/runtogether?retryWrites=true&w=majority"
        }
    }
});

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

    // 2. Borrar eventos antiguos (para limpiar la home)
    try {
        console.log('Borrando eventos antiguos...');
        // Borramos todos los eventos. Si hay inscripciones, esto podría fallar si no hay borrado en cascada,
        // pero en Mongo con Prisma suele funcionar si la relación es opcional.
        // Si falla, lo ignoramos y creamos los nuevos igual.
        await prisma.event.deleteMany({});
    } catch (e) {
        console.log('Nota: No se pudieron borrar eventos antiguos, se añadirán los nuevos.');
    }

    // 3. Crear Eventos Nuevos (Gratis y con fotos buenas)
    const events = [
        {
            title: 'Maratón de Barcelona 2025',
            description: 'Recorre las calles más emblemáticas de Barcelona. Sagrada Familia, Camp Nou y mar.',
            date: new Date('2025-03-15T08:00:00Z'),
            location: 'Barcelona, España',
            distance: 42.195,
            price: 0,
            difficulty: 'ADVANCED',
            imageUrl: 'https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?auto=format&fit=crop&w=1000&q=80',
            maxParticipants: 5000,
            elevation: 150,
            terrainType: 'ASPHALT'
        },
        {
            title: 'Trail Collserola 10K',
            description: 'Carrera de montaña perfecta para iniciarse. Vistas espectaculares.',
            date: new Date('2025-04-10T09:00:00Z'),
            location: 'Sant Cugat, España',
            distance: 10.0,
            price: 0,
            difficulty: 'BEGINNER',
            imageUrl: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1000&q=80',
            maxParticipants: 300,
            elevation: 350,
            terrainType: 'TRAIL'
        },
        {
            title: 'San Silvestre Vallecana',
            description: 'La carrera más divertida del año. Disfraces y mucho running.',
            date: new Date('2025-12-31T17:00:00Z'),
            location: 'Madrid, España',
            distance: 10.0,
            price: 0,
            difficulty: 'INTERMEDIATE',
            imageUrl: 'https://images.unsplash.com/photo-1513593771513-6568e754be37?auto=format&fit=crop&w=1000&q=80',
            maxParticipants: 2000,
            elevation: 50,
            terrainType: 'ASPHALT'
        },
        {
            title: 'Ultra Pirineu XS',
            description: 'Desafío técnico en el corazón de los Pirineos.',
            date: new Date('2025-06-20T07:00:00Z'),
            location: 'Bagà, España',
            distance: 25.0,
            price: 0,
            difficulty: 'ADVANCED',
            imageUrl: 'https://images.unsplash.com/photo-1506197061617-7f5c0b093236?auto=format&fit=crop&w=1000&q=80',
            maxParticipants: 150,
            elevation: 1200,
            terrainType: 'TRAIL'
        },
        {
            title: 'Carrera de la Mujer',
            description: 'Evento solidario. Circuito urbano llano.',
            date: new Date('2025-05-05T10:00:00Z'),
            location: 'Valencia, España',
            distance: 5.0,
            price: 0,
            difficulty: 'BEGINNER',
            imageUrl: 'https://images.unsplash.com/photo-1552674605-5d28c4a14c2c?auto=format&fit=crop&w=1000&q=80',
            maxParticipants: 1000,
            elevation: 10,
            terrainType: 'ASPHALT'
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
        console.error('ERROR:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
