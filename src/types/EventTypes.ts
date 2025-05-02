export interface EventGeneral {
  id?: number;
  name: string;
  type: EventType | undefined;
  location: string;
  address: string;
  durationType: 'no_duration' | 'duration' | 'multiple_days';
  startTime?: Date | string
  startDate?: Date | string;
  endTime?: Date | string | null;
  endDate?: Date | string | null;
  isPublished?: boolean; 

}

export interface PriceCategory {
  id?: number | string ;
  event_id?: number;
  name: string;
  price: number;
  description: string;
  totalLimit: number;
  limitPerOrder?: number|null;
  hasOrderLimit: boolean;

}

export interface CustomField {
  id?: number;
  event_id?: number;
  name: string;
  type: 'text' | 'number' | 'email' | 'date' | 'tel';
  required: boolean;
  priceCategoryIds: string[];
}

export interface Customization {
  contactInfo: {
    organizerName: string;
    phone: string;
    email: string;
  };
  description: {
    shortDescription: string;
    longDescription: string;
  };
  theme: {
    primaryColor: string;
  };
  images: {
    banner?: string;
    thumbnail?: string;
  };
  registrationInfo: string;
}

export interface EventType {
  id: number;
  name: string;
}

export interface WholeEventTicketting{
            eventGeneral: EventGeneral;
            priceCategory: PriceCategory[];
            customField: CustomField[];
            customization: Customization;
          }