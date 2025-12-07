const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get user notifications
const getUserNotifications = async (req, res) => {
    try {
        const userId = req.user.id;

        const notifications = await prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 50
        });

        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error: error.message });
    }
};

// Mark notification as read
const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const notification = await prisma.notification.findUnique({ where: { id } });

        if (!notification || notification.userId !== userId) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        const updated = await prisma.notification.update({
            where: { id },
            data: { read: true }
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Error updating notification', error: error.message });
    }
};

// Mark all as read
const markAllAsRead = async (req, res) => {
    try {
        const userId = req.user.id;

        await prisma.notification.updateMany({
            where: { userId, read: false },
            data: { read: true }
        });

        res.json({ message: 'All notifications marked as read' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating notifications', error: error.message });
    }
};

// Get unread count
const getUnreadCount = async (req, res) => {
    try {
        const userId = req.user.id;

        const count = await prisma.notification.count({
            where: { userId, read: false }
        });

        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching count', error: error.message });
    }
};

// Create notification (internal use)
const createNotification = async (userId, type, message) => {
    try {
        return await prisma.notification.create({
            data: { userId, type, message }
        });
    } catch (error) {
        console.error('Error creating notification:', error);
        return null;
    }
};

module.exports = {
    getUserNotifications,
    markAsRead,
    markAllAsRead,
    getUnreadCount,
    createNotification
};
