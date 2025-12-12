const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Endpoint para convertir un usuario en admin (temporal, solo para setup inicial)
const makeUserAdmin = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email es requerido' });
        }

        const user = await prisma.user.update({
            where: { email },
            data: { role: 'ADMIN' }
        });

        res.json({
            success: true,
            message: `Usuario ${user.email} convertido a ADMIN`,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Error making user admin:', error);
        res.status(500).json({
            success: false,
            message: 'Error al convertir usuario en admin',
            error: error.message
        });
    }
};

module.exports = { makeUserAdmin };
