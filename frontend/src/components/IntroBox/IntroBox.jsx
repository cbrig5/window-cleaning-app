import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ContactForm from '../ContactForm/ContactForm';
import './introBox.css';


const IntroBox = () => {
  return (
    <div className="card-section">
        <Card className="shadow-lg frosted-glass" style={{ maxWidth: '500px', width: '100%' }}>
            <Card.Body>
                <Card.Title className="fw-bold fs-4">The Finer Details Matter</Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted">Clean is our thing</Card.Subtitle> */}
                <Card.Text>
                    We would love a chance to earn your business.
                    <br />
                    <br />
                    Please fill out the form below to get in touch with us.
                </Card.Text>

                <ContactForm />
            </Card.Body>
        </Card>
    </div>
  )
}

export default IntroBox