import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TicketDetails() {
  const { ticketId } = useParams(); // Get the ticket ID from the route
  const [ticket, setTicket] = useState<any>(null); // To store ticket details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch ticket details when the component mounts
  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await fetch(`/api/tickets/${ticketId}`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch ticket details');
        }
        const data = await response.json();
        setTicket(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketDetails();
  }, [ticketId]); // Re-run if ticketId changes

  // Handle Loading State
  if (loading) {
    return <p className="text-center">Loading ticket details...</p>;
  }

  // Handle Error State
  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  // If the ticket is null or couldn't be fetched
  if (!ticket) {
    return <p className="text-center">No ticket found!</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-md shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Ticket: {ticket.name}
      </h1>
      <p className="text-gray-600">
        <strong>Description:</strong> {ticket.description}
      </p>
      <p className="mt-2 text-gray-600">
        <strong>Status:</strong> {ticket.status}
      </p>
      <p className="mt-2 text-gray-600">
        <strong>Priority:</strong> {ticket.priority}
      </p>
      <p className="mt-2 text-gray-600">
        <strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleDateString()}
      </p>
      <p className="mt-2 text-gray-600">
        <strong>Assigned To:</strong> {ticket.assignedTo || 'Unassigned'}
      </p>
    </div>
  );
}

export default TicketDetails;