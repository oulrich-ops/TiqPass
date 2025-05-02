import { EventGeneral } from "@/types/EventTypes";

export default function EventInfos({ event,primaryColor }: { event: EventGeneral,primaryColor:string }) {
  return (
    <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center bg-white rounded-lg shadow-md p-4 px-6">
            <div className="rounded-full bg-blue-50 p-3 mr-4" style={{ backgroundColor: `${primaryColor}20` }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" style={{ color: primaryColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Lieu</p>
              <p className="font-medium">{event.location}</p>
            </div>
          </div>
          
          <div className="flex items-center bg-white rounded-lg shadow-md p-4 px-6">
            <div className="rounded-full bg-blue-50 p-3 mr-4" style={{ backgroundColor: `${primaryColor}20` }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" style={{ color: primaryColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">
                {event.startDate?.toString()}
                {event.startTime && <span> à {event.startTime.toString()}</span>}
              </p>
            </div>
          </div>
          
          {event.type && (
            <div className="flex items-center bg-white rounded-lg shadow-md p-4 px-6">
              <div className="rounded-full bg-blue-50 p-3 mr-4" style={{ backgroundColor: `${primaryColor}20` }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" style={{ color: primaryColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">{event.type.name}</p>
              </div>
            </div>
          )}
        </div>
  );
}