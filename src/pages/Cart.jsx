import { Container, Card, Row, Col, ListGroup, Button, Alert} from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart, cartTotal } = useCart();
    const { isAuthenticated } = useAuth();
    const [mensaje, setMensaje] = useState(null);
    const [loading, setLoading] = useState(false);

    // Función auxiliar para moneda (CLP) - Misma que en Home.jsx
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
    };

    const handlePurchase = async () => {
        if (!isAuthenticated) {
            setMensaje({ type: 'warning', text: '🔒 Debes iniciar sesión para completar la descarga.' });
            return;
        }

        if (cartItems.length === 0) {
            setMensaje({ type: 'warning', text: 'El carrito está vacío.' });
            return;
        }

        setLoading(true);
        setMensaje(null);

        try {
            // Creamos el array de IDs para enviar al backend
            const librosIds = cartItems.map(item => item.id);

            // 1. Llamada al endpoint protegido
            const response = await api.post('/pedidos/descargar', { librosIds });

            // 2. Si es exitoso, vaciamos el carrito
            clearCart();
            setMensaje({ type: 'success', text: `¡Éxito! Has adquirido ${response.data.libros?.length || librosIds.length} libros. Revisa "Mis Descargas".` });

        } catch (error) {
            console.error(error);
            const errorMsg = error.response?.data?.message || 'Hubo un error al procesar la solicitud.';
            setMensaje({ type: 'danger', text: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    // --- VISTA CUANDO EL CARRITO ESTÁ VACÍO ---
    if (cartItems.length === 0 && !mensaje) {
        return (
            <Container className="text-center mt-5">
                <div style={{fontSize: '5rem'}}>🛒</div>
                <h3 className="mt-3">Tu cesta está vacía</h3>
                <p className="text-muted">Parece que aún no has agregado libros.</p>
                <Button as={Link} to="/catalog" variant="primary" className="mt-3 px-5 rounded-pill">
                    Ir al Catálogo
                </Button>
            </Container>
        );
    }

    // --- VISTA PRINCIPAL ---
    return (
        <Container className="mt-4 mb-5">
            <h2 className="mb-4 fw-bold">Cesta de Descarga ({cartItems.length})</h2>

            {mensaje && (
                <Alert variant={mensaje.type} onClose={() => setMensaje(null)} dismissible className="shadow-sm">
                    {mensaje.text}
                </Alert>
            )}

            {/* Solo mostramos el contenido si hay items o hubo un mensaje de éxito/error reciente */}
            {(cartItems.length > 0 || mensaje) && (
                <Row>
                    <Col md={8}>
                        <Card className="shadow-sm border-0 mb-3">
                            <ListGroup variant="flush">
                                {cartItems.map(item => (
                                    <ListGroup.Item key={item.id} className="p-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <div className="bg-light rounded d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                                                    📘
                                                </div>
                                                <div>
                                                    <h6 className="mb-0 fw-bold">{item.titulo}</h6>
                                                    <small className="text-muted">{item.nombreAutor}</small>
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                <div className="fw-bold text-primary mb-1">{formatPrice(item.precio)}</div>
                                                <Button 
                                                    variant="link" 
                                                    className="text-danger p-0 text-decoration-none" 
                                                    size="sm" 
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    Eliminar
                                                </Button>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            {cartItems.length === 0 && mensaje?.type === 'success' && (
                                <div className="p-4 text-center text-muted">
                                    <small>El carrito se ha vaciado tras la compra.</small>
                                </div>
                            )}
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="shadow-sm border-0 bg-light">
                            <Card.Body className="p-4">
                                <Card.Title className="mb-4">Resumen</Card.Title>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Libros:</span>
                                    <span>{cartItems.length}</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mb-4">
                                    <span className="h5">Total:</span>
                                    <span className="h5 fw-bold text-success">{formatPrice(cartTotal)}</span>
                                </div>

                                <Button 
                                    variant="success" 
                                    size="lg"
                                    className="w-100 mb-2" 
                                    onClick={handlePurchase}
                                    disabled={loading || cartItems.length === 0}
                                >
                                    {loading ? 'Procesando...' : 'Confirmar Descarga'}
                                </Button>
                                <Button 
                                    variant="outline-secondary" 
                                    className="w-100" 
                                    onClick={clearCart}
                                    disabled={cartItems.length === 0}
                                >
                                    Vaciar Cesta
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Cart;