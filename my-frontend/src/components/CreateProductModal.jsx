import { useState } from 'react';
import axios from 'axios';

const CreateProductModal = ({ onClose, onCreated }) => {
  const [form, setForm] = useState({ name: '', description: '', price: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/products', form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    onCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow w-full max-w-md animate-fade-in">
        <h2 className="text-xl font-bold mb-4">Создать товар</h2>
        <input
          className="w-full border p-2 mb-2"
          placeholder="Название"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <textarea
          className="w-full border p-2 mb-2"
          placeholder="Описание"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          className="w-full border p-2 mb-4"
          type="number"
          placeholder="Цена"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Отмена</button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Создать</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductModal;
