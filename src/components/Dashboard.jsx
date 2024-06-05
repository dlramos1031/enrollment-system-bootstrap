import { NavLink } from 'react-router-dom';
import { useAuth } from '../services/authService';
import Admission from './Admission';
import Enrollment from './Enrollment';
import Profile from './Profile';
import { useState } from 'react';

function Dashboard() {
  const { logout } = useAuth();
  const [activeLink, setActiveLink] = useState('profile');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar vh-100">
          <div className="position-sticky pt-3">
            <ul className="nav flex-column">
              <li className="nav-item">
                <NavLink
                  to="/dashboard/profile"
                  className={`nav-link ${activeLink === 'profile' ? 'active' : ''}`}
                  onClick={() => handleLinkClick('profile')}
                >
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/dashboard/admission"
                  className={`nav-link ${activeLink === 'admission' ? 'active' : ''}`}
                  onClick={() => handleLinkClick('admission')}
                >
                  Application
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/dashboard/enrollment"
                  className={`nav-link ${activeLink === 'enrollment' ? 'active' : ''}`}
                  onClick={() => handleLinkClick('enrollment')}
                >
                  Enrollment
                </NavLink>
              </li>
            </ul>
            <button className="btn btn-outline-danger mt-auto" onClick={logout}>Logout</button>
          </div>
        </nav>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="pt-3">
            {activeLink === 'profile' && <Profile />}
            {activeLink === 'admission' && <Admission />}
            {activeLink === 'enrollment' && <Enrollment />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
