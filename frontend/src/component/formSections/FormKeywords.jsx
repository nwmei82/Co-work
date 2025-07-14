import React from 'react';

const FormKeywords = ({ keyword, onChange }) => {
  const options = ['ร้านกาแฟ', 'คาเฟ่', 'เค้ก/เบเกอรี่'];

  return (
    <div className="my-2 flex flex-wrap gap-4">
      <p className="font-bold">ประเภทร้าน</p>
      {options.map((option) => (
        <label key={option} className="flex items-center gap-2">
          <input
            type="checkbox"
            value={option}
            checked={keyword.includes(option)}
            onChange={onChange}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default FormKeywords;
