const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://mblanch2018_db_userEuRXx9caMGYpWacm:1YoDLVbhi2PpDVXY@cluster0.clhhejh.mongodb.net/runtogether?retryWrites=true&w=majority";

async function testConnection() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('✅ Conexión exitosa a MongoDB Atlas');

        const db = client.db('runtogether');
        const events = await db.collection('Event').find({}).toArray();

        console.log(`\nEventos encontrados: ${events.length}`);
        events.forEach((e, i) => {
            console.log(`${i + 1}. ${e.title} - Precio: ${e.price}€`);
        });

        // Actualizar precios
        const result = await db.collection('Event').updateMany(
            {},
            { $set: { price: 0 } }
        );

        console.log(`\n✅ ${result.modifiedCount} eventos actualizados a 0€`);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await client.close();
    }
}

testConnection();
