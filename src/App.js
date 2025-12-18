import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; 
import Navigation from './components/Navigation.jsx'; 
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.css';

import Landing from './pages/Landing.jsx'; 
import Home from './pages/Home.jsx';       
import Login from './pages/Login.jsx'; 
import Register from './pages/Register.jsx'; 
import MisDescargas from './pages/MisDescargas.jsx';
import Cart from './pages/Cart.jsx'; 


function App() {
  return (
   
    <AuthProvider>
    <CartProvider> 
      <BrowserRouter> {/* Componente Router */}
        <Navigation />
        <div className="container mt-4"> 
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<Landing />} /> 
            <Route path="/catalog" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Rutas Protegidas (Requieren Token) */}
            <Route 
              path="/cart" 
              element={<ProtectedRoute><Cart /></ProtectedRoute>} 
            />
            <Route 
              path="/mis-descargas" 
              element={<ProtectedRoute><MisDescargas /></ProtectedRoute>} 
            />
             {/* Redireccionamiento de cualquier URL desconocida a la Landing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;