import { useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig'; 
import { useAuth } from '../context/AuthContext'; 

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Nuevo estado de carga

    const navigate = useNavigate();
    const { login } = useAuth(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); // Bloqueamos el botón
        
        try {
            const response = await api.post('/auth/login', formData);
            
            // Si el backend devuelve el token
            if (response.data && response.data.token) {
                login(response.data.token);
                
                navigate('/'); 
            }
        } catch (err) {
            console.error(err);
            setError('Usuario o contraseña incorrectos.');
        } finally {
            setLoading(false); // Desbloqueamos el botón
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <Card style={{ width: '400px' }} className="shadow border-0">
                <Card.Body className="p-4">
                    <div className="text-center mb-4">
                        <span style={{fontSize: '3rem'}}>👤</span>
                        <h2 className="mt-2">Bienvenido</h2>
                        <p className="text-muted small">Ingresa tus credenciales para continuar</p>
                    </div>

                    {error && <Alert variant="danger">{error}</Alert>}
                    
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Ej: cliente"
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="********"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Button 
                            variant="primary" 
                            type="submit" 
                            className="w-100 mb-3"
                            disabled={loading} // Se deshabilita mientras carga
                        >
                            {loading ? 'Ingresando...' : 'Entrar'}
                        </Button>
                    </Form>

                    <div className="text-center">
                        <small>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></small>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;