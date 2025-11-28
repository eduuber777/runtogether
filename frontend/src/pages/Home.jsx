import { useEffect, useState } from 'react';
import api from '../services/api';
import EventCard from '../components/EventCard';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await api.get('/events');
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return <div className="text-center py-10">Cargando eventos...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-dark mb-8 text-center">Próximos Eventos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
            {events.length === 0 && (
                <p className="text-center text-gray-500">No hay eventos disponibles en este momento.</p>
            )}
        </div>
    );
};

export default Home;
