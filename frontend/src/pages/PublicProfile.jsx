import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

const PublicProfile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const [profileRes, statsRes] = await Promise.all([
                    api.get(`/users/${id}`),
                    api.get(`/users/${id}/stats`)
                ]);
                setProfile(profileRes.data);
                setStats(statsRes.data);
            } catch (error) {
                console.error(error);
                toast.error('Error al cargar el perfil del usuario');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProfileData();
        }
    }, [id]);

    if (loading) return <div className="text-center py-10">Cargando perfil...</div>;
    if (!profile) return <div className="text-center py-10">Usuario no encontrado</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex items-end -mt-12 mb-6">
                        {profile.photoUrl ? (
                            <img
                                src={profile.photoUrl}
                                alt={profile.name}
                                className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150?text=User'; }}
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-500 shadow-md">
                                {profile.name.charAt(0)}
                            </div>
                        )}
                        <div className="ml-6 mb-2">
                            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                            <div className="flex items-center text-gray-600 mt-1">
                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                                    {profile.level || 'Runner'}
                                </span>
                                <span className="text-sm">Miembro desde {new Date(profile.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    {stats && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-blue-600">{stats.totalEvents}</div>
                                <div className="text-sm text-gray-500">Carreras Completadas</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-green-600">{stats.totalDistance.toFixed(1)} km</div>
                                <div className="text-sm text-gray-500">Distancia Total</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-purple-600">{stats.upcomingEvents}</div>
                                <div className="text-sm text-gray-500">Próximos Eventos</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Activity / Events */}
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-bold mb-6">Historial de Eventos</h3>
                {profile.inscriptions && profile.inscriptions.length > 0 ? (
                    <div className="space-y-4">
                        {profile.inscriptions.map((inscription) => (
                            <div key={inscription.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                                <div>
                                    <h4 className="font-semibold text-lg">{inscription.event.title}</h4>
                                    <div className="text-sm text-gray-500">
                                        {new Date(inscription.event.date).toLocaleDateString()} • {inscription.event.distance} km
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${new Date(inscription.event.date) < new Date()
                                    ? 'bg-gray-100 text-gray-800'
                                    : 'bg-green-100 text-green-800'
                                    }`}>
                                    {new Date(inscription.event.date) < new Date() ? 'Completado' : 'Próximo'}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-4">Este usuario aún no ha participado en eventos.</p>
                )}
            </div>
        </div>
    );
};

export default PublicProfile;
