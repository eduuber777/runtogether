const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Connecting to DB...');
        const events = await prisma.event.findMany({
            select: {
                title: true,
                imageUrl: true
            }
        });
        console.log('Events found:', events.length);
        events.forEach(e => {
            console.log(`- ${e.title}: ${e.imageUrl}`);
        });
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
