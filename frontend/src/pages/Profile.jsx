import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        level: '',
        photoUrl: ''
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                level: user.level || '',
                photoUrl: user.photoUrl || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const response = await api.put(`/users/${user.id}`, formData);
            updateUser(response.data);
            setMessage('Perfil actualizado correctamente');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al actualizar el perfil');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);
        try {
            await api.post('/auth/change-password', {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            setMessage('Contraseña actualizada correctamente');
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cambiar la contraseña');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">Mi Perfil</h1>
                <p className="text-gray-600">Gestiona tu información personal</p>
            </div>

            {message && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                    {message}
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {/* Profile Information */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Nombre completo"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nivel de corredor
                        </label>
                        <select
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="">Selecciona tu nivel</option>
                            <option value="BEGINNER">Principiante</option>
                            <option value="INTERMEDIATE">Intermedio</option>
                            <option value="ADVANCED">Avanzado</option>
                        </select>
                    </div>

                    <Input
                        label="URL de foto de perfil"
                        type="url"
                        name="photoUrl"
                        value={formData.photoUrl}
                        onChange={handleChange}
                        placeholder="https://ejemplo.com/foto.jpg"
                    />

                    <div className="pt-4">
                        <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? 'Guardando...' : 'Guardar cambios'}
                        </Button>
                    </div>
                </form>
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Cambiar Contraseña</h2>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <Input
                        label="Contraseña actual"
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        required
                    />

                    <Input
                        label="Nueva contraseña"
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Mínimo 6 caracteres"
                        required
                    />

                    <Input
                        label="Confirmar nueva contraseña"
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                    />

                    <div className="pt-4">
                        <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? 'Actualizando...' : 'Cambiar contraseña'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
