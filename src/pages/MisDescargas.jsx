import { useEffect, useState } from 'react';
import { Container, Card, Alert, Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';

const MisDescargas = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
    };

  
    const handleDownload = (titulo) => {
        alert(`📥 Iniciando descarga de: "${titulo}.pdf"...`);
    };

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await api.get('/pedidos/mis-descargas'); 
                setPedidos(response.data);
            } catch (err) {
                console.error("Error al cargar historial:", err);
                setError("No pudimos cargar tu historial. Verifica tu sesión.");
            } finally {
                setLoading(false);
            }
        };
        fetchPedidos();
    }, []);

    if (loading) return (
        <Container className="text-center mt-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2">Cargando tu biblioteca...</p>
        </Container>
    );

    if (error) return (
        <Container className="mt-5">
            <Alert variant="danger">{error}</Alert>
        </Container>
    );

    if (pedidos.length === 0) return (
        <Container className="text-center mt-5">
            <div style={{fontSize: '4rem'}}>📂</div>
            <h3 className="mt-3">Tu biblioteca está vacía</h3>
            <p className="text-muted">Aún no has realizado ninguna descarga.</p>
            <Button as={Link} to="/catalog" variant="primary" className="mt-2">Ir al Catálogo</Button>
        </Container>
    );

    return (
        <Container className="mt-4 mb-5">
            <h2 className="mb-4 fw-bold">📂 Mi Biblioteca y Pedidos</h2>
            
            {pedidos.map(pedido => (
                <Card key={pedido.id} className="mb-4 shadow-sm border-0">
                    <Card.Header className="d-flex justify-content-between align-items-center bg-light">
                        <div>
                            <strong>Pedido #{pedido.id}</strong>
                            <span className="text-muted ms-2">
                                • {new Date(pedido.fechaCompra).toLocaleDateString()}
                            </span>
                        </div>
                        <Badge bg="success">Pagado</Badge>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <Table responsive hover className="mb-0">
                            <thead className="bg-white text-secondary small">
                                <tr>
                                    <th className="ps-4">Libro</th>
                                    <th>Autor</th>
                                    <th>Precio</th>
                                    <th className="text-center">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedido.libros.map((libro, index) => (
                                    <tr key={`${pedido.id}-${index}`} className="align-middle">
                                        <td className="ps-4 fw-bold text-primary">
                                            📄 {libro.titulo}
                                        </td>
                                        <td>{libro.nombreAutor}</td>
                                        <td>{formatPrice(libro.precio)}</td>
                                        <td className="text-center">
                                            <Button 
                                                variant="outline-primary" 
                                                size="sm" 
                                                onClick={() => handleDownload(libro.titulo)}
                                            >
                                                ⬇ PDF
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer className="bg-white text-end">
                        <small className="text-muted me-2">Total del pedido:</small>
                        <strong className="fs-5 text-dark">{formatPrice(pedido.total)}</strong>
                    </Card.Footer>
                </Card>
            ))}
        </Container>
    );
};

export default MisDescargas;