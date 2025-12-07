import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const [inscriptions, setInscriptions] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [inscriptionsRes, statsRes] = await Promise.all([
                    api.get('/inscriptions/me'),
                    api.get(`/users/${user?.id}/stats`)
                ]);
                setInscriptions(inscriptionsRes.data);
                setStats(statsRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (user?.id) {
            fetchData();
        }
    }, [user]);

    if (loading) {
        return <div className="text-center py-8">Cargando...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Hola, {user?.name}</h1>
                <p className="text-gray-600">
                    {user?.level ? `Nivel: ${user.level}` : 'Bienvenido a RunTogether'}
                </p>
            </div>

            {/* Statistics Cards */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-gray-500 text-sm font-medium">Eventos Totales</h3>
                        <p className="text-3xl font-bold text-primary mt-2">{stats.totalEvents}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-gray-500 text-sm font-medium">Distancia Total</h3>
                        <p className="text-3xl font-bold text-primary mt-2">{stats.totalDistance.toFixed(1)} km</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-gray-500 text-sm font-medium">Próximos Eventos</h3>
                        <p className="text-3xl font-bold text-primary mt-2">{stats.upcomingEvents}</p>
                    </div>
                </div>
            )}

            {/* Inscriptions Table */}
            <div>
                <h2 className="text-xl font-semibold text-primary mb-4">Mis Inscripciones</h2>

                {inscriptions.length === 0 ? (
                    <div className="bg-white p-8 rounded-lg shadow text-center">
                        <p className="text-gray-500">No tienes inscripciones activas.</p>
                        <a href="/" className="text-primary hover:underline mt-2 inline-block">
                            Explorar eventos
                        </a>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evento</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distancia</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {inscriptions.map((ins) => (
                                    <tr key={ins.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{ins.event.title}</div>
                                            <div className="text-sm text-gray-500">{ins.event.location}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(ins.event.date).toLocaleDateString('es-ES', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {ins.event.distance} km
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ins.status === 'CONFIRMED'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                {ins.status === 'CONFIRMED' ? 'Confirmado' : 'Cancelado'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
