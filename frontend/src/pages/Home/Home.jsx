import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import cleanerMan from '../../assets/window_clean_man.png';
import own_design_more_blur_bg from '../../assets/home_background.png';
import IntroBox from '../../components/IntroBox/IntroBox';

import './home.css';

const Home = () => {
  return (
    <Container fluid className="border border-danger">
        <Row >
            <Col className="p-0">
                <div className="position-relative vh-100">
                    <Image src={own_design_more_blur_bg} alt="foggy glass" fluid className='w-100 h-100'/>
                    <div className="position-absolute translate-middle-y"
                        style={{ left: '10%', top: '40%' }}>
                        <IntroBox />
                    </div>
                    <Image src={cleanerMan} alt="Cleaning Guy" fluid className="position-absolute bottom-0 end-0 cleaner-man"/>
                </div>
            </Col>
        </Row>
    </Container>
  )
}

export default Home
