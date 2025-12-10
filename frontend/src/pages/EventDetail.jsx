import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { toast } from 'react-toastify';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [participantCount, setParticipantCount] = useState(0);
    const [participants, setParticipants] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const eventRes = await api.get(`/events/${id}`);
                setEvent(eventRes.data);

                // Check if user is already registered
                if (user) {
                    const inscriptionsRes = await api.get('/inscriptions/me');
                    const registered = inscriptionsRes.data.some(
                        ins => ins.eventId === id && ins.status === 'CONFIRMED'
                    );
                    setIsRegistered(registered);
                }

                // Get comments
                const commentsRes = await api.get(`/comments/event/${id}`);
                setComments(commentsRes.data);

                // Get participants
                const participantsRes = await api.get(`/inscriptions/event/${id}`);
                setParticipants(participantsRes.data);
                setParticipantCount(participantsRes.data.length);
            } catch (err) {
                console.error(err);
                toast.error('Error al cargar el evento');
            }
        };

        fetchEventData();
    }, [id, user]);

    const handleInscription = async () => {
        if (!user) {
            toast.info('Debes iniciar sesión para inscribirte');
            navigate('/login');
            return;
        }

        if (isRegistered) {
            toast.info('Ya estás inscrito en este evento');
            return;
        }

        if (event.maxParticipants && participantCount >= event.maxParticipants) {
            toast.error('Este evento ha alcanzado el límite de participantes');
            return;
        }

        try {
            await api.post('/inscriptions', { eventId: id });
            toast.success('¡Inscripción realizada con éxito!');
            setIsRegistered(true);

            // Refresh participants
            const participantsRes = await api.get(`/inscriptions/event/${id}`);
            setParticipants(participantsRes.data);
            setParticipantCount(participantsRes.data.length);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al inscribirse');
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.info('Debes iniciar sesión para comentar');
            return;
        }
        if (!newComment.trim()) return;

        try {
            const { data } = await api.post(`/comments/event/${id}`, { content: newComment });
            setComments([data, ...comments]);
            setNewComment('');
            toast.success('Comentario añadido');
        } catch (error) {
            toast.error('Error al añadir comentario');
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('¿Eliminar este comentario?')) return;

        try {
            await api.delete(`/comments/${commentId}`);
            setComments(comments.filter(c => c.id !== commentId));
            toast.success('Comentario eliminado');
        } catch (error) {
            toast.error('Error al eliminar comentario');
        }
    };

    const getDifficultyLabel = (difficulty) => {
        switch (difficulty) {
            case 'BEGINNER': return 'Principiante';
            case 'INTERMEDIATE': return 'Intermedio';
            case 'ADVANCED': return 'Avanzado';
            default: return 'No especificado';
        }
    };

    const getTerrainLabel = (terrain) => {
        switch (terrain) {
            case 'TRAIL': return 'Trail';
            case 'ASPHALT': return 'Asfalto';
            case 'MIXED': return 'Mixto';
            default: return 'No especificado';
        }
    };

    if (!event) return <div className="text-center py-10">Cargando...</div>;

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative">
                    <img
                        src={event.imageUrl || 'https://via.placeholder.com/1200x400'}
                        alt={event.title}
                        className="w-full h-96 object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/1200x400?text=Imagen+No+Disponible'; }}
                    />
                    {event.difficulty && (
                        <span className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                            {getDifficultyLabel(event.difficulty)}
                        </span>
                    )}
                </div>

                <div className="p-8">
                    <h1 className="text-4xl font-bold text-dark mb-6">{event.title}</h1>

                    {/* Event Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500 mb-1">Fecha</div>
                            <div className="font-semibold">
                                {new Date(event.date).toLocaleDateString('es-ES', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500 mb-1">Ubicación</div>
                            <div className="font-semibold">{event.location}</div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500 mb-1">Distancia</div>
                            <div className="font-semibold">{event.distance} km</div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500 mb-1">Precio</div>
                            <div className="font-semibold text-green-600">
                                {event.price === 0 ? 'Gratis' : `${event.price}€`}
                            </div>
                        </div>
                    </div>

                    {/* Additional Details */}
                    {(event.elevation || event.terrainType || event.maxParticipants) && (
                        <div className="bg-blue-50 p-6 rounded-lg mb-8">
                            <h3 className="text-lg font-semibold mb-4">Detalles Técnicos</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {event.elevation && (
                                    <div>
                                        <div className="text-sm text-gray-600">Desnivel</div>
                                        <div className="font-semibold">{event.elevation}m</div>
                                    </div>
                                )}
                                {event.terrainType && (
                                    <div>
                                        <div className="text-sm text-gray-600">Tipo de terreno</div>
                                        <div className="font-semibold">{getTerrainLabel(event.terrainType)}</div>
                                    </div>
                                )}
                                {event.maxParticipants && (
                                    <div>
                                        <div className="text-sm text-gray-600">Plazas disponibles</div>
                                        <div className="font-semibold">
                                            {participantCount} / {event.maxParticipants}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-semibold mb-4">Descripción</h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {event.description}
                        </p>
                    </div>

                    {/* Registration Button */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        {isRegistered ? (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-lg flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Ya estás inscrito en este evento
                            </div>
                        ) : (
                            <Button
                                onClick={handleInscription}
                                className="text-lg px-8 py-3"
                                disabled={event.maxParticipants && participantCount >= event.maxParticipants}
                            >
                                {event.maxParticipants && participantCount >= event.maxParticipants
                                    ? 'Evento completo'
                                    : 'Inscribirme al Evento'}
                            </Button>
                        )}

                        <Button
                            variant="secondary"
                            onClick={() => navigate('/')}
                            className="text-lg px-8 py-3"
                        >
                            Volver a eventos
                        </Button>
                    </div>
                </div>
            </div>

            {/* Participants Section */}
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-6">Participantes ({participants.length})</h3>
                {participants.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {participants.map((p) => (
                            <Link to={`/profile/${p.user.id}`} key={p.id} className="text-center hover:opacity-80 transition-opacity block">
                                {p.user.photoUrl ? (
                                    <img
                                        src={p.user.photoUrl}
                                        alt={p.user.name}
                                        className="w-16 h-16 rounded-full mx-auto object-cover mb-2"
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150?text=User'; }}
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-2">
                                        {p.user.name.charAt(0)}
                                    </div>
                                )}
                                <div className="font-medium text-sm truncate" title={p.user.name}>
                                    {p.user.name}
                                </div>
                                <div className="text-xs text-gray-500">{p.user.level || 'Runner'}</div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">Aún no hay participantes inscritos.</p>
                )}
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-6">Comentarios ({comments.length})</h3>

                {/* Add Comment Form */}
                {user ? (
                    <form onSubmit={handleAddComment} className="mb-6">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Escribe un comentario..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            rows="3"
                        />
                        <div className="mt-2 flex justify-end">
                            <Button type="submit" disabled={!newComment.trim()}>
                                Añadir comentario
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
                        <p className="text-gray-600">
                            <a href="/login" className="text-primary hover:underline">Inicia sesión</a> para comentar
                        </p>
                    </div>
                )}

                {/* Comments List */}
                <div className="space-y-4">
                    {comments.map(comment => (
                        <div key={comment.id} className="border-b pb-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3">
                                    {comment.user.photoUrl ? (
                                        <img
                                            src={comment.user.photoUrl}
                                            alt={comment.user.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                                            {comment.user.name.charAt(0)}
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="font-semibold">{comment.user.name}</div>
                                        <p className="text-gray-700 mt-1">{comment.content}</p>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {new Date(comment.createdAt).toLocaleDateString('es-ES', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                    </div>
                                </div>
                                {user && (user.id === comment.userId || user.role === 'ADMIN') && (
                                    <button
                                        onClick={() => handleDeleteComment(comment.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {comments.length === 0 && (
                        <p className="text-center text-gray-500 py-8">
                            No hay comentarios aún. ¡Sé el primero en comentar!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventDetail;
