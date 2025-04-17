import { Link } from 'react-router-dom';
import routes from "@/routes.ts";

function Tickets() {
    const tickets = [
        { id: '123', name: 'Bug Fix' },
        { id: '124', name: 'Feature Request' },
    ];

  return (
    <div>
      <h1>Tickets</h1>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            {/* Generate dynamic link */}
            <Link to={routes.ticketDetails(ticket.id)}>{ticket.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tickets;