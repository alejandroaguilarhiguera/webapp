import { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { AuthService } from '../services/API';

const authService = new AuthService();
export const Menu = (): JSX.Element => {
  async function onLogout() {
    await authService.logout();
  }

  const [user, setUser] = useState(null);

  useEffect(() => {
    authService.getSession().then((session) => {
      setUser(session.user);
    }).catch((error) => {
      console.log({ error });
    });
  });
  if (!user) return <div />;
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/dashboard">Tablero</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/users">Usuarios</Nav.Link>
            <Nav.Link href="/products">Productos</Nav.Link>
            <Nav.Link onClick={onLogout} href="/auth/login">Salir</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
