const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

// Endpoint temporal para ejecutar el seed
router.post('/run-seed', async (req, res) => {
    try {
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
                price: 0.00,
                imageUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635'
            },
            {
                title: '10K Nocturna',
                description: 'Carrera nocturna por el centro de la ciudad.',
                date: new Date('2025-06-20T21:00:00Z'),
                location: 'Madrid, España',
                distance: 10.0,
                price: 0.00,
                imageUrl: 'https://images.unsplash.com/photo-1552674605-469523170288'
            },
            {
                title: 'Trail de Montaña',
                description: 'Desafío de montaña con 1000m de desnivel.',
                date: new Date('2025-09-10T09:00:00Z'),
                location: 'Pirineos',
                distance: 25.0,
                price: 0.00,
                imageUrl: 'https://images.unsplash.com/photo-1506197061617-7f5c0b093236'
            },
            {
                title: 'Carrera Solidaria 5K',
                description: 'Carrera benéfica para recaudar fondos. ¡Participa gratis!',
                date: new Date('2025-04-22T10:00:00Z'),
                location: 'Valencia, España',
                distance: 5.0,
                price: 0.00,
                imageUrl: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571'
            },
            {
                title: 'Media Maratón de Sevilla',
                description: 'Recorre las calles históricas de Sevilla en esta media maratón.',
                date: new Date('2025-05-18T08:30:00Z'),
                location: 'Sevilla, España',
                distance: 21.097,
                price: 0.00,
                imageUrl: 'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38'
            },
            {
                title: 'Cross Country Bilbao',
                description: 'Carrera de cross por los parques de Bilbao.',
                date: new Date('2025-07-12T09:00:00Z'),
                location: 'Bilbao, España',
                distance: 8.0,
                price: 0.00,
                imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8'
            },
            {
                title: 'Carrera Popular de Zaragoza',
                description: 'Evento familiar abierto a todos los niveles.',
                date: new Date('2025-08-05T18:00:00Z'),
                location: 'Zaragoza, España',
                distance: 7.5,
                price: 0.00,
                imageUrl: 'https://images.unsplash.com/photo-1502904550040-7534597429ae'
            },
            {
                title: 'Ultra Trail Costa Brava',
                description: 'Ultra trail de 50km por la costa mediterránea.',
                date: new Date('2025-10-15T07:00:00Z'),
                location: 'Girona, España',
                distance: 50.0,
                price: 0.00,
                imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306'
            }
        ];

        for (const event of events) {
            await prisma.event.create({ data: event });
        }

        res.json({
            success: true,
            message: 'Seed ejecutado correctamente',
            data: {
                admin: admin.email,
                runner: runner.email,
                eventsCreated: events.length
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al ejecutar el seed',
            error: error.message
        });
    }
});

module.exports = router;
