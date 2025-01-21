import { useState } from "react";

const ActiveProjectSelect = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="bg-white px-4 py-2 border rounded hover:bg-red-600 focus:outline-none"
      >
        Projetos ativos
      </button>
      {isOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white p-4 rounded-lg shadow-lg w-48 max-w-xs z-10">
          <h2 className="text-xl font-semibold mb-4">Projetos</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => {
                  /* ação para selecionar o projeto */
                }}
                className="w-full text-left px-4 py-2 rounded hover:bg-gray-200"
              >
                Projeto 1
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActiveProjectSelect;
