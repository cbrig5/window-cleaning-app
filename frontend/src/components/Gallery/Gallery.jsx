import Carousel from 'react-bootstrap/Carousel';
import img1 from '../../assets/gallery_placeholder.jpg';
import './Gallery.css';

const Gallery = () => (
  <div className="ratio ratio-4x3 gallery-ratio">
    <Carousel fade interval={4000} className="gallery-carousel h-100">
      <Carousel.Item>
        <img
          className="d-block w-100 gallery-img"
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>Spotless Results</h5>
          <p>See the difference a professional clean makes!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 gallery-img"
          src={img1}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Attention to Detail</h5>
          <p>We treat every window like our own.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 gallery-img"
          src={img1}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Happy Customers</h5>
          <p>Our clients love the results!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </div>
);

export default Gallery; 