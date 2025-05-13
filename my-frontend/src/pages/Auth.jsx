import { useState } from 'react';
import Input from '../components/Input';
import axios from 'axios';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    first_name: '',
    last_name: '',
    password: ''
  });

  const toggleMode = () => setIsLogin(!isLogin);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, formData);
      alert('Успешно!');
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      alert('Ошибка: ' + err.response.data.message);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        {isLogin ? 'Вход' : 'Регистрация'}
      </h2>

      {!isLogin && (
        <>
          <Input label="Имя" name="first_name" value={formData.first_name} onChange={handleChange} required />
          <Input label="Фамилия" name="last_name" value={formData.last_name} onChange={handleChange} required />
          <Input label="Телефон (необязательно)" name="phone" value={formData.phone} onChange={handleChange} />
        </>
      )}

      <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      <Input label="Пароль" name="password" type="password" value={formData.password} onChange={handleChange} required />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 text-lg rounded-xl hover:bg-blue-700 transition mt-4"
      >
        {isLogin ? 'Войти' : 'Зарегистрироваться'}
      </button>

      <p className="text-sm text-center mt-6 text-gray-600">
        {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
        <button type="button" onClick={toggleMode} className="text-blue-600 hover:underline">
          {isLogin ? 'Регистрация' : 'Войти'}
        </button>
      </p>
    </form>
  </div>
);
};

export default Auth;
