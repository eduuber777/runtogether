import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import api from '../services/api';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (user) {
            const fetchUnreadCount = async () => {
                try {
                    const { data } = await api.get('/notifications/unread-count');
                    setUnreadCount(data.count);
                } catch (error) {
                    console.error('Error fetching unread count:', error);
                }
            };
            fetchUnreadCount();
            // Poll every minute
            const interval = setInterval(fetchUnreadCount, 60000);
            return () => clearInterval(interval);
        }
    }, [user]);

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-primary">
                        Run<span className="text-secondary">Together</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/" className="text-gray-600 hover:text-primary">Eventos</Link>
                        <Link to="/community" className="text-gray-600 hover:text-primary">Comunidad</Link>

                        {user ? (
                            <>
                                <Link to="/notifications" className="relative text-gray-600 hover:text-primary">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    {unreadCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                            {unreadCount}
                                        </span>
                                    )}
                                </Link>
                                <Link to="/dashboard" className="text-gray-600 hover:text-primary">
                                    Mis Inscripciones
                                </Link>
                                <Link to="/profile" className="text-gray-600 hover:text-primary">
                                    Mi Perfil
                                </Link>
                                {user.role === 'ADMIN' && (
                                    <Link to="/admin" className="text-gray-600 hover:text-primary">
                                        Admin
                                    </Link>
                                )}
                                <span className="text-gray-400">|</span>
                                <span className="font-medium text-dark">{user.name}</span>
                                <button
                                    onClick={logout}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Salir
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-primary font-medium hover:underline">
                                    Iniciar Sesión
                                </Link>
                                <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-dark transition">
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-gray-600"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 space-y-2 pb-4">
                        <Link to="/" className="block text-gray-600 hover:text-primary py-2">
                            Eventos
                        </Link>
                        {user ? (
                            <>
                                <Link to="/notifications" className="block text-gray-600 hover:text-primary py-2 flex items-center justify-between">
                                    <span>Notificaciones</span>
                                    {unreadCount > 0 && (
                                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            {unreadCount}
                                        </span>
                                    )}
                                </Link>
                                <Link to="/dashboard" className="block text-gray-600 hover:text-primary py-2">
                                    Mis Inscripciones
                                </Link>
                                <Link to="/profile" className="block text-gray-600 hover:text-primary py-2">
                                    Mi Perfil
                                </Link>
                                {user.role === 'ADMIN' && (
                                    <Link to="/admin" className="block text-gray-600 hover:text-primary py-2">
                                        Admin
                                    </Link>
                                )}
                                <div className="pt-2 border-t">
                                    <p className="text-sm text-gray-500 mb-2">{user.name}</p>
                                    <button
                                        onClick={logout}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Salir
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block text-primary font-medium py-2">
                                    Iniciar Sesión
                                </Link>
                                <Link to="/register" className="block bg-primary text-white px-4 py-2 rounded-md text-center">
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
