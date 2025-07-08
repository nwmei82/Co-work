import React, { useEffect, useRef, useState } from 'react';

const [rate, setRate] = useState('');
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [job, setJob] = useState('');
const [status, setStatus] = useState(false);

const handleStatusChange = (e) => {
    setStatus(e.target.value === 'Active');
}

const Modalform = ({ isOpen, onClose, mode, Onsubmit }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();  // ปิด modal หลังจากส่ง
  };

  return (
    <>
      <dialog id="my_modal_3" ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg py-4">
            {mode === 'edit' ? 'Edit Client' : 'Client Details'}
          </h3>
          <form method="dialog" onSubmit={handleSubmit}>
            <lable className="input my-4">
                Name
                <input type="text" className='grow' value={name} onChange={((e) => setName(e.target.value))} />
            </lable>
            <lable className="input my-4">
                Email
                <input type="text" className='grow' value={email} onChange={((e) => setEmail(e.target.value))}  />
            </lable>
            <lable className="input my-4">
                Job
                <input type="text" className='grow' value={job} onChange={((e) => setJob(e.target.value))}  />
            </lable>

            <div className='flex mb-4 justify-between my-4'>
                <lable className="input mr-4">
                    Rate
                    <input type="number" className='grow' placeholder='Daisy' value={rate} onChange={((e) => setRate(e.target.value))} />
                </lable>
            <select value={status ? 'Active' : 'Inactive'} className="select" onChange={handleStatusChange}>
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
    </>
  );
};

export default Modalform;
