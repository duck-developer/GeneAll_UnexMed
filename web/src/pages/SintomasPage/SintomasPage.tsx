import { IconsUi, SwitchToggleUi } from "@/components/ui";
import { Context } from "@/context/Context";
import { useContext, useState } from "react";
import useSintomas from "./utils/useSintomas";
import { FaRegEdit } from "react-icons/fa";

const SintomasPage = () => {
  const { sintomas } = useContext(Context);
  const { addSintoma, ToggleDetailsSintomas, editSintoma } = useSintomas();

  //CREATE
  const [showNovoSintoma, setShowNovoSintoma] = useState(false);
  const [novoSintomaNome, setNovoSintomaNome] = useState("");

  //EDIT
  const [showEditarSintoma, setShowEditarSintoma] = useState(false);
  const [sintomaEditando, setSintomaEditando] = useState<{
    id: string;
    nome: string;
  } | null>(null);

  async function salvarNovoSintoma() {
    if (!novoSintomaNome.trim()) return;
    await addSintoma(novoSintomaNome);
    setNovoSintomaNome("");
    setShowNovoSintoma(false);
  }

  async function salvarEdicao() {
    if (!sintomaEditando || !sintomaEditando.nome.trim()) return;
    await editSintoma(sintomaEditando.id, sintomaEditando.nome);
    setSintomaEditando(null);
    setShowEditarSintoma(false);
  }

  return (
    <>
      <div className="bg-[#070d1c] h-[100%]  px-4 py-4 text-white">
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
              key={item.id}
              className={`${
                item.ativo ? "bg-[#0F172A]" : "bg-gray-500"
              } px-6 py-2 rounded-md min-w-[5rem]  group`}
            >
              <h1>{item.nome}</h1>
              <div className="my-2 w-full flex justify-between items-center">
                <SwitchToggleUi
                  boolean={item.ativo}
                  onToggle={() => ToggleDetailsSintomas(item)}
                />
                <button
                  onClick={() => {
                    setSintomaEditando({ id: item.id, nome: item.nome });
                    setShowEditarSintoma(true);
                  }}
                >
                  <IconsUi
                    icon={FaRegEdit}
                    size={20}
                    className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal novo sintoma */}
      {showNovoSintoma && (
        <div className="fixed inset-0 flex items-center justify-center text-white">
          <div className="bg-[rgba(15,23,42,1)] p-6 rounded-lg w-[300px] border">
            <h2 className="text-lg font-semibold mb-4">Novo Sintoma</h2>
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
                className="cursor-pointer px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={salvarNovoSintoma}
                className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal editar sintoma */}
      {showEditarSintoma && sintomaEditando && (
        <div className="fixed inset-0 flex items-center justify-center text-white">
          <div className="bg-[rgba(15,23,42,1)] p-6 rounded-lg w-[300px] border">
            <h2 className="text-lg font-semibold mb-4">Editar Sintoma</h2>
            <input
              type="text"
              value={sintomaEditando.nome}
              onChange={(e) =>
                setSintomaEditando({ ...sintomaEditando, nome: e.target.value })
              }
              placeholder="Nome do sintoma"
              className="w-full px-3 py-2 mb-4 rounded-md text-white placeholder:text-amber-50 border outline-0"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEditarSintoma(false)}
                className="cursor-pointer px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={salvarEdicao}
                className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
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
