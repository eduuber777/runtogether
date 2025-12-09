const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "mongodb+srv://mblanch2018_db_userEuRXx9caMGYpWacm:1YoDLVbhi2PpDVXY@cluster0.clhhejh.mongodb.net/runtogether?retryWrites=true&w=majority"
        }
    }
});

async function main() {
    try {
        console.log('Intentando conectar...');
        await prisma.$connect();
        console.log('¡CONEXIÓN EXITOSA! La contraseña es correcta.');

        const count = await prisma.user.count();
        console.log(`Hay ${count} usuarios en la base de datos.`);
    } catch (e) {
        console.error('ERROR DE CONEXIÓN:');
        console.error(e.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
