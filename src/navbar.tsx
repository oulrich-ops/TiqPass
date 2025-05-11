import { Link } from 'react-router-dom';
import routes from './config/routes';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to={routes.home}>Home</Link></li>
        <li><Link to={routes.login}>Login</Link></li>
        <li><Link to={routes.dashboard}>Dashboard</Link></li>
        <li><Link to={routes.tickets}>Tickets</Link></li>
        <li><Link to={routes.userSettings}>Settings</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;