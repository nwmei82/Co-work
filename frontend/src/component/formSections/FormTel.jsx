// components/formSections/FormTel.jsx
import React from 'react';

const FormTel = ({ tel, setTel }) => {
  return (
    <div className="my-4">
      <label className="block font-bold mb-1">เบอร์โทร</label>
      <input
        type="text"
        value={tel}
        onChange={(e) => setTel(e.target.value)}
        placeholder="กรอกเบอร์โทร"
        className="input input-bordered w-full"
      />
    </div>
  );
};

export default FormTel;
