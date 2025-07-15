import React from 'react';

const FormAddress = ({
  addressOpen,
  setAddressOpen,
  addressDetail,
  setAddressDetail,
}) => {
  return (
    <div className="my-4">
      <button
        type="button"
        onClick={() => setAddressOpen((prev) => !prev)}
        className="flex items-center gap-2 font-bold text-lg"
      >
        <span
          className={`inline-block transition-transform duration-200 ${
            addressOpen ? 'rotate-90' : ''
          }`}
        >
          ▶
        </span>
        Address
      </button>

      {addressOpen && (
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <input
            type="text"
            placeholder="ที่อยู่"
            value={addressDetail.main}
            onChange={(e) =>
              setAddressDetail((prev) => ({ ...prev, main: e.target.value }))
            }
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="ตำบล/แขวง"
            value={addressDetail.subdistrict}
            onChange={(e) =>
              setAddressDetail((prev) => ({
                ...prev,
                subdistrict: e.target.value,
              }))
            }
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="อำเภอ/เขต"
            value={addressDetail.district}
            onChange={(e) =>
              setAddressDetail((prev) => ({
                ...prev,
                district: e.target.value,
              }))
            }
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="จังหวัด"
            value={addressDetail.province}
            onChange={(e) =>
              setAddressDetail((prev) => ({
                ...prev,
                province: e.target.value,
              }))
            }
            className="input input-bordered w-full"
          />
        </div>
      )}
    </div>
  );
};

export default FormAddress;
