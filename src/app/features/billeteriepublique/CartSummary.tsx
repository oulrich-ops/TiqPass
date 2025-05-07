import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { SelectedTicket } from "./TicketingPublicView";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK || '');

type props = {
  tickets:SelectedTicket[];
  total:number;
}

export const CartSummary = ({ tickets, total }:props) => {

  const handlePay = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tickets),
    });

    const { sessionId } = await res.json();
    const stripe = await stripePromise;

    await stripe?.redirectToCheckout({ sessionId });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4 font-bold">Résumé de la commande</h2>
      {tickets.map(ticket => (
        <div key={ticket.categoryId}>
          {ticket.categoryName} x {ticket.quantity} = {ticket.quantity * ticket.price} €
        </div>
      ))}
      <hr className="my-2" />
      <div className="font-bold">Total : {total} €</div>
      <button onClick={handlePay} className="bg-green-600 text-white py-2 px-4 rounded mt-4">
        Payer
      </button>
    </div>
  );
};

export default CartSummary;