import { useState } from 'react';
import TicketSelector from './TicketSelector';
import { PriceCategory } from '@/types/EventTypes';

interface Props {
  registrationInfo: string;
  priceCategories: PriceCategory[] | undefined;
  customFields: any[]
}

export default function Tabs({ registrationInfo, priceCategories,customFields }: Props) {
  const [tab, setTab] = useState<'desc' | 'tickets' | 'info'>('desc');

  return (
    <div className="p-4">
      <div className="flex justify-center gap-4 mb-4">
        <button onClick={() => setTab('desc')}  className={`px-3 py-1 rounded font-semibold ${
    tab === 'desc' ? 'text-white' : 'text-[var(--primary-color)]'
  }`}
  
>🎫 Billets</button>
        <button onClick={() => setTab('info')}  className={`px-3 py-1 rounded font-semibold ${
    tab === 'desc' ? 'text-white' : 'text-[var(--primary-color)]'
  }`}
  style={tab === 'desc' ? { backgroundColor: 'var(--primary-color)' } : {}}
 >ℹ️ Infos utiles</button>
      </div>
     
      {tab === 'tickets' && }
      {tab === 'info' && <div><p>{registrationInfo}</p></div>}
    </div>
  );
}