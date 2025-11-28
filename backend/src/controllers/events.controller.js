const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// List all events
const getEvents = async (req, res) => {
    try {
        const events = await prisma.event.findMany({
            orderBy: { date: 'asc' }
        });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
};

// Get single event
const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await prisma.event.findUnique({
            where: { id } // MongoDB ID is string, no parseInt needed
        });
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event', error: error.message });
    }
};

// Create event (Admin only)
const createEvent = async (req, res) => {
    try {
        const { title, description, date, location, distance, price, imageUrl } = req.body;
        const event = await prisma.event.create({
            data: {
                title,
                description,
                date: new Date(date),
                location,
                distance: parseFloat(distance),
                price: parseFloat(price),
                imageUrl
            }
        });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }
};

// Update event (Admin only)
const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, location, distance, price, imageUrl } = req.body;
        const event = await prisma.event.update({
            where: { id }, // MongoDB ID is string
            data: {
                title,
                description,
                date: date ? new Date(date) : undefined,
                location,
                distance: distance ? parseFloat(distance) : undefined,
                price: price ? parseFloat(price) : undefined,
                imageUrl
            }
        });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error: error.message });
    }
};

// Delete event (Admin only)
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.event.delete({ where: { id } }); // MongoDB ID is string
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
};

module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent };
