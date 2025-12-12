const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
    console.log('🔐 Creando usuario administrador...\n');

    try {
        // Verificar si ya existe
        const existing = await prisma.user.findUnique({
            where: { email: 'admin@runtogether.com' }
        });

        if (existing) {
            console.log('✅ El usuario admin ya existe');
            console.log('Email: admin@runtogether.com');
            console.log('Contraseña: admin123');
            return;
        }

        // Crear usuario admin
        const hashedPassword = await bcrypt.hash('admin123', 10);

        const admin = await prisma.user.create({
            data: {
                email: 'admin@runtogether.com',
                password: hashedPassword,
                name: 'Administrador',
                role: 'ADMIN',
                photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
            }
        });

        console.log('✅ Usuario administrador creado exitosamente!');
        console.log('\n📧 Email: admin@runtogether.com');
        console.log('🔑 Contraseña: admin123');
        console.log('\n🎉 Ya puedes iniciar sesión en la aplicación');

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

createAdmin();
