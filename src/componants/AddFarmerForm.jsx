import { useState } from 'react';
import { addFarmer } from '../firebaseUtils';

export default function AddFarmerForm() {
  const [form, setForm] = useState({ id: '', name: '', location: '', produces: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const producesArr = form.produces.split(',').map(p => p.trim());
    addFarmer(form.id, form.name, form.location, producesArr);
    setForm({ id: '', name: '', location: '', produces: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} placeholder="Farmer ID" required />
      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" required />
      <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Location" required />
      <input value={form.produces} onChange={e => setForm({ ...form, produces: e.target.value })} placeholder="Produces (comma-separated)" required />
      <button type="submit">Add Farmer</button>
    </form>
  );
}
