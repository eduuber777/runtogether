import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { toast } from 'react-toastify';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/events/${id}`)
            .then(res => setEvent(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const handleInscription = async () => {
        if (!user) {
            toast.info('Debes iniciar sesión para inscribirte');
            navigate('/login');
            return;
        }

        try {
            await api.post('/inscriptions', { eventId: id });
            toast.success('¡Inscripción realizada con éxito!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al inscribirse');
        }
    };

    if (!event) return <div>Cargando...</div>;

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <img
                src={event.imageUrl || 'https://via.placeholder.com/800x400'}
                alt={event.title}
                className="w-full h-64 object-cover"
            />
            <div className="p-8">
                <h1 className="text-3xl font-bold text-dark mb-4">{event.title}</h1>
                <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
                    <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                    <span>📍 {event.location}</span>
                    <span>🏃 {event.distance} km</span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-8">{event.description}</p>

                <Button onClick={handleInscription} className="w-full md:w-auto text-lg px-8">
                    Inscribirme al Evento
                </Button>
            </div>
        </div>
    );
};

export default EventDetail;
