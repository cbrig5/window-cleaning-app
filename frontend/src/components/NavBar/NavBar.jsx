import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navBar.css';

function NavBar() {
  return (
    <Navbar bg='dark' fixed='top' data-bs-theme="dark" className='custom-navbar'>
      <Container fluid className="d-flex flex-column align-items-center py-3">
        <Navbar.Brand className='brand-title text-white mb-2' href="#home">
          Finer Details Window Cleaing Plus
        </Navbar.Brand>
        <Nav className="nav-links d-flex gap-4 justify-content-center">
          <Nav.Link href="#services" className='text-white small-nav'>Services</Nav.Link>
          <Nav.Link href="#gallery" className='text-white small-nav'>Gallery</Nav.Link>
          <Nav.Link href="#about" className='text-white small-nav'>About</Nav.Link>
          <Nav.Link href="#faq" className='text-white small-nav'>FAQ</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
