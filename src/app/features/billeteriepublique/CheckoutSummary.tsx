import { SelectedTicket } from "./TicketingPublicView";

interface Props {
    primaryColor: string;
    selectedTickets:SelectedTicket[];
    onProceed: () => void;

  }
  
  export default function CheckoutSummary({ primaryColor,selectedTickets,onProceed }: Props) {

    const total = selectedTickets.reduce(
      (sum, ticket) => sum + ticket.quantity * ticket.price,
      0
    );

    return (
      <div className=" left-0 right-0 bg-white shadow p-4 flex flex-col gap-4 justify-between items-center ml-2">
         <div>
      {selectedTickets.map((ticket) => (
        <div key={ticket.categoryId} className="flex flex-col justify-between">
          <span>{ticket.categoryName} x {ticket.quantity}</span>

        </div>
      ))}
      <hr className="my-4" />
      <div className="flex justify-between font-bold">
        <span>Total : </span>
        <span> {total.toFixed(2)} €</span>
      </div>
    </div>
        <button  style={{
    backgroundColor: total < 1 ? '#cccccc' : primaryColor,
    opacity: total < 1 ? 0.6 : 1
  }} className="text-white py-2 px-4 rounded"
                onClick={onProceed} 
                disabled={total < 1}>
          Finaliser 
        </button>
      </div>
    );
  }

