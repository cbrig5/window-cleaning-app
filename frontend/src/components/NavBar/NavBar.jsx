import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AccountDropdown from '../AccountDropdown/AccountDropdown';
import logo from '../../assets/logo.png';
import useAuthStatus from '../../hooks/useAuthStatus';
import './navBar.css';

function NavBar() {
  const isAuthorized = useAuthStatus();

  return (
    <Navbar bg='dark' expand='md' fixed='top' data-bs-theme="dark" className='custom-navbar py-2 py-md-3'>
      <Container fluid>
        <Row className="w-100 align-items-center flex-nowrap">
          <Col xs="auto" className="d-flex align-items-center">
            <Navbar.Brand href="/" className="m-0 p-0">
              <img src={logo} alt="Logo" className="navbar-logo" style={{ maxHeight: '80px', height: 'auto', width: 'auto' }} />
            </Navbar.Brand>
          </Col>
          <Col className="text-center">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <span className='text-white fw-bold fs-5 mb-1'>Finer Details Window Cleaning Plus</span>
              <Navbar.Toggle aria-controls="main-navbar-nav" className="mx-auto mb-2 d-md-none" />
              <Navbar.Collapse id="main-navbar-nav">
                <Nav className="justify-content-center align-items-center gap-2 gap-md-4 flex-wrap">
                  <Nav.Link href="#services" className='text-white small-nav'>Services</Nav.Link>
                  <Nav.Link href="#about" className='text-white small-nav'>About</Nav.Link>
                  <Nav.Link href="#faq" className='text-white small-nav'>FAQ</Nav.Link>
                  { isAuthorized &&
                    <Nav.Link href="#invoices" className='text-white small-nav'>My Invoices</Nav.Link>
                  }
                  <AccountDropdown />
                </Nav>
              </Navbar.Collapse>
            </div>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default NavBar;
