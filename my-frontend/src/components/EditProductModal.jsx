import { useState, useEffect } from 'react';
import axios from 'axios';

const EditProductModal = ({ product, onClose, onUpdated }) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);


const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  try {
    const res = await axios.put(
      `http://localhost:5000/api/products/${product.id}`, 
      { name, description, price },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    onUpdated(); 
    onClose(); 
  } catch (error) {
    alert("Это не ваш товар. Вы не можете его изменить!")
    console.error('Ошибка при обновлении товара:', error);
  }
};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Редактировать товар</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">Название</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2">Описание</label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-2">Цена</label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg mr-4"
            >
              Отменить
            </button>
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
