const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get comments for an event
const getEventComments = async (req, res) => {
    try {
        const { eventId } = req.params;

        const comments = await prisma.comment.findMany({
            where: { eventId },
            include: {
                user: {
                    select: { id: true, name: true, photoUrl: true, level: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error: error.message });
    }
};

// Create comment on event
const createEventComment = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { content } = req.body;
        const userId = req.user.id;

        const comment = await prisma.comment.create({
            data: {
                content,
                userId,
                eventId
            },
            include: {
                user: {
                    select: { id: true, name: true, photoUrl: true, level: true }
                }
            }
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error: error.message });
    }
};

// Delete comment
const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const comment = await prisma.comment.findUnique({ where: { id } });

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Only comment owner or admin can delete
        if (comment.userId !== userId && req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Not authorized to delete this comment' });
        }

        await prisma.comment.delete({ where: { id } });
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error: error.message });
    }
};

module.exports = { getEventComments, createEventComment, deleteComment };
