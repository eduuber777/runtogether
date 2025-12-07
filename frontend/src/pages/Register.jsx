import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Todos los campos son obligatorios');
            return false;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('El formato del email no es válido');
            return false;
        }

        // Validar fortaleza de contraseña
        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return false;
        }

        if (!formData.acceptTerms) {
            setError('Debes aceptar los términos y condiciones');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        setLoading(true);
        try {
            await api.post('/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            // Mostrar mensaje de éxito y redirigir
            alert('¡Registro exitoso! Por favor inicia sesión.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al registrarse. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Crear cuenta
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Únete a la comunidad de runners
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <Input
                            label="Nombre completo"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Tu nombre"
                            required
                        />

                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="tu@email.com"
                            required
                        />

                        <Input
                            label="Contraseña"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Mínimo 6 caracteres"
                            required
                        />

                        <Input
                            label="Confirmar contraseña"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Repite tu contraseña"
                            required
                        />

                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                name="acceptTerms"
                                checked={formData.acceptTerms}
                                onChange={handleChange}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mt-1"
                            />
                            <label className="ml-2 block text-sm text-gray-900">
                                Acepto los{' '}
                                <a href="/terms" className="text-primary hover:underline">
                                    términos y condiciones
                                </a>
                                {' '}y la{' '}
                                <a href="/privacy" className="text-primary hover:underline">
                                    política de privacidad
                                </a>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Registrando...' : 'Crear cuenta'}
                        </Button>

                        <p className="text-center text-sm text-gray-600">
                            ¿Ya tienes cuenta?{' '}
                            <Link to="/login" className="text-primary hover:underline font-medium">
                                Inicia sesión
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
