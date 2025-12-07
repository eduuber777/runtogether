const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    // Limpiar base de datos
    try {
        await prisma.inscription.deleteMany();
        await prisma.comment.deleteMany();
        await prisma.post.deleteMany();
        await prisma.notification.deleteMany();
        await prisma.event.deleteMany();
        await prisma.user.deleteMany();
        console.log('Base de datos limpiada');
    } catch (error) {
        console.warn('Error limpiando DB (puede que esté vacía):', error.message);
    }

    // Crear Admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.create({
        data: {
            email: 'admin@runtogether.com',
            password: adminPassword,
            name: 'Administrador',
            role: 'ADMIN',
            photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
        }
    });

    // Crear Runner
    const runnerPassword = await bcrypt.hash('runner123', 10);
    const runner = await prisma.user.create({
        data: {
            email: 'runner@test.com',
            password: runnerPassword,
            name: 'Corredor Test',
            role: 'RUNNER',
            level: 'INTERMEDIATE',
            photoUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80'
        }
    });

    console.log('Usuarios creados');

    // Crear Eventos Reales
    const events = [
        {
            title: 'Maratón de Barcelona 2025',
            description: 'Recorre las calles más emblemáticas de Barcelona en este evento clásico. Pasaremos por la Sagrada Familia, Camp Nou y el frente marítimo. Avituallamiento cada 5km.',
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
            description: 'Carrera de montaña perfecta para iniciarse en el trail running. Senderos anchos y vistas espectaculares de la ciudad.',
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
            description: 'La carrera más divertida del año para despedir el 2025. Ambiente festivo, disfraces y mucho running.',
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
            description: 'Versión corta de la mítica ultra. Un desafío técnico con desniveles importantes en el corazón de los Pirineos.',
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
            description: 'Evento solidario para recaudar fondos. Circuito urbano llano y accesible para todos los niveles.',
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

    for (const event of events) {
        await prisma.event.create({ data: event });
    }

    console.log(`Se han creado ${events.length} eventos correctamente.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
