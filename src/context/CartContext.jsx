import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // 1. INICIALIZACIÓN: Intentamos leer del localStorage primero
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            return [];
        }
    });

    // 2. PERSISTENCIA: Cada vez que el carrito cambie, lo guardamos
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (libro) => {
        // Validación para no duplicar el mismo libro
        if (!cartItems.find(item => item.id === libro.id)) {
            setCartItems(prevItems => [...prevItems, libro]);
        }
    };

    const removeFromCart = (libroId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== libroId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((acc, item) => acc + (item.precio || 0), 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};