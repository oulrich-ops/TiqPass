import { Customization, EventGeneral } from "@/types/EventTypes";

interface Props {
  primaryColor: string;
  event: EventGeneral;
  customization: Customization;
}

export default function HeroBanner({ event, customization,primaryColor }: Props) {
    return (
      <div className="relative h-96">
        <img
          src={customization.images.banner || '/default-banner.jpg'}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30 flex items-center justify-center">
          <div className="text-white text-center max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.name}</h1>
            <a 
              href="#tickets" 
              className="mt-6 inline-block bg-white text-gray-900 py-3 px-8 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-lg"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              Réserver maintenant
            </a>
          </div>
        </div>
      </div>
    );
  }