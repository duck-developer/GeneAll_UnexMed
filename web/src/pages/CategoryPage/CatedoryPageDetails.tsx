import { IconsUi } from "@/components/ui";
import { Context } from "@/context/Context";
import type { Categoria } from "@/types/type";
import { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface CatedoryPageDetailsProps {
  ToggleDetailsProps: () => void;
  categoryDetailsProps: Categoria | null;
}
const CatedoryPageDetails = ({
  ToggleDetailsProps,
  categoryDetailsProps,
}: CatedoryPageDetailsProps) => {
  const { sintomas } = useContext(Context);

  // Estado local com sintomas selecionados
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  // Inicializa com os sintomas já da categoria
  useEffect(() => {
    if (categoryDetailsProps) {
      setSelectedSymptoms(categoryDetailsProps.sintomas);
    }
  }, [categoryDetailsProps]);

  // Função para marcar/desmarcar
  const handleCheckboxChange = (sintomaId: string) => {
    setSelectedSymptoms(
      (prev) =>
        prev.includes(sintomaId)
          ? prev.filter((id) => id !== sintomaId) // remove
          : [...prev, sintomaId] // adiciona
    );
  };

  // Separar os que já estão na categoria
  const sintomasIncluidos = sintomas.filter((s) =>
    selectedSymptoms.includes(s.id)
  );

  // Separar os que faltam
  const sintomasFaltando = sintomas.filter(
    (s) => !selectedSymptoms.includes(s.id)
  );

  return (
    <div className="w-[100%] h-[100vh] flex justify-center text-white relative">
      <div className="bg-[rgba(15,23,42,0.95)] w-[90%] h-[80%] absolute top-0 mt-[3rem] rounded-lg p-5 overflow-y-auto">
        {/* Botão fechar */}
        <div onClick={ToggleDetailsProps}>
          <IconsUi
            active
            icon={IoMdClose}
            color="white"
            className="absolute right-0 mr-5 mt-5 cursor-pointer"
            size={28}
          />
        </div>

        {/* ✅ Incluídos */}
        <h2 className="text-lg font-semibold mb-2">
          Sintomas:{" "}
          <span className=" text-amber-500">{categoryDetailsProps?.nome} </span>
        </h2>

        {/* Ativos */}
        <div className=" grid grid-cols-4 gap-2">
          {sintomasIncluidos
            .filter((s) => s.ativo)
            .map((sintoma) => (
              <label key={sintoma.id} className="flex items-center gap-2 pl-4">
                <input
                  type="checkbox"
                  checked={selectedSymptoms.includes(sintoma.id)}
                  onChange={() => handleCheckboxChange(sintoma.id)}
                />
                <span>{sintoma.nome}</span>
              </label>
            ))}
        </div>

        {/* ❌ Faltando */}
        <h2 className="text-lg font-semibold mt-6 mb-2">Outros Sintomas</h2>
        <div className=" grid grid-cols-4 gap-2">
          {sintomasFaltando
            .filter((s) => s.ativo)
            .map((sintoma) => (
              <label key={sintoma.id} className="flex items-center gap-2 pl-4">
                <input
                  type="checkbox"
                  checked={selectedSymptoms.includes(sintoma.id)}
                  onChange={() => handleCheckboxChange(sintoma.id)}
                />
                <span>{sintoma.nome}</span>
              </label>
            ))}
        </div>

        {/* Botão salvar */}
        <button
          onClick={() => {
            console.log("Sintomas selecionados:", selectedSymptoms);
            // ToggleDetailsProps();
          }}
          className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer"
        >
          Salvar
        </button>
      </div>
    </div>
  );
};

export default CatedoryPageDetails;
