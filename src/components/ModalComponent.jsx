import React from 'react';

const ModalComponent = ({ close, name , onClick, judul, message, backgroundColor }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 animate-fade-in">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold text-gray-800">{judul}</h2>
        </div>
        <p className="mt-4 text-sm text-gray-600"> {message} </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={close}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onClick}
            className={`px-4 py-2 text-sm text-white ${backgroundColor} transition-colors`}
          >
            {name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
