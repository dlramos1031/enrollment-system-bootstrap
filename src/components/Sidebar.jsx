import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/authService';
import { ListGroup, Button } from 'react-bootstrap';

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <NavLink to="/dashboard/admission" className="nav-link">Admission</NavLink>
      </ListGroup.Item>
      <ListGroup.Item>
        <NavLink to="/dashboard/enrollment" className="nav-link">Enrollment</NavLink>
      </ListGroup.Item>
      <ListGroup.Item>
        <NavLink to="/dashboard/profile" className="nav-link">Profile</NavLink>
      </ListGroup.Item>
      <ListGroup.Item>
        <Button variant="link" onClick={handleLogout} className="nav-link">Logout</Button>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default Sidebar;
