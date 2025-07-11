import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../supabase/supabase.js';

const Modalform = ({ isOpen, onClose, mode, selectedClient, fetchClients }) => {
  const [rate, setRate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [job, setJob] = useState('');
  const [status, setStatus] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();

      // ✅ ถ้าเป็น edit mode ให้เติมข้อมูลเดิม
      if (mode === 'edit' && selectedClient) {
        setName(selectedClient.name);
        setEmail(selectedClient.email);
        setJob(selectedClient.job);
        setRate(selectedClient.rate);
        setStatus(selectedClient.isactive);
      } else {
        // ถ้า add mode ให้เคลียร์ฟอร์ม
        setName('');
        setEmail('');
        setJob('');
        setRate('');
        setStatus(false);
      }
    } else {
      modalRef.current?.close();
    }
  }, [isOpen, selectedClient, mode]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value === 'Active');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      job,
      rate,
      isactive: status,
    };

    let error;

    if (mode === 'add') {
      ({ error } = await supabase.from('client').insert([payload]));
    } else if (mode === 'edit' && selectedClient) {
      ({ error } = await supabase
        .from('client')
        .update(payload)
        .eq('id', selectedClient.id));
    }

    if (error) {
      console.error('Error submitting:', error.message);
      return;
    }

    await fetchClients();
    onClose(); // ปิด modal หลังบันทึก
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg py-4">
          {mode === 'edit' ? 'Edit Client' : 'Client Details'}
        </h3>
        <form method="dialog" onSubmit={handleSubmit}>
          <label className="input my-4">
            Name
            <input
              type="text"
              className="grow"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="input my-4">
            Email
            <input
              type="text"
              className="grow"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="input my-4">
            Job
            <input
              type="text"
              className="grow"
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
          </label>

          <div className="flex mb-4 justify-between my-4">
            <label className="input mr-4">
              Rate
              <input
                type="number"
                className="grow"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </label>
            <select
              value={status ? 'Active' : 'Inactive'}
              className="select"
              onChange={handleStatusChange}
            >
              <option>Inactive</option>
              <option>Active</option>
            </select>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
          <button type="submit" className="btn btn-success mt-4">
            {mode === 'edit' ? 'Save Changes' : 'Add Client'}
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default Modalform;
