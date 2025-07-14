// components/formSections/FormNote.jsx
import React from 'react';

const FormNote = ({ note, setNote }) => {
  return (
    <div className="my-4">
      <label className="block font-bold mb-1">หมายเหตุ</label>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="หมายเหตุเพิ่มเติม (เช่น ร้านนี้ไม่มี Wi-Fi)"
        className="textarea textarea-bordered w-full"
      />
    </div>
  );
};

export default FormNote;
