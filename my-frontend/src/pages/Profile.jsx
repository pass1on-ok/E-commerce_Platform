import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

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
  <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
    <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Профиль</h2>
    <div className="space-y-3 text-gray-700 text-lg">
      <p><span className="font-semibold">Имя:</span> {user.first_name}</p>
      <p><span className="font-semibold">Фамилия:</span> {user.last_name}</p>
      {user.email && <p><span className="font-semibold">Email:</span> {user.email}</p>}
      {user.phone && <p><span className="font-semibold">Телефон:</span> {user.phone}</p>}
    </div>
  </div>
);
};

export default Profile;
