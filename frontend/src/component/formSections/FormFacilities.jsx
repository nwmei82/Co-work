import React from 'react';

const FormFacilities = ({
  facilities,
  setFacilities,
  facilityOptions,
  showFacilities,
  setShowFacilities,
}) => {
  const handleFacilityChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setFacilities((prev) => [...prev, { name: value, note: '' }]);
    } else {
      setFacilities((prev) => prev.filter((item) => item.name !== value));
    }
  };

  const handleNoteChange = (facilityName, note) => {
    setFacilities((prev) =>
      prev.map((item) =>
        item.name === facilityName ? { ...item, note } : item
      )
    );
  };

  return (
    <div className="my-2">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setShowFacilities((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          <span
            className={`transition-transform duration-300 ${
              showFacilities ? 'rotate-90' : ''
            }`}
          >
            ▶
          </span>
          <p className="font-bold">Facilities</p>
        </div>
      </div>

      {showFacilities && (
        <div className="flex flex-col gap-3 mt-2 pl-6">
          {facilityOptions.map((option) => {
            const selected = facilities.find((f) => f.name === option);
            return (
              <div key={option} className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={option}
                    checked={!!selected}
                    onChange={handleFacilityChange}
                  />
                  {option}
                </label>
                {selected && (
                  <input
                    type="text"
                    className="input input-bordered input-sm w-full max-w-xs"
                    placeholder={`หมายเหตุ (${option})`}
                    value={selected.note}
                    onChange={(e) =>
                      handleNoteChange(option, e.target.value)
                    }
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FormFacilities;
