const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                level: true,
                photoUrl: true,
                createdAt: true,
                inscriptions: {
                    include: {
                        event: true
                    }
                }
            }
        });

        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, level, photoUrl, preferences } = req.body;

        const user = await prisma.user.update({
            where: { id },
            data: {
                name,
                level,
                photoUrl,
                preferences
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                level: true,
                photoUrl: true,
                preferences: true
            }
        });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }
};

// Get user statistics
const getUserStats = async (req, res) => {
    try {
        const { id } = req.params;

        const totalInscriptions = await prisma.inscription.count({
            where: { userId: id, status: 'CONFIRMED' }
        });

        const inscriptions = await prisma.inscription.findMany({
            where: { userId: id, status: 'CONFIRMED' },
            include: {
                event: true
            }
        });

        const totalDistance = inscriptions.reduce((sum, insc) => sum + insc.event.distance, 0);

        res.json({
            totalEvents: totalInscriptions,
            totalDistance: totalDistance,
            upcomingEvents: inscriptions.filter(i => new Date(i.event.date) > new Date()).length
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user stats', error: error.message });
    }
};

module.exports = { getUserProfile, updateUserProfile, getUserStats };
