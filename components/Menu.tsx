import useSWR from 'swr';
import { AuthService } from '../services/API';

const authService = new AuthService();
export const Menu = (): JSX.Element => {
  async function onLogout() {
    await authService.logout();
  }

  const { data: session = {} } = useSWR(
    'session',
    () => authService.getSession().then((data) => data),
  );

  if (!session) return <div />;
  return (
    <div>
      <span>Menu pendiente</span>
    </div>
    // <Navbar bg="light" expand="lg">
    //   <Container>
    //     <Navbar.Brand href="/dashboard">Tablero</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link href="/users">Usuarios</Nav.Link>
    //         <Nav.Link href="/products">Productos</Nav.Link>
    //         <Nav.Link onClick={onLogout} href="/auth/login">Salir</Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
};

export default Menu;
