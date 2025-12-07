const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                level: true,
                createdAt: true,
                _count: {
                    select: { inscriptions: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

// Update user role (Admin only)
const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        const user = await prisma.user.update({
            where: { id },
            data: { role },
            select: { id: true, email: true, name: true, role: true }
        });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user role', error: error.message });
    }
};

// Delete user (Admin only)
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete user's inscriptions first
        await prisma.inscription.deleteMany({ where: { userId: id } });

        // Delete user
        await prisma.user.delete({ where: { id } });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

// Get platform statistics (Admin only)
const getPlatformStats = async (req, res) => {
    try {
        const [totalUsers, totalEvents, totalInscriptions, activeEvents] = await Promise.all([
            prisma.user.count(),
            prisma.event.count(),
            prisma.inscription.count({ where: { status: 'CONFIRMED' } }),
            prisma.event.count({ where: { date: { gte: new Date() } } })
        ]);

        const recentUsers = await prisma.user.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: { id: true, name: true, email: true, createdAt: true }
        });

        res.json({
            totalUsers,
            totalEvents,
            totalInscriptions,
            activeEvents,
            recentUsers
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching statistics', error: error.message });
    }
};

module.exports = { getAllUsers, updateUserRole, deleteUser, getPlatformStats };
