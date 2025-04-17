export interface EventGeneral {
  name: string;
  type: string;
  location: string;
  address: string;
  durationType: 'no_duration' | 'duration' | 'multiple_days';
  startDate?: Date;
  endDate?: Date;
}

export interface PriceCategory {
  id: string;
  name: string;
  price: number;
  description: string;
  totalLimit: number;
  limitPerOrder?: number;
  hasOrderLimit: boolean;
}

export interface CustomField {
  id: string;
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
    short: string;
    long: string;
  };
  theme: {
    primaryColor: string;
  };
  images: {
    banner?: File;
    thumbnail?: File;
  };
  registrationInfo: string;
} 