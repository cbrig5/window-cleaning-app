import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import publicWebsite from '../../publicWebsite';
import useAuthStatus from '../../hooks/useAuthStatus';
import { ACCESS_TOKEN } from '../../constants';
import website from '../../website';


const ContactForm = () => {
    const [availableServices, setAvailableServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [userData, setUserData] = useState(null);
    const isAuthorized = useAuthStatus();
    
    useEffect(() => {
        const fetchUserData = async () => {
            if (!isAuthorized) return;
    
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) return;
            try {
                const response = await website.get(`/api/user-info/`);
                setUserData(response.data);
            } catch (error) {
                console.error("There was an error fetching the user data!", error);
            }
        };
        fetchUserData();
    }, [isAuthorized]);
    
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await publicWebsite.get(`api/services/`);
                setAvailableServices(response.data);
            } catch (error) {
                console.error("There was an error fetching the services!", error);
            }
        };
        fetchServices();
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
                <Form.Control type="text" placeholder="John Smith" value={ userData ? `${userData.first_name} ${userData.last_name}` : ''} onChange={() => {}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlEmail" required >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com"  value={ userData ? `${userData.email}` : ''} onChange={() => {}} />
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