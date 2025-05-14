import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('http://localhost:5000/api/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => setUser(res.data))
    .catch(err => console.error('Ошибка загрузки профиля:', err));
  }, []);

  if (!user) return <div className="text-center mt-10">Загрузка профиля...</div>;

return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">Профиль</h2>
        
        <div className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="first_name" className="text-gray-700 font-medium">Имя:</label>
            <input
              id="first_name"
              type="text"
              value={user.first_name}
              className="mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 cursor-not-allowed"
              disabled
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="last_name" className="text-gray-700 font-medium">Фамилия:</label>
            <input
              id="last_name"
              type="text"
              value={user.last_name}
              className="mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 cursor-not-allowed"
              disabled
            />
          </div>

          {user.email && (
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 font-medium">Email:</label>
              <input
                id="email"
                type="email"
                value={user.email}
                className="mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 cursor-not-allowed"
                disabled
              />
            </div>
          )}

          {user.phone && (
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-gray-700 font-medium">Телефон:</label>
              <input
                id="phone"
                type="text"
                value={user.phone}
                className="mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 cursor-not-allowed"
                disabled
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
