import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductTable from '../components/ProductTable';
import CreateProductModal from '../components/CreateProductModal';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchProducts = async () => {
  try {
    const token = localStorage.getItem('token'); 
    const res = await axios.get('http://localhost:5000/api/products', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    setProducts(res.data);
  } catch (error) {
    console.error('Ошибка при получении товаров:', error);
  }
};

  useEffect(() => { fetchProducts(); }, []);

  const filtered = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
  <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow border border-gray-200">
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <input
        type="text"
        placeholder="🔍 Поиск по товару..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
      />
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition text-sm sm:text-base"
      >
        + Новый товар
      </button>
    </div>
    
    <ProductTable products={filtered} />

    {showModal && (
      <CreateProductModal
        onClose={() => setShowModal(false)}
        onCreated={fetchProducts}
      />
    )}
  </div>
);
};

export default Products;
