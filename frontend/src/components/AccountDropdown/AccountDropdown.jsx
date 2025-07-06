import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import useAuthStatus from '../../hooks/useAuthStatus';


const AccountDropdown = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const isAuthorized = useAuthStatus();
    return (
        <DropdownButton
            id="account-dropdown"
            title={<FontAwesomeIcon icon={faCircleUser} />}
            show={showDropdown}
            onToggle={(isOpen) => setShowDropdown(isOpen)}
            variant="secondary"
        >
            <div className="px-3 py-2">
                {!isAuthorized  ? (
                    <>
                        <Nav.Link as={Link} to="/signup">
                            <Button vartiant="primary" className='w-100'>
                                Create Account
                            </Button>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/login">
                            <Button variant="outline-primary" className='w-100 mt-2'>
                                Sign In
                            </Button>
                        </Nav.Link>
                    </>
                )  : (
                    <>
                        <Dropdown.Item as={Link} to="#">
                            My Profile
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/logout">
                            Logout
                        </Dropdown.Item>
                    </>
                )
            }
            </div>
        </DropdownButton>
    )
}

export default AccountDropdown
