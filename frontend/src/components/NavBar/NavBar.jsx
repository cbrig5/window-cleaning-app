import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" fixed="top">
      <Container>
        <Navbar.Brand className='fs-3' href="#home">Finer Details</Navbar.Brand>
        <Nav className="ms-auto py-4 fs-3 gap-5">
          <Nav.Link href="#services">Services</Nav.Link>
          <Nav.Link href="#gallery">Gallery</Nav.Link>
          <Nav.Link href="#booking">Book</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;

