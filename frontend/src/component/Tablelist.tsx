import React from 'react';
import { supabase } from '../supabase/supabase.js';

const Tablelist = ({ handleOpen, clients, fetchClients }) => {

  // ✅ ลบข้อมูลตาม id
  const handleDelete = async (id) => {
    const { error } = await supabase.from('client').delete().eq('id', id);
    if (error) {
      console.error('Error deleting client:', error.message);
      return;
    }
    fetchClients(); // โหลดใหม่หลังลบ
  };

  return (
    <div className="overflow-x-auto mt-10">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Job</th>
            <th>Rate</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="hover">
          {clients.map((client) => (
            <tr key={client.id}>
              <th>{client.id}</th>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.job}</td>
              <td>{client.rate}</td>
              <td>
                <button
                  className={`btn rounded-full w-24 ${
                    client.isactive ? 'btn-primary' : 'btn-outline'
                  }`}
                >
                  {client.isactive ? 'Active' : 'Inactive'}
                </button>
              </td>
              <td className="flex gap-2">
                <button
                onClick={() => handleOpen('edit', client)}
                className="btn btn-secondary"
                >
                Update
                </button>
                <button
                  className="btn btn-accent"
                  onClick={() => handleDelete(client.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tablelist;
