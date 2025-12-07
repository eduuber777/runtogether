import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
    const date = new Date(event.date).toLocaleDateString('es-ES', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'BEGINNER':
                return 'bg-green-100 text-green-800';
            case 'INTERMEDIATE':
                return 'bg-yellow-100 text-yellow-800';
            case 'ADVANCED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getDifficultyLabel = (difficulty) => {
        switch (difficulty) {
            case 'BEGINNER':
                return 'Principiante';
            case 'INTERMEDIATE':
                return 'Intermedio';
            case 'ADVANCED':
                return 'Avanzado';
            default:
                return 'No especificado';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
                <img
                    src={event.imageUrl || 'https://via.placeholder.com/400x200?text=Evento+RunTogether'}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                />
                {event.difficulty && (
                    <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(event.difficulty)}`}>
                        {getDifficultyLabel(event.difficulty)}
                    </span>
                )}
            </div>
            <div className="p-5">
                <div className="text-sm text-primary font-semibold mb-1">{date}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        {event.distance} km
                    </div>
                    {event.elevation && (
                        <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            Desnivel: {event.elevation}m
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center">
                    {event.price === 0 ? (
                        <span className="text-green-600 font-semibold">Gratis</span>
                    ) : (
                        <span className="text-gray-700 font-semibold">{event.price}€</span>
                    )}
                    <Link
                        to={`/event/${event.id}`}
                        className="text-primary hover:text-dark font-medium"
                    >
                        Ver detalles &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
