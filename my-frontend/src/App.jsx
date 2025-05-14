import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Products from './pages/Products';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
    <Header /> 
      <Routes>
         <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
