import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const [inscriptions, setInscriptions] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        api.get('/inscriptions/me')
            .then(res => setInscriptions(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Hola, {user?.name}</h1>
            <h2 className="text-xl font-semibold text-primary mb-4">Mis Inscripciones</h2>

            {inscriptions.length === 0 ? (
                <p>No tienes inscripciones activas.</p>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evento</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {inscriptions.map((ins) => (
                                <tr key={ins.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{ins.event.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(ins.event.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {ins.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
