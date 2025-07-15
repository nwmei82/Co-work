// components/formSections/FormShopName.jsx
import React from 'react';

const FormShopName = ({ shopName, setShopName }) => {
  return (
    <div className="mb-4">
      <label className="font-bold block mb-1">ชื่อร้านค้า</label>
      <input
        type="text"
        className="input input-bordered w-full"
        placeholder="กรอกชื่อร้านค้า"
        value={shopName}
        onChange={(e) => setShopName(e.target.value)}
        required
      />
    </div>
  );
};

export default FormShopName;
