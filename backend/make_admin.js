const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function makeAdmin() {
    console.log('🔧 Convirtiendo usuario en administrador...\n');

    try {
        const user = await prisma.user.update({
            where: { email: 'admin@runtogether.com' },
            data: { role: 'ADMIN' }
        });

        console.log('✅ Usuario convertido a ADMIN exitosamente!');
        console.log('\n👤 Usuario:', user.name);
        console.log('📧 Email:', user.email);
        console.log('👑 Rol:', user.role);
        console.log('\n🎉 Ya puedes acceder al panel de administración');

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.log('\n💡 Asegúrate de que:');
        console.log('   1. DATABASE_URL en .env apunta a producción');
        console.log('   2. El usuario existe en la base de datos');
    } finally {
        await prisma.$disconnect();
    }
}

makeAdmin();
