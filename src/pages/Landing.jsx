// src/pages/Landing.jsx

import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Container className="mt-5 text-center">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-lg p-5">
                        <h1 className="display-4 fw-bold text-primary mb-4">
                            Bienvenido a Booksy 📚
                        </h1>
                        <p className="lead mb-4">
                            Tu portal exclusivo para comprar y descargar libros electrónicos.
                        </p>
                        
                        {isAuthenticated ? (
                            // Si está autenticado, redirigir al catálogo
                            <div className="mt-4">
                                <p className="mb-3 fs-5">¡Tu sesión está activa! Explora el catálogo o tu biblioteca.</p>
                                <Button 
                                    as={Link} 
                                    to="/catalog" 
                                    variant="success" 
                                    size="lg" 
                                    className="mx-2"
                                >
                                    Ver Catálogo
                                </Button>
                                <Button 
                                    as={Link} 
                                    to="/mis-descargas" 
                                    variant="secondary" 
                                    size="lg" 
                                    className="mx-2"
                                >
                                    Mi Biblioteca
                                </Button>
                            </div>
                        ) : (
                            // Si NO está autenticado, mostrar Login/Registro
                            <div className="mt-4">
                                <p className="mb-3 fs-5">Inicia sesión o regístrate para acceder a nuestra colección.</p>
                                <Button 
                                    as={Link} 
                                    to="/login" 
                                    variant="primary" 
                                    size="lg" 
                                    className="mx-2"
                                >
                                    Iniciar Sesión
                                </Button>
                                <Button 
                                    as={Link} 
                                    to="/register" 
                                    variant="outline-primary" 
                                    size="lg" 
                                    className="mx-2"
                                >
                                    Registrarse
                                </Button>
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Landing;