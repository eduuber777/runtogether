import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import Button from '../components/Button';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const { data } = await api.get('/notifications');
            setNotifications(data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            toast.error('Error al cargar notificaciones');
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await api.put(`/notifications/${id}/read`);
            setNotifications(notifications.map(n =>
                n.id === id ? { ...n, read: true } : n
            ));
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await api.put('/notifications/mark-all-read');
            setNotifications(notifications.map(n => ({ ...n, read: true })));
            toast.success('Todas marcadas como leídas');
        } catch (error) {
            toast.error('Error al actualizar');
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'EVENT':
                return (
                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                );
            case 'SOCIAL':
                return (
                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                    </div>
                );
            default: // SYSTEM
                return (
                    <div className="bg-gray-100 p-2 rounded-full text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                );
        }
    };

    if (loading) return <div className="text-center py-10">Cargando...</div>;

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Notificaciones</h1>
                {notifications.some(n => !n.read) && (
                    <Button variant="secondary" onClick={handleMarkAllAsRead} size="sm">
                        Marcar todas como leídas
                    </Button>
                )}
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                {notifications.length > 0 ? (
                    <div className="divide-y">
                        {notifications.map(notification => (
                            <div
                                key={notification.id}
                                className={`p-4 hover:bg-gray-50 transition flex items-start space-x-4 ${!notification.read ? 'bg-blue-50' : ''}`}
                                onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                            >
                                {getIcon(notification.type)}
                                <div className="flex-1">
                                    <p className="text-gray-800">{notification.message}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {new Date(notification.createdAt).toLocaleDateString('es-ES', {
                                            day: 'numeric',
                                            month: 'long',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                                {!notification.read && (
                                    <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        No tienes notificaciones
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
