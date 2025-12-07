const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all posts (social wall)
const getAllPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                user: {
                    select: { id: true, name: true, photoUrl: true, level: true }
                },
                comments: {
                    include: {
                        user: {
                            select: { id: true, name: true, photoUrl: true }
                        }
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 3 // Only show first 3 comments
                },
                _count: {
                    select: { comments: true }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 50
        });

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
};

// Create post
const createPost = async (req, res) => {
    try {
        const { content, imageUrl } = req.body;
        const userId = req.user.id;

        const post = await prisma.post.create({
            data: {
                content,
                imageUrl,
                userId
            },
            include: {
                user: {
                    select: { id: true, name: true, photoUrl: true, level: true }
                }
            }
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
};

// Like post
const likePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await prisma.post.update({
            where: { id },
            data: {
                likes: { increment: 1 }
            }
        });

        // Create notification if liker is not owner
        if (post.userId !== req.user.id) {
            const liker = await prisma.user.findUnique({
                where: { id: req.user.id },
                select: { name: true }
            });

            await prisma.notification.create({
                data: {
                    userId: post.userId,
                    type: 'SOCIAL',
                    message: `${liker.name} le gustó tu publicación`
                }
            });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error liking post', error: error.message });
    }
};

// Delete post
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const post = await prisma.post.findUnique({ where: { id } });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.userId !== userId && req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Not authorized to delete this post' });
        }

        // Delete associated comments first
        await prisma.comment.deleteMany({ where: { postId: id } });

        await prisma.post.delete({ where: { id } });
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
};

// Create comment on post
const createPostComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.user.id;

        const comment = await prisma.comment.create({
            data: {
                content,
                userId,
                postId: id
            },
            include: {
                user: {
                    select: { id: true, name: true, photoUrl: true }
                }
            }
        });

        res.status(201).json(comment);

        // Create notification if commenter is not post owner
        const post = await prisma.post.findUnique({ where: { id } });
        if (post && post.userId !== userId) {
            await prisma.notification.create({
                data: {
                    userId: post.userId,
                    type: 'SOCIAL',
                    message: `${comment.user.name} comentó en tu publicación`
                }
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error: error.message });
    }
};

module.exports = { getAllPosts, createPost, likePost, deletePost, createPostComment };
