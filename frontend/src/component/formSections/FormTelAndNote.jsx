import React from 'react';

const FormTelAndNote = ({ tel, setTel, note, setNote }) => {
  const handleTelChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, '');
    setTel(onlyNums);
  };

  return (
    <>
      <div className="my-2 flex flex-col">
        <span className="font-bold mb-1">Tel</span>
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          value={tel}
          onChange={handleTelChange}
          placeholder="กรอกหมายเลขโทรศัพท์ (ตัวเลขเท่านั้น)"
          className="input input-bordered w-full"
        />
      </div>

      <label className="input my-2">
        Note
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </label>
    </>
  );
};

export default FormTelAndNote;
