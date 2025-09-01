import { SwitchToggleUi } from "@/components/ui";
import { Context } from "@/context/Context";
import type { Sintoma } from "@/types/type";
import { useContext, useState } from "react";

const SintomasPage = () => {
  const { sintomas, setSintomas } = useContext(Context);
  const [activeDetails, setActiveDetails] = useState(false);

  // estado para modal de novo sintoma
  const [showNovoSintoma, setShowNovoSintoma] = useState(false);
  const [novoSintomaNome, setNovoSintomaNome] = useState("");

  function update(item: Sintoma, state: boolean) {
    setSintomas((prevCategorias: Sintoma[]) =>
      prevCategorias.map((cat: Sintoma) =>
        cat.id === item.id ? { ...cat, ativo: state } : cat
      )
    );
  }

  function ToggleDetails(item?: Sintoma) {
    if (activeDetails) {
      setActiveDetails(false);
    } else if (item && item.ativo) {
      setActiveDetails(true);
    }
  }

  function salvarNovoSintoma() {
    if (!novoSintomaNome.trim()) return;

    const novo: Sintoma = {
      id: String(Date.now()),
      nome: novoSintomaNome,
      ativo: true,
    };

    setSintomas((prev: Sintoma[]) => [...prev, novo]);

    // resetar
    setNovoSintomaNome("");
    setShowNovoSintoma(false);
  }

  return (
    <>
      <div className="bg-[#070d1c] h-[100%] absolute px-4 py-4 text-white">
        {/* Botão novo sintoma */}
        <div className="flex justify-end pr-10">
          <button
            onClick={() => setShowNovoSintoma(true)}
            className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer"
          >
            Novo Sintoma
          </button>
        </div>

        {/* Lista de sintomas */}
        <div className="flex flex-wrap gap-4">
          {sintomas.map((item) => (
            <div
              onClick={() => {
                ToggleDetails(item);
              }}
              key={item.id}
              className={`${
                item.ativo ? "bg-[#0F172A]" : "bg-gray-500"
              } px-6 py-2 rounded-md cursor-pointer`}
            >
              <h1>{item.nome}</h1>

              <div className="my-2 w-0" onClick={(e) => e.stopPropagation()}>
                <SwitchToggleUi
                  boolean={item.ativo}
                  onToggle={(state) => update(item, state)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal simples */}
      {showNovoSintoma && (
        <div className="fixed inset-0 flex items-center justify-center  text-white">
          <div className="bg-[rgba(15,23,42,1)]  p-6 rounded-lg w-[300px] border">
            <h2 className="text-lg font-semibold mb-4 ">Novo Sintoma</h2>
            <input
              type="text"
              value={novoSintomaNome}
              onChange={(e) => setNovoSintomaNome(e.target.value)}
              placeholder="Nome do sintoma"
              className="w-full px-3 py-2 mb-4 rounded-md text-white placeholder:text-amber-50 border outline-0"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNovoSintoma(false)}
                className=" cursor-pointer px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={salvarNovoSintoma}
                className=" cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SintomasPage;
