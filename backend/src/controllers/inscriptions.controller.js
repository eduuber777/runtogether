const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get participants for an event
const getEventParticipants = async (req, res) => {
    try {
        const { eventId } = req.params;
        const inscriptions = await prisma.inscription.findMany({
            where: { eventId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        photoUrl: true,
                        level: true
                    }
                }
            }
        });
        res.json(inscriptions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching participants', error: error.message });
    }
};

// Inscribe user to event
const createInscription = async (req, res) => {
    try {
        const userId = req.user.id;
        const { eventId } = req.body;

        // Check if already inscribed
        const existing = await prisma.inscription.findUnique({
            where: {
                userId_eventId: {
                    userId,
                    eventId // MongoDB ID is string
                }
            }
        });

        if (existing) {
            return res.status(400).json({ message: 'User already inscribed in this event' });
        }

        const inscription = await prisma.inscription.create({
            data: {
                userId,
                eventId
            }
        });

        // Get event details for notification
        const event = await prisma.event.findUnique({
            where: { id: eventId },
            select: { title: true }
        });

        // Create notification
        await prisma.notification.create({
            data: {
                userId,
                type: 'EVENT',
                message: `Te has inscrito correctamente al evento: ${event.title}`
            }
        });

        res.status(201).json({ message: 'Inscription successful', inscription });
    } catch (error) {
        res.status(500).json({ message: 'Error creating inscription', error: error.message });
    }
};

// Get my inscriptions
const getMyInscriptions = async (req, res) => {
    try {
        const userId = req.user.id;
        const inscriptions = await prisma.inscription.findMany({
            where: { userId },
            include: { event: true }
        });
        res.json(inscriptions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inscriptions', error: error.message });
    }
};

module.exports = { createInscription, getMyInscriptions, getEventParticipants };
