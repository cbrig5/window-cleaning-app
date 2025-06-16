import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const SERVICES = [
  "Window Cleaning",
  "Gutter Cleaning",
  "Pressure Washing",
  "Commercial Services",
  "Other"
];

const ContactForm = () => {
    const [selectedServices, setSelectedServices] = useState([]);

    const handleServiceChange = (e) => {
        const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
        setSelectedServices(options);
     };
    const isOtherSelected = selectedServices.includes("Other");

    const toggleService = (service) => {
        setSelectedServices(prev =>
            prev.includes(service)
            ? prev.filter(item => item !== service) // unselect
            : [...prev, service]                   // select
        );
    };
    const oneWeekFromToday = new Date();
    oneWeekFromToday.setDate(oneWeekFromToday.getDate() + 7);
    const formattedDate = oneWeekFromToday.toISOString().split('T')[0];

    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlName" required>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="John Smith" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlEmail" required>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.CotnrolDate" required>
                <Form.Label>Prefered Date</Form.Label>
                <Form.Control type="date"  defaultValue={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlService">
                <Form.Label>Select Services</Form.Label>
                <div className="d-flex flex-wrap gap-2">
                {SERVICES.map(service => (
                    <Button
                        key={service}
                        variant={selectedServices.includes(service) ? "primary" : "outline-primary"}
                        onClick={() => toggleService(service)}
                        size="md"
                        >
                        {service}
                    </Button>
                ))}
                </div>
            </Form.Group>
            {isOtherSelected && (
                <Form.Group className="mb-3" controlId="exampleForm.ControlOtherService">
                <Form.Label>If "Other": What kind of service are you looking for?</Form.Label>
                <Form.Control as="textarea" rows={3} />
                </Form.Group>
            )}
            <div className="d-grid">
                <Button type="submit" size="lg" variant="primary">Contact Us</Button>
            </div>
        </Form>

    )
}

export default ContactForm