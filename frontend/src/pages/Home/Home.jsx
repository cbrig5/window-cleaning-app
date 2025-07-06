import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import IntroBox from '../../components/IntroBox/IntroBox';
import Gallery from '../../components/Gallery/Gallery';
import './home.css';

const Home = () => (
  <div className="home-hero d-flex flex-column min-vh-100">
    <Container fluid className="flex-grow-1">
      <Row className="w-100 min-vh-100 align-items-center">
        <Col xs={12} md={6} lg={5} className="mx-auto mb-4 mb-md-0 d-flex justify-content-center form-move-up">
          <IntroBox />
        </Col>
        <Col xs={12} md={6} lg={7} className="d-none d-md-flex justify-content-center d-sm-none">
          <Gallery />
        </Col>
      </Row>
    </Container>
  </div>
);

export default Home;
