const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Starting cleanup of duplicate events...');

    const events = await prisma.event.findMany({
        orderBy: { createdAt: 'asc' }
    });

    const seenTitles = new Set();
    const duplicates = [];

    for (const event of events) {
        // Create a unique key based on title and date to identify duplicates
        // Using toISOString() for date to ensure consistent string representation
        const key = `${event.title}-${event.date.toISOString()}`;

        if (seenTitles.has(key)) {
            duplicates.push(event);
        } else {
            seenTitles.add(key);
        }
    }

    console.log(`Found ${duplicates.length} duplicate events.`);

    for (const duplicate of duplicates) {
        console.log(`Deleting duplicate event: ${duplicate.title} (${duplicate.id})`);

        // First delete related inscriptions to avoid foreign key constraint issues (if any)
        // Although MongoDB doesn't enforce it strictly, Prisma might.
        await prisma.inscription.deleteMany({
            where: { eventId: duplicate.id }
        });

        await prisma.event.delete({
            where: { id: duplicate.id }
        });
    }

    console.log('Cleanup complete.');
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
