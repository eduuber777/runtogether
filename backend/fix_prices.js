const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('--- ACTUALIZANDO PRECIOS A 0€ ---');

    try {
        // Actualizar TODOS los eventos para que tengan precio 0
        const result = await prisma.event.updateMany({
            data: {
                price: 0
            }
        });

        console.log(`✅ ${result.count} eventos actualizados a precio 0€`);

        // Verificar
        const events = await prisma.event.findMany({
            select: {
                title: true,
                price: true
            }
        });

        console.log('\n=== VERIFICACIÓN ===');
        events.forEach(e => {
            console.log(`${e.title}: ${e.price}€`);
        });

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
