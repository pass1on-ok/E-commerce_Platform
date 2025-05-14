import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NewsSection from '../components/NewsSection';


const Home = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);

  const goToAuth = () => {
    navigate('/auth');
  };


return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          Добро пожаловать в наш магазин!
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Здесь вы можете найти лучшие товары для вашего дома и бизнеса. Удобный поиск и простое оформление заказов.
        </p>
        <div className="flex justify-center">
          <button
            onClick={goToAuth}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition text-lg"
          >
            Войти в систему
          </button>
        </div>
      </div>

      <NewsSection />
    </div>
  );
};
export default Home;
