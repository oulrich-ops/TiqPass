import { useState } from 'react';

export default function CustomFieldsForm() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulaire soumis :', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nom" className="block font-semibold">Nom</label>
        <input
          type="text"
          name="nom"
          id="nom"
          value={formData.nom}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
        />
      </div>
      <div>
        <label htmlFor="prenom" className="block font-semibold">Prénom</label>
        <input
          type="text"
          name="prenom"
          id="prenom"
          value={formData.prenom}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
        />
      </div>
      <div>
        <label htmlFor="email" className="block font-semibold">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Enregistrer
      </button>
    </form>
  );
}