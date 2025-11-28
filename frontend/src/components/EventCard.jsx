import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
    const date = new Date(event.date).toLocaleDateString('es-ES', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img
                src={event.imageUrl || 'https://via.placeholder.com/400x200?text=Evento+RunTogether'}
                alt={event.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-5">
                <div className="text-sm text-primary font-semibold mb-1">{date}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-dark">{event.price} €</span>
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
