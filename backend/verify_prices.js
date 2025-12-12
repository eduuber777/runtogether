const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkPrices() {
    try {
        console.log('Conectando a la base de datos...');

        const events = await prisma.event.findMany({
            select: {
                title: true,
                price: true,
                imageUrl: true,
                difficulty: true
            }
        });

        console.log(`\n=== EVENTOS ENCONTRADOS: ${events.length} ===\n`);

        events.forEach((event, index) => {
            console.log(`${index + 1}. ${event.title}`);
            console.log(`   Precio: ${event.price}€`);
            console.log(`   Dificultad: ${event.difficulty}`);
            console.log(`   Imagen: ${event.imageUrl ? 'Sí' : 'No'}`);
            console.log('');
        });

        const paidEvents = events.filter(e => e.price > 0);
        if (paidEvents.length > 0) {
            console.log(`⚠️  ADVERTENCIA: ${paidEvents.length} eventos tienen precio > 0`);
        } else {
            console.log('✅ Todos los eventos son gratuitos');
        }

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

checkPrices();
