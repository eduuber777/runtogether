import { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';

const EventForm = ({ event, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        distance: '',
        price: '',
        imageUrl: '',
        difficulty: 'BEGINNER',
        maxParticipants: '',
        elevation: '',
        terrainType: 'ASPHALT'
    });

    useEffect(() => {
        if (event) {
            setFormData({
                ...event,
                date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
                distance: event.distance || '',
                price: event.price || 0,
                maxParticipants: event.maxParticipants || '',
                elevation: event.elevation || ''
            });
        }
    }, [event]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">{event ? 'Editar Evento' : 'Nuevo Evento'}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Título"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Fecha"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Ubicación"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Distancia (km)"
                    type="number"
                    step="0.1"
                    name="distance"
                    value={formData.distance}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Precio (€)"
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Imagen URL"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dificultad</label>
                    <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="BEGINNER">Principiante</option>
                        <option value="INTERMEDIATE">Intermedio</option>
                        <option value="ADVANCED">Avanzado</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Terreno</label>
                    <select
                        name="terrainType"
                        value={formData.terrainType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="ASPHALT">Asfalto</option>
                        <option value="TRAIL">Trail</option>
                        <option value="MIXED">Mixto</option>
                    </select>
                </div>

                <Input
                    label="Desnivel (m)"
                    type="number"
                    name="elevation"
                    value={formData.elevation}
                    onChange={handleChange}
                />
                <Input
                    label="Max Participantes"
                    type="number"
                    name="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="secondary" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button type="submit">
                    {event ? 'Guardar Cambios' : 'Crear Evento'}
                </Button>
            </div>
        </form>
    );
};

export default EventForm;
