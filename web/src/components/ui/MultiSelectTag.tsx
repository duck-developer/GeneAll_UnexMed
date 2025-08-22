import { useState, useRef, useEffect, useContext } from "react";
import type { Sintoma } from "../../types/type";
import { IoMdClose } from "react-icons/io";
import { Context } from "@/context/Context";

interface MultiSelectDropdownProps {
  options: Sintoma[];
}

export default function MultiSelectDropdown({
  options,
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { selected, setSelected } = useContext(Context);

  const [search, setSearch] = useState("");

  const ref = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(
    (opt) =>
      opt.nome.toLowerCase().includes(search.toLowerCase()) &&
      !selected.find((s) => s.id === opt.id)
  );

  const toggleSelect = (option: Sintoma) => {
    setSelected((prev) => [...prev, option]);
    setSearch("");
  };

  const removeItem = (id: string) => {
    setSelected((prev) => prev.filter((opt) => opt.id !== id));
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-sm">
      {/* Campo principal clicável com sintomas */}

      <div
        className="bg-[#0F172A]  cursor-pointer rounded-[10px] border border-[#1E293B] px-3 py-2 w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length === 0 ? (
          <div className="text-[#94A3B8] text-[18px] w-full text-center">
            <p>Selecione um sintoma</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selected.map((item) => (
              <span
                key={item.id}
                className="bg-[#2A3248] text-white px-4 py-2 text-sm rounded-full flex items-center gap-2"
              >
                {item.nome}

                <IoMdClose
                  size={20}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.id);
                  }}
                  className="hover:text-red-300 hover:scale-150"
                />
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-10 mt-2 w-full bg-[#0F172A] border border-[#1E293B] rounded-md shadow max-h-60 overflow-y-auto text-[#94A3B8] custom-scrollbar">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border-b border-[#1E293B] outline-none text-sm bg-[#0F172A]"
            placeholder="Buscar..."
          />
          {filteredOptions.length > 0 ? (
            filteredOptions.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleSelect(item)}
                className="px-4 py-2 text-sm hover:bg-[#334155] hover:text-white transition-all ease-in-out cursor-pointer"
              >
                {item.nome}
              </div>
            ))
          ) : (
            <p className="px-4 py-4 text-sm text-gray-500 text-center">
              Nenhum resultado
            </p>
          )}
        </div>
      )}
    </div>
  );
}
