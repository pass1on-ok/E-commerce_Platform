import { useEffect, useState } from 'react';
import axios from 'axios';

const NewsSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/news');
        setArticles(Array.isArray(res.data) ? res.data : res.data.articles || []);

      } catch (err) {
        setError('Не удалось загрузить новости.');
        console.error('Ошибка загрузки новостей:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Последние новости</h2>

      {loading && <p className="text-center text-gray-500">Загрузка новостей...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, idx) => (
          <a
            key={idx}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white border rounded-lg overflow-hidden shadow hover:shadow-md transition"
          >
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 text-blue-600 hover:underline">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600">{article.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
