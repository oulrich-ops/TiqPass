import { CustomField, PriceCategory } from "@/types/EventTypes";
import { useState } from "react";

type Props = {
  priceCategories: PriceCategory[];
  customFields: any[];
  quantities: { [key: string]: number };
  setQuantities: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;

};

 const TicketSelector:React.FC<Props>  = ({customFields,priceCategories,quantities, setQuantities })=> {
  
    const [formValues, setFormValues] = useState<Record<string, any>>({});
  
    const handleChange = (id: string, delta: number) => {
      setQuantities((prev) => {
        const newVal = Math.max(0, (prev[id] || 0) + delta);
        return { ...prev, [id]: newVal };
      });
    };
  
    const handleFieldChange = (fieldName: string, value: any) => {
      setFormValues(prev => ({ ...prev, [fieldName]: value }));
    };
  
    return (
      <div id="billets" className="space-y-6">
        {priceCategories?.map(cat => {
          const fieldsForCat = customFields.filter(field =>
            field.priceCategoryIds.includes(cat.id!.toString())
          );
  
          return (
            <div key={cat.id} className="border-b pb-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-semibold">{cat.name}</p>
                  <p className="text-sm text-gray-600">{cat.description}</p>
                  <p className="text-lg font-bold">{cat.price} €</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleChange(cat.id!.toString(), -1)} style={{ color: 'var(--primary-color)' }}>-</button>
                  <span>{quantities[cat.id!.toString()] || 0}</span>
                  <button onClick={() => handleChange(cat.id!.toString(), 1)} style={{ color: 'var(--primary-color)' }}>+</button>
                </div>
              </div>
  
              {/* Champs personnalisés */}
              {quantities[cat.id!.toString()] > 0 && fieldsForCat.length > 0 && (
                <div className="mt-4 space-y-2">
                  {fieldsForCat.map(field => (
                    <div key={field.id}>
                      <label className="block font-medium mb-1">{field.name}{field.required && '*'}</label>
                      <input
                        type={field.type}
                        required={field.required}
                        value={formValues[field.name] || ''}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
  
  export default TicketSelector;