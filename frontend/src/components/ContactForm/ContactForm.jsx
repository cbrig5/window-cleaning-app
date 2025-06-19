import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';



const ContactForm = () => {
    const [availableServices, setAvailableServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const api = import.meta.env.VITE_API_BASE_URL;
    useEffect(() => {
        axios.get(`${api}/api/services/`)
            .then(response => {
                setAvailableServices(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the services!", error);
            });
    }, []);
     const toggleService = (label) => {
         setSelectedServices(prev =>
            prev.includes(label)
            ? prev.filter(item => item !== label) // unselect
            : [...prev, label]                   // select
        );
    };
    const isOtherSelected = selectedServices.includes("Other");
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
                {availableServices.map(service => (
                    <Button
                        key={service.id}
                        variant={selectedServices.includes(service.label) ? "primary" : "outline-primary"}
                        onClick={() => toggleService(service.label)}
                        size="md"
                        >
                        {service.label}
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