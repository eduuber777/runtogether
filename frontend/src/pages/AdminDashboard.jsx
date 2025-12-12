import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Button from '../components/Button';
import EventForm from '../components/EventForm';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('users'); // 'users' or 'events'
    const [showEventModal, setShowEventModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsRes, usersRes, eventsRes] = await Promise.all([
                api.get('/admin/stats'),
                api.get('/admin/users'),
                api.get('/events')
            ]);
            setStats(statsRes.data);
            setUsers(usersRes.data);
            setEvents(eventsRes.data);
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await api.put(`/admin/users/${userId}/role`, { role: newRole });
            fetchData(); // Refresh data
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;

        try {
            await api.delete(`/admin/users/${userId}`);
            fetchData(); // Refresh data
            toast.success('Usuario eliminado');
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Error al eliminar usuario');
        }
    };

    const handleCreateEvent = async (eventData) => {
        try {
            await api.post('/events', eventData);
            setShowEventModal(false);
            fetchData();
            toast.success('Evento creado con éxito');
        } catch (error) {
            toast.error('Error al crear evento');
        }
    };

    const handleUpdateEvent = async (eventData) => {
        try {
            await api.put(`/events/${editingEvent.id}`, eventData);
            setShowEventModal(false);
            setEditingEvent(null);
            fetchData();
            toast.success('Evento actualizado');
        } catch (error) {
            toast.error('Error al actualizar evento');
        }
    };

    const handleDeleteEvent = async (eventId) => {
        if (!window.confirm('¿Estás seguro de eliminar este evento?')) return;

        try {
            await api.delete(`/events/${eventId}`);
            fetchData();
            toast.success('Evento eliminado');
        } catch (error) {
            toast.error('Error al eliminar evento');
        }
    };

    const openEditModal = (event) => {
        setEditingEvent(event);
        setShowEventModal(true);
    };

    const closeEventModal = () => {
        setShowEventModal(false);
        setEditingEvent(null);
    };

    const handleSeedDatabase = async () => {
        if (!window.confirm('¿Crear eventos de ejemplo en la base de datos?')) return;

        try {
            const { data } = await api.post('/seed');
            toast.success(data.message);
            fetchData(); // Refresh data
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al poblar base de datos');
        }
    };

    const handleFixImages = async () => {
        if (!window.confirm('¿Actualizar las imágenes de todos los eventos?')) return;

        try {
            const { data } = await api.post('/seed/fix-images');
            toast.success(data.message);
            fetchData(); // Refresh data
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al actualizar imágenes');
        }
    };

    if (user?.role !== 'ADMIN') {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl font-bold text-red-600">Acceso Denegado</h2>
                <p className="mt-2">No tienes permisos para acceder a esta página.</p>
            </div>
        );
    }

    if (loading) {
        return <div className="text-center py-10">Cargando...</div>;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
                <p className="text-gray-600">Gestiona usuarios y visualiza estadísticas de la plataforma</p>
            </div>

            {/* Statistics Cards */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-gray-500 text-sm font-medium">Total Usuarios</h3>
                        <p className="text-3xl font-bold text-primary mt-2">{stats.totalUsers}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-gray-500 text-sm font-medium">Total Eventos</h3>
                        <p className="text-3xl font-bold text-primary mt-2">{stats.totalEvents}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-gray-500 text-sm font-medium">Inscripciones</h3>
                        <p className="text-3xl font-bold text-primary mt-2">{stats.totalInscriptions}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-gray-500 text-sm font-medium">Eventos Activos</h3>
                        <p className="text-3xl font-bold text-primary mt-2">{stats.activeEvents}</p>
                    </div>
                </div>
            )}

            {/* Recent Users */}
            {stats?.recentUsers && (
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Usuarios Recientes</h2>
                    <div className="space-y-2">
                        {stats.recentUsers.map(user => (
                            <div key={user.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                                <div className="text-sm text-gray-500">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="flex space-x-4 border-b">
                <button
                    className={`py-2 px-4 font-medium ${activeTab === 'users' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('users')}
                >
                    Usuarios
                </button>
                <button
                    className={`py-2 px-4 font-medium ${activeTab === 'events' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('events')}
                >
                    Eventos
                </button>
            </div>

            {/* Users Management */}
            {activeTab === 'users' && (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-semibold">Gestión de Usuarios</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inscripciones</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha Registro</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {users.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{user.name}</div>
                                            {user.level && (
                                                <div className="text-sm text-gray-500">{user.level}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                className="text-sm border border-gray-300 rounded px-2 py-1"
                                            >
                                                <option value="RUNNER">Runner</option>
                                                <option value="ADMIN">Admin</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {user._count?.inscriptions || 0}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Button
                                                variant="secondary"
                                                onClick={() => handleDeleteUser(user.id)}
                                                className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 text-white"
                                            >
                                                Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Events Management */}
            {activeTab === 'events' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center gap-2 flex-wrap">
                        <div className="flex gap-2">
                            <Button
                                onClick={handleSeedDatabase}
                                variant="secondary"
                                className="bg-green-500 hover:bg-green-600 text-white"
                            >
                                🌱 Poblar Base de Datos
                            </Button>
                            <Button
                                onClick={handleFixImages}
                                variant="secondary"
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                            >
                                📸 Arreglar Imágenes
                            </Button>
                        </div>
                        <Button onClick={() => setShowEventModal(true)}>
                            + Nuevo Evento
                        </Button>
                    </div>

                    {showEventModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                                <EventForm
                                    event={editingEvent}
                                    onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
                                    onCancel={closeEventModal}
                                />
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Evento</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ubicación</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {events.map(event => (
                                        <tr key={event.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{event.title}</div>
                                                <div className="text-sm text-gray-500">{event.distance} km • {event.difficulty}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(event.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{event.location}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {event.price === 0 ? 'Gratis' : `${event.price}€`}
                                            </td>
                                            <td className="px-6 py-4 space-x-2">
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => openEditModal(event)}
                                                    className="text-sm px-3 py-1"
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => handleDeleteEvent(event.id)}
                                                    className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 text-white"
                                                >
                                                    Eliminar
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
