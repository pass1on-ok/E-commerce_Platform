import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductTable from '../components/ProductTable';
import CreateProductModal from '../components/CreateProductModal';
import EditProductModal from '../components/EditProductModal';
import { jwtDecode } from 'jwt-decode';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        setCurrentUserId(decoded.id);
      }

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

  const handleDelete = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
    } catch (error) {
      alert("Это не ваш товар. Вы не можете его удалить!")
      console.error('Ошибка при удалении товара:', error);
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowEditModal(true);
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 flex justify-center">
      <div className="max-w-5xl w-full p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="🔍 Поиск по товару..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
          />
          <button
            onClick={() => setShowModal(true)}
            className="ml-4 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300 transform hover:scale-105"
          >
            + Новый товар
          </button>
        </div>

        {filtered.length > 0 ? (
          <ProductTable
            products={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
            currentUserId={currentUserId}
          />
        ) : (
          <div className="text-center text-gray-500 mt-6">Товары не найдены.</div>
        )}
      </div>

      {showModal && (
        <CreateProductModal
          onClose={() => setShowModal(false)}
          onCreated={fetchProducts}
        />
      )}

      {showEditModal && currentProduct && (
        <EditProductModal
          product={currentProduct}
          onClose={() => setShowEditModal(false)}
          onUpdated={fetchProducts}
        />
      )}
    </div>
  );
};

export default Products;
