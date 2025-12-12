// INSTRUCCIONES:
// 1. Ve a https://runthoger2020.netlify.app
// 2. Inicia sesión como admin (admin@runtogether.com / admin123)
// 3. Abre la consola del navegador (F12 o clic derecho > Inspeccionar > Console)
// 4. Copia y pega TODO este código
// 5. Presiona Enter
// 6. Espera unos segundos
// 7. Recarga la página

(async function createEvents() {
    const API_URL = 'https://runtogether.onrender.com/api';

    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('❌ No estás autenticado. Por favor inicia sesión primero.');
        return;
    }

    const events = [
        {
            title: 'Maratón de Barcelona 2025',
            description: 'Recorre las calles más emblemáticas de Barcelona. Sagrada Familia, Camp Nou y mar.',
            date: '2025-03-15T08:00:00Z',
            location: 'Barcelona, España',
            distance: 42.195,
            price: 0,
            difficulty: 'ADVANCED',
            imageUrl: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1200&h=600&fit=crop&q=80',
            maxParticipants: 5000,
            elevation: 150,
            terrainType: 'ASPHALT'
        },
        {
            title: 'Trail Collserola 10K',
            description: 'Carrera de montaña perfecta para iniciarse. Vistas espectaculares.',
            date: '2025-04-10T09:00:00Z',
            location: 'Sant Cugat, España',
            distance: 10.0,
            price: 0,
            difficulty: 'BEGINNER',
            imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=600&fit=crop&q=80',
            maxParticipants: 300,
            elevation: 350,
            terrainType: 'TRAIL'
        },
        {
            title: 'San Silvestre Vallecana',
            description: 'La carrera más divertida del año. Disfraces y mucho running.',
            date: '2025-12-31T17:00:00Z',
            location: 'Madrid, España',
            distance: 10.0,
            price: 0,
            difficulty: 'INTERMEDIATE',
            imageUrl: 'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=1200&h=600&fit=crop&q=80',
            maxParticipants: 2000,
            elevation: 50,
            terrainType: 'ASPHALT'
        },
        {
            title: 'Ultra Pirineu XS',
            description: 'Desafío técnico en el corazón de los Pirineos.',
            date: '2025-06-20T07:00:00Z',
            location: 'Bagà, España',
            distance: 25.0,
            price: 0,
            difficulty: 'ADVANCED',
            imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop&q=80',
            maxParticipants: 150,
            elevation: 1200,
            terrainType: 'TRAIL'
        },
        {
            title: 'Carrera de la Mujer',
            description: 'Evento solidario. Circuito urbano llano.',
            date: '2025-05-05T10:00:00Z',
            location: 'Valencia, España',
            distance: 5.0,
            price: 0,
            difficulty: 'BEGINNER',
            imageUrl: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1200&h=600&fit=crop&q=80',
            maxParticipants: 1000,
            elevation: 10,
            terrainType: 'ASPHALT'
        }
    ];

    console.log('🚀 Creando eventos...\n');

    let created = 0;
    for (const event of events) {
        try {
            const response = await fetch(`${API_URL}/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(event)
            });

            if (response.ok) {
                console.log(`✅ ${event.title}`);
                created++;
            } else {
                const error = await response.json();
                console.error(`❌ ${event.title}: ${error.message}`);
            }
        } catch (error) {
            console.error(`❌ ${event.title}: ${error.message}`);
        }
    }

    console.log(`\n✅ Creados ${created}/5 eventos`);
    console.log('🔄 Recarga la página para verlos');
})();
