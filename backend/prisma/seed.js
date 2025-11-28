const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    // Create Admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@runtogether.com' },
        update: {},
        create: {
            email: 'admin@runtogether.com',
            name: 'Admin User',
            password: adminPassword,
            role: 'ADMIN',
        },
    });

    // Create Runner
    const runnerPassword = await bcrypt.hash('runner123', 10);
    const runner = await prisma.user.upsert({
        where: { email: 'runner@test.com' },
        update: {},
        create: {
            email: 'runner@test.com',
            name: 'Test Runner',
            password: runnerPassword,
            role: 'RUNNER',
        },
    });

    // Create Events
    const events = [
        {
            title: 'Maratón de Barcelona',
            description: 'Una de las maratones más bonitas de Europa.',
            date: new Date('2025-03-15T08:00:00Z'),
            location: 'Barcelona, España',
            distance: 42.195,
            price: 65.00,
            imageUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635'
        },
        {
            title: '10K Nocturna',
            description: 'Carrera nocturna por el centro de la ciudad.',
            date: new Date('2025-06-20T21:00:00Z'),
            location: 'Madrid, España',
            distance: 10.0,
            price: 15.00,
            imageUrl: 'https://images.unsplash.com/photo-1552674605-469523170288'
        },
        {
            title: 'Trail de Montaña',
            description: 'Desafío de montaña con 1000m de desnivel.',
            date: new Date('2025-09-10T09:00:00Z'),
            location: 'Pirineos',
            distance: 25.0,
            price: 30.00,
            imageUrl: 'https://images.unsplash.com/photo-1506197061617-7f5c0b093236'
        }
    ];

    for (const event of events) {
        await prisma.event.create({ data: event });
    }

    console.log({ admin, runner, eventsCreated: events.length });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
