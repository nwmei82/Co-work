import React from 'react';

const FormMenu = ({ menu, setMenu }) => {
  return (
    <div className="my-2">
      <label className="font-bold mb-1 block">เมนู (แนบลิงก์รูปภาพ)</label>
      <input
        type="url"
        placeholder="https://example.com/menu.jpg"
        value={menu}
        onChange={(e) => setMenu(e.target.value)}
        className="input input-bordered w-full"
      />
    </div>
  );
};

export default FormMenu;
