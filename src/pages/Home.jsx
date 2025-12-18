import { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Form, FormControl, Alert, Badge } from 'react-bootstrap';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Home = () => {
    // Lista maestra de libros cargados una sola vez
    const [librosMaestros, setLibrosMaestros] = useState([]); 
    // Lista de libros que se muestra en la interfaz (filtrada)
    const [librosMostrados, setLibrosMostrados] = useState([]); 
    const [categorias, setCategorias] = useState([]);
    
    // Estados de Filtros
    const [busqueda, setBusqueda] = useState('');
    const [filtroCategoriaNombre, setFiltroCategoriaNombre] = useState(''); 
    
    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart();
    const [mensaje, setMensaje] = useState(null); 

    const formatPrice = (price) => {
        if (price === undefined || price === null) return '0.00';
        const num = parseFloat(price.toString());
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);
    }
    
    // --- FUNCIÓN DE FILTRADO ---
    const aplicarFiltros = useCallback(() => {
        let resultado = librosMaestros;

        // 1. Filtrar por Categoría (Usando el Nombre)
        if (filtroCategoriaNombre) {
            resultado = resultado.filter(libro => {
                const libroCatName = (libro.categoria && typeof libro.categoria === 'object' 
                    ? libro.categoria.nombre 
                    : libro.categoria
                );
                return libroCatName === filtroCategoriaNombre;
            });
        } 
        
        // 2. Filtrar por Búsqueda
        if (busqueda) {
            const texto = busqueda.toLowerCase();
            resultado = resultado.filter(libro => 
                libro.titulo.toLowerCase().includes(texto) ||
                libro.nombreAutor.toLowerCase().includes(texto)
            );
        }
        
        setLibrosMostrados(resultado);

    }, [filtroCategoriaNombre, busqueda, librosMaestros]);

    // --- EFECTO 1: Carga Inicial ---
    useEffect(() => {
        const initialLoad = async () => {
            try {
                const [resCat, resLibros] = await Promise.all([
                    api.get('/categorias'),
                    api.get('/libros')
                ]);

                setCategorias(resCat.data);
                setLibrosMaestros(resLibros.data); 
                setLibrosMostrados(resLibros.data); 
                
            } catch (error) {
                console.error("Error cargando catálogo:", error);
                setMensaje({ type: 'danger', text: 'Error de conexión con el servidor.' });
            }
        };
        initialLoad();
    }, []);

    // --- EFECTO 2: Aplicar Filtros ---
    useEffect(() => {
        aplicarFiltros();
    }, [aplicarFiltros]);


    // LÓGICA DE AGREGAR AL CARRITO
    const handleAddToCart = (libro) => {
        if (isAuthenticated) {
            addToCart(libro); 
            setMensaje({ type: 'success', text: `Agregado: ${libro.titulo}` });
            // Ocultar mensaje automáticamente después de 2 segundos
            setTimeout(() => setMensaje(null), 2000);
        } else {
            setMensaje({ type: 'warning', text: '🔒 Debes iniciar sesión para comprar.' });
        }
    };


    return (
        <Container className="mt-4 mb-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold display-5">Catálogo de Libros</h1>
                <p className="text-muted">Encuentra tu próxima lectura favorita</p>
            </div>
            
            {/* Mensaje Flotante */}
            {mensaje && (
                <Alert variant={mensaje.type} onClose={() => setMensaje(null)} dismissible className="fixed-top m-3 shadow mx-auto" style={{zIndex: 9999, maxWidth: '500px'}}>
                    {mensaje.text}
                </Alert>
            )}

            {/* BARRA DE FILTROS Y BÚSQUEDA */}
            <Row className="mb-4 gx-3">
                <Col md={5} className="mb-2">
                    <FormControl
                        type="search"
                        placeholder="🔎 Buscar por título o autor..."
                        value={busqueda}
                        onChange={(e) => {
                            setBusqueda(e.target.value); 
                            setFiltroCategoriaNombre('');
                        }}
                    />
                </Col>
                <Col md={4} className="mb-2">
                    <Form.Select 
                        value={filtroCategoriaNombre} 
                        onChange={(e) => {
                            setFiltroCategoriaNombre(e.target.value); 
                            setBusqueda('');
                        }}
                        style={{cursor: 'pointer'}}
                    >
                        <option value="">📚 Todas las categorías</option>
                        {categorias.map(cat => (
                            <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={3}>
                     <Button 
                        variant="outline-secondary" 
                        className="w-100"
                        onClick={() => {setBusqueda(''); setFiltroCategoriaNombre('');}}
                    >
                        Limpiar Filtros
                    </Button>
                </Col>
            </Row>

            {/* LISTADO DE RESULTADOS */}
            <Row>
                {librosMostrados.length === 0 && (busqueda || filtroCategoriaNombre) ? (
                    <Col className="text-center py-5">
                        <div style={{fontSize: '3rem'}}>😕</div>
                        <h4>No encontramos libros que coincidan</h4>
                        <Button variant="link" onClick={() => {setBusqueda(''); setFiltroCategoriaNombre('');}}>Limpiar filtros</Button>
                    </Col>
                ) : (
                    librosMostrados.map((libro) => (
                        <Col key={libro.id} md={6} lg={4} xl={3} className="mb-4">
                            <Card className="h-100 shadow-sm border-0 hover-effect">
                                {/* IMAGEN: Placeholder con Gradiente */}
                                <div 
                                    className="d-flex align-items-center justify-content-center text-white" 
                                    style={{
                                        height: '200px', 
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                    }}
                                >
                                    <span style={{fontSize: '4rem'}}>📖</span>
                                </div>

                                <Card.Body className="d-flex flex-column">
                                    <div className="mb-2">
                                        <Badge bg="light" text="dark" className="border">
                                            {typeof libro.categoria === 'object' ? libro.categoria.nombre : libro.categoria}
                                        </Badge>
                                    </div>
                                    
                                    <Card.Title className="text-truncate fw-bold" title={libro.titulo}>
                                        {libro.titulo}
                                    </Card.Title>
                                    <Card.Subtitle className="mb-3 text-muted small">
                                        {libro.nombreAutor} • {libro.anioPublicacion}
                                    </Card.Subtitle>
                                    
                                    <div className="mt-auto">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span className="fs-4 fw-bold text-primary">
                                                {formatPrice(libro.precio)}
                                            </span>
                                        </div>
                                        
                                        <Button 
                                            variant={isAuthenticated ? "primary" : "outline-primary"} 
                                            className="w-100 rounded-pill"
                                            onClick={() => handleAddToCart(libro)}
                                        >
                                            {isAuthenticated ? '🛒 Agregar' : 'Inicia Sesión para Comprar'}
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
};

export default Home;