export const generateTicketingUrl = (name: string, id: number): string => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); // Convertit le nom en slug
    return `/ticketting-${slug}/${id}/p`;
  };