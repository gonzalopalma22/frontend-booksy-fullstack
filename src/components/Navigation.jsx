import { Navbar, Nav, Container, Badge, Dropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
// IMPORTAMOS LOS ICONOS PROFESIONALES DESDE AQUÍ:
import { FaShoppingCart, FaUserCircle, FaBookOpen, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Navigation = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    
    const nombreMostrado = user?.username || user?.name || "Gonzalo";

    return (
        <Navbar expand="lg" className="navbar-custom sticky-top py-3 shadow-sm">
            <Container>
                
                <Navbar.Brand as={Link} to="/" className="brand-text d-flex align-items-center gap-2">
                    <FaBookOpen size={28} color="#2c3e50" />
                    <span className="fw-bold tracking-tight" style={{color: '#2c3e50'}}>Booksy SPA</span>
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto ms-lg-4">
                        <Nav.Link as={Link} to="/" className="fw-semibold text-secondary">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/catalog" className="fw-semibold text-secondary">Catálogo</Nav.Link>
                        {isAuthenticated && (
                            <Nav.Link as={Link} to="/mis-descargas" className="fw-semibold text-primary">
                                Mi Biblioteca
                            </Nav.Link>
                        )}
                    </Nav>

                    <Nav className="align-items-center gap-3 mt-3 mt-lg-0">
                        {isAuthenticated ? (
                            <>
                                {/* CESTA ESTILIZADA */}
                                <Nav.Link as={Link} to="/cart" className="position-relative btn-cart-custom d-flex align-items-center">
                                    <FaShoppingCart size={20} className="me-2" />
                                    <span className="fw-bold">Cesta</span>
                                    {cartItems.length > 0 && (
                                        <Badge bg="danger" pill className="ms-2 shadow-sm">
                                            {cartItems.length}
                                        </Badge>
                                    )}
                                </Nav.Link>

                                <div className="vr d-none d-lg-block mx-2 bg-secondary opacity-25"></div>

                                {/* USUARIO (Dropdown con nombre real) */}
                                <Dropdown align="end">
                                    <Dropdown.Toggle variant="transparent" className="d-flex align-items-center text-decoration-none border-0 p-0 dropdown-toggle-custom">
                                        <FaUserCircle size={28} className="text-secondary me-2" />
                                        <span className="fw-bold text-dark d-none d-md-block">
                                            {/* AQUI ESTA EL CAMBIO: Muestra el nombre real o Gonzalo */}
                                            {nombreMostrado}
                                        </span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="shadow-lg border-0 mt-3 p-2 rounded-3">
                                        <small className="text-muted px-3 py-2 d-block">
                                            Conectado como <strong>{nombreMostrado}</strong>
                                        </small>
                                        <Dropdown.Divider />
                                        <Dropdown.Item as={Link} to="/mis-descargas" className="rounded-2">
                                            <FaBookOpen className="me-2" /> Mis Libros
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={handleLogout} className="text-danger rounded-2 mt-1">
                                            <FaSignOutAlt className="me-2" /> Cerrar Sesión
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        ) : (
                            <div className="d-flex gap-2">
                                <Button as={Link} to="/login" variant="outline-dark" className="rounded-pill px-4 d-flex align-items-center">
                                    <FaSignInAlt className="me-2" /> Ingresar
                                </Button>
                                <Button as={Link} to="/register" variant="dark" className="rounded-pill px-4 d-flex align-items-center">
                                    <FaUserPlus className="me-2" /> Registro
                                </Button>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
