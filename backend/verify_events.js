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
        const count = await prisma.event.count();
        console.log(`Total eventos en DB: ${count}`);

        const events = await prisma.event.findMany({
            take: 3,
            select: { title: true, price: true }
        });
        console.log('Muestra de eventos:', events);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
