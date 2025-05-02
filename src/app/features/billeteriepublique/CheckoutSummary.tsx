interface Props {
    primaryColor: string;
  }
  
  export default function CheckoutSummary({ primaryColor }: Props) {
    return (
      <div className=" left-0 right-0 bg-white shadow p-4 flex flex-col gap-4 justify-between items-center ml-2">
        <div>
          <p className="text-sm">Total : <strong>XX FCFA</strong></p>
        </div>
        <button style={{ backgroundColor: primaryColor }} className="text-white py-2 px-4 rounded">
          Procéder au paiement
        </button>
      </div>
    );
  }

