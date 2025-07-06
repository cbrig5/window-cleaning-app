import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AccountDropdown from '../AccountDropdown/AccountDropdown';
import logo from '../../assets/logo.png';
import useAuthStatus from '../../hooks/useAuthStatus';
import './navBar.css';

function NavBar() {
  const isAuthorized = useAuthStatus();

  return (
  <Navbar bg='dark' fixed='top' data-bs-theme="dark" className='custom-navbar py-0' style={{ height: '160px' }}>
    <Container fluid className="h-100 position-relative">
      <div className="position-absolute top-50 start-15 translate-middle-y">
        <img src={logo} alt="Logo" style={{ maxHeight: '115px', height: 'auto', width: 'auto' }} />
      </div>
      <div className="mx-auto d-flex flex-column align-items-center justify-content-center text-center" style={{ maxWidth: '900px' }}>
        <Navbar.Brand className='text-white fw-bold mb-2 fs-2'>
          Finer Details Window Cleaning Plus
        </Navbar.Brand>
        <Nav className="d-flex justify-content-center align-items-center gap-4 flex-wrap">
          <Nav.Link href="#services" className='text-white big-nav'>Services</Nav.Link>
          <Nav.Link href="gallery" className='text-white big-nav'>Gallery</Nav.Link>
          <Nav.Link href="#about" className='text-white big-nav'>About</Nav.Link>
          <Nav.Link href="#faq" className='text-white big-nav'>FAQ</Nav.Link>
          { isAuthorized &&
          <Nav.Link href="#invoices" className='text-white big-nav'>My Invoices</Nav.Link>
          }
          <AccountDropdown />
        </Nav>
      </div>

    </Container>
  </Navbar>







  );
}

export default NavBar;
