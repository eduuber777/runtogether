import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-primary">
                    Run<span className="text-secondary">Together</span>
                </Link>

                <div className="space-x-4">
                    <Link to="/" className="text-gray-600 hover:text-primary">Eventos</Link>

                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-gray-600 hover:text-primary">Mis Inscripciones</Link>
                            <span className="text-gray-400">|</span>
                            <span className="font-medium text-dark">{user.name}</span>
                            <button
                                onClick={logout}
                                className="text-red-500 hover:text-red-700 ml-4"
                            >
                                Salir
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-primary font-medium hover:underline">Iniciar Sesión</Link>
                            <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-dark transition">
                                Registrarse
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
