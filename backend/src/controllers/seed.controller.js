const { PrismaClient, Difficulty, Terrain } = require('@prisma/client');
const prisma = new PrismaClient();

// Endpoint para poblar la base de datos (solo admin)
const seedDatabase = async (req, res) => {
    try {
        // Verificar eventos existentes
        const existingEvents = await prisma.event.count();

        if (existingEvents >= 5) {
            return res.json({
                success: true,
                message: `Ya hay ${existingEvents} eventos en la base de datos`,
                eventsCreated: 0
            });
        }

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

        let created = 0;
        for (const eventData of events) {
            await prisma.event.create({ data: eventData });
            created++;
        }

        res.json({
            success: true,
            message: `Se crearon ${created} eventos exitosamente`,
            eventsCreated: created
        });

    } catch (error) {
        console.error('Error en seed:', error);
        res.status(500).json({
            success: false,
            message: 'Error al poblar la base de datos',
            error: error.message
        });
    }
};

// Endpoint para arreglar imágenes de eventos (solo admin)
const fixEventImages = async (req, res) => {
    try {
        const imageMap = {
            'Maratón de Barcelona 2025': 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1200&h=600&fit=crop&q=80',
            'Trail Collserola 10K': 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=600&fit=crop&q=80',
            'San Silvestre Vallecana': 'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=1200&h=600&fit=crop&q=80',
            'Ultra Pirineu XS': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop&q=80',
            'Carrera de la Mujer': 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1200&h=600&fit=crop&q=80'
        };

        let updated = 0;
        const results = [];

        for (const [title, imageUrl] of Object.entries(imageMap)) {
            const result = await prisma.event.updateMany({
                where: { title },
                data: { imageUrl }
            });

            if (result.count > 0) {
                updated += result.count;
                results.push({ title, updated: result.count });
            }
        }

        res.json({
            success: true,
            message: `Se actualizaron ${updated} evento(s)`,
            eventsUpdated: updated,
            details: results
        });

    } catch (error) {
        console.error('Error al actualizar imágenes:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar las imágenes',
            error: error.message
        });
    }
};

module.exports = { seedDatabase, fixEventImages };
