import { useEffect, useState } from 'react';
import api from '../services/api';
import EventCard from '../components/EventCard';
import Input from '../components/Input';
import Button from '../components/Button';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        location: '',
        difficulty: '',
        dateFrom: '',
        dateTo: ''
    });

    // Debounce filters to avoid too many API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchEvents();
        }, 500);

        return () => clearTimeout(timer);
    }, [filters]);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            // Build query string from filters
            const params = new URLSearchParams();
            if (filters.search) params.append('location', filters.search); // Using search input for location as per backend logic or general search
            if (filters.location) params.append('location', filters.location);
            if (filters.difficulty) params.append('difficulty', filters.difficulty);
            if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
            if (filters.dateTo) params.append('dateTo', filters.dateTo);

            const { data } = await api.get(`/events?${params.toString()}`);
            setEvents(data);
            setFilteredEvents(data); // In server-side mode, events are already filtered
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            location: '',
            difficulty: '',
            dateFrom: '',
            dateTo: ''
        });
    };

    if (loading) return <div className="text-center py-10">Cargando eventos...</div>;

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg p-8 text-center">
                <h1 className="text-4xl font-bold mb-4">Encuentra tu próxima carrera</h1>
                <p className="text-xl">Únete a la comunidad de runners más activa</p>
            </div>

            {/* Filters Section */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Filtrar eventos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Input
                        label="Buscar"
                        type="text"
                        name="search"
                        value={filters.search}
                        onChange={handleFilterChange}
                        placeholder="Nombre o descripción..."
                    />

                    <Input
                        label="Ubicación"
                        type="text"
                        name="location"
                        value={filters.location}
                        onChange={handleFilterChange}
                        placeholder="Ciudad o región..."
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Dificultad
                        </label>
                        <select
                            name="difficulty"
                            value={filters.difficulty}
                            onChange={handleFilterChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="">Todas</option>
                            <option value="BEGINNER">Principiante</option>
                            <option value="INTERMEDIATE">Intermedio</option>
                            <option value="ADVANCED">Avanzado</option>
                        </select>
                    </div>

                    <Input
                        label="Desde"
                        type="date"
                        name="dateFrom"
                        value={filters.dateFrom}
                        onChange={handleFilterChange}
                    />

                    <Input
                        label="Hasta"
                        type="date"
                        name="dateTo"
                        value={filters.dateTo}
                        onChange={handleFilterChange}
                    />

                    <div className="flex items-end">
                        <Button
                            variant="secondary"
                            onClick={clearFilters}
                            className="w-full"
                        >
                            Limpiar filtros
                        </Button>
                    </div>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                    Mostrando {filteredEvents.length} de {events.length} eventos
                </div>
            </div>

            {/* Events Grid */}
            <div>
                <h2 className="text-2xl font-bold mb-6">
                    {filters.search || filters.location || filters.difficulty || filters.dateFrom || filters.dateTo
                        ? 'Resultados de búsqueda'
                        : 'Próximos Eventos'}
                </h2>

                {filteredEvents.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <p className="text-gray-500 mb-4">
                            No se encontraron eventos con los filtros seleccionados.
                        </p>
                        <Button variant="primary" onClick={clearFilters}>
                            Ver todos los eventos
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
