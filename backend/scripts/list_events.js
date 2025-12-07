const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const events = await prisma.event.findMany({
        orderBy: { date: 'asc' }
    });

    console.log(`Total events found: ${events.length}`);
    console.log('-----------------------------------');

    events.forEach(event => {
        console.log(`- ${event.title} (${event.date.toISOString().split('T')[0]})`);
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
