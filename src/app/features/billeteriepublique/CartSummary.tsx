import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK || '');

export const CartSummary = ({ cart, priceCategory, total }: any) => {
  const checkout = async () => {
    const items = priceCategory.filter(cat => cart[cat.id]).map(cat => ({
      id: cat.id,
      quantity: cart[cat.id],
    }));

    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });

    const { url } = await res.json();
    const stripe = await stripePromise;
    stripe?.redirectToCheckout({ sessionId: url });
  };

  return (
    <div className="sticky bottom-0 bg-white p-4 shadow-xl border-t">
      <div className="flex justify-between items-center">
        <span>Total :</span>
        <span className="font-bold">{total.toLocaleString()} FCFA</span>
      </div>
      <button
        className="w-full mt-3 py-2 bg-primary text-white rounded-xl font-semibold"
        onClick={checkout}
      >
        Payer
      </button>
    </div>
  );
};
