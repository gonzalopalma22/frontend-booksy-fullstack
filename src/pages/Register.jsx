import { useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    // Estado para los datos del formulario
    const [formData, setFormData] = useState({ 
        username: '', 
        password: '',
        email: '',
        nombreCompleto: '' 
    });
    
    // Estados para manejo de errores y carga
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Hooks de navegación y autenticación
    const navigate = useNavigate();
    const { login } = useAuth(); 

    // Manejador de cambios en los inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            // 1. Enviamos los datos al backend
            const response = await api.post('/auth/register', formData);
            
            // 2. Verificamos si el backend devolvió el token (Auto-Login)
            if (response.data && response.data.token) {
                // Iniciamos sesión en el contexto
                login(response.data.token);
             
                // Redirigimos al catálogo
                navigate('/'); 
            } else {
                // Si por alguna razón no hay token, mandamos al login
                navigate('/login');
            }
            
        } catch (err) {
            console.error(err);
            // Mensaje de error amigable
            const errorMsg = err.response?.data?.message || 'Error al registrar. El usuario o email ya podrían existir.';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <Card style={{ width: '500px' }} className="shadow-sm">
                <Card.Body className="p-4">
                    <h2 className="text-center mb-4 text-primary">Crear Cuenta</h2>
                    
                    {error && <Alert variant="danger">{error}</Alert>}
                    
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre Completo</Form.Label>
                            <Form.Control 
                                name="nombreCompleto" 
                                type="text" 
                                placeholder="Juan Pérez"
                                value={formData.nombreCompleto}
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                name="email" 
                                type="email" 
                                placeholder="juan@ejemplo.com"
                                value={formData.email}
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Usuario (Login)</Form.Label>
                            <Form.Control 
                                name="username" 
                                type="text" 
                                placeholder="juanperez"
                                value={formData.username}
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-4">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control 
                                name="password" 
                                type="password" 
                                placeholder="********"
                                value={formData.password}
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit" className="w-100 mb-3" disabled={loading}>
                            {loading ? 'Registrando...' : 'Registrarme'}
                        </Button>
                        
                        <div className="text-center">
                            <small>¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link></small>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Register;