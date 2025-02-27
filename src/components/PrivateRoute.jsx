import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/authService';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
