import { Context } from "@/context/Context";
import { useContext, useState } from "react";
import useDoenca from "./utils/useDoenca";
import { IconsUi, SwitchToggleUi } from "@/components/ui";
import { FaRegEdit } from "react-icons/fa";

const DoencaPage = () => {
  const { doencas, sintomas } = useContext(Context);
  const { addDoenca, updateDoenca, ToggleDetailsDoenca } = useDoenca();

  //CREATE / EDIT
  const [showForm, setShowForm] = useState(false);
  const [editandoDoenca, setEditandoDoenca] = useState<string | null>(null);

  const [nome, setNome] = useState("");
  const [cid, setCid] = useState("");
  const [descricao, setDescricao] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [tratamento, setTratamento] = useState("");
  const [exames, setExames] = useState("");
  const [sintomasSelecionados, setSintomasSelecionados] = useState<string[]>(
    []
  );

  const toggleSintoma = (s: string) => {
    setSintomasSelecionados((prev) =>
      prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s]
    );
  };

  // Abre o formulário, preenchendo dados se for edição
  const abrirFormulario = (doenca?: any) => {
    if (doenca) {
      setEditandoDoenca(doenca.id);
      setNome(doenca.nome);
      setCid(doenca.cid || "");
      setDescricao(doenca.descricao);
      setDiagnostico(doenca.diagnostico.join("\n"));
      setTratamento(doenca.tratamento.join("\n"));
      setExames(doenca.exames.join("\n"));
      setSintomasSelecionados(doenca.sintomas);
    } else {
      setEditandoDoenca(null);
      setNome("");
      setCid("");
      setDescricao("");
      setDiagnostico("");
      setTratamento("");
      setExames("");
      setSintomasSelecionados([]);
    }
    setShowForm(true);
  };

  // Fecha o formulário e limpa os campos
  const fecharFormulario = () => {
    setEditandoDoenca(null);
    setNome("");
    setCid("");
    setDescricao("");
    setDiagnostico("");
    setTratamento("");
    setExames("");
    setSintomasSelecionados([]);
    setShowForm(false);
  };

  // Salva nova doença ou atualização
  const salvarDoenca = async () => {
    if (!nome.trim()) return;

    const novaDoenca = {
      nome,
      cid,
      descricao,
      diagnostico: diagnostico
        .split("\n")
        .map((d) => d.trim())
        .filter((d) => d),
      tratamento: tratamento
        .split("\n")
        .map((t) => t.trim())
        .filter((t) => t),
      exames: exames
        .split("\n")
        .map((e) => e.trim())
        .filter((e) => e),
      sintomas: sintomasSelecionados,
      ativo: true,
    };

    if (editandoDoenca) {
      await updateDoenca(editandoDoenca, novaDoenca);
    } else {
      await addDoenca(novaDoenca);
    }

    fecharFormulario(); // fecha corretamente
  };

  return (
    <>
      {/* Lista de doenças */}

      <div className="bg-[#070d1c] min-h-screen w-full px-4 py-4 text-white">
        <div className="flex justify-end pr-10">
          <button
            onClick={() => abrirFormulario()}
            className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer"
          >
            Nova Doença
          </button>
        </div>

        <div className="flex flex-wrap gap-4">
          {doencas.map((item) => (
            <div
              key={item.id}
              className={`${
                item.ativo ? "bg-[#0F172A]" : "bg-gray-500"
              } px-6 py-2 rounded-md min-w-[5rem] group`}
            >
              <h1 className="font-bold">{item.nome}</h1>
              <div className="my-2 w-full flex justify-between items-center">
                <SwitchToggleUi
                  boolean={item.ativo}
                  onToggle={() => ToggleDetailsDoenca(item)}
                />
                <button onClick={() => abrirFormulario(item)}>
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

      {/* Formulário */}
      {showForm && (
        <div className="fixed inset-0 flex py-10 backdrop-blur-sm w-full justify-center text-white">
          <div>
            <div className="bg-[rgba(15,23,42,1)] p-6 rounded-lg w-[900px] border max-h-[90vh] overflow-y-auto">
              <h2 className="text-lg font-semibold mb-4">
                {editandoDoenca ? "Editar Doença" : "Nova Doença"}
              </h2>

              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome da doença"
                className="w-full px-3 py-2 mb-4 rounded-md text-white border outline-0"
              />

              <input
                type="text"
                value={cid}
                onChange={(e) => setCid(e.target.value)}
                placeholder="CID-10: Ex. H18.6"
                className="w-full px-3 py-2 mb-4 rounded-md text-white border outline-0"
              />

              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição da doença"
                className="w-full px-3 py-2 mb-4 rounded-md text-white border outline-0 h-24"
              />

              <textarea
                value={diagnostico}
                onChange={(e) => setDiagnostico(e.target.value)}
                placeholder="Critérios de diagnóstico (um por linha)"
                className="w-full px-3 py-2 mb-4 rounded-md text-white border outline-0 h-24"
              />

              <textarea
                value={tratamento}
                onChange={(e) => setTratamento(e.target.value)}
                placeholder="Opções de tratamento (um por linha)"
                className="w-full px-3 py-2 mb-4 rounded-md text-white border outline-0 h-24"
              />

              <textarea
                value={exames}
                onChange={(e) => setExames(e.target.value)}
                placeholder="Exames utilizados (um por linha)"
                className="w-full px-3 py-2 mb-4 rounded-md text-white border outline-0 h-24"
              />

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Sintomas associados</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {sintomas.map((s) => (
                    <label key={s.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={sintomasSelecionados.includes(s.id)}
                        onChange={() => toggleSintoma(s.id)}
                        className="accent-blue-600"
                      />
                      {s.nome}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={fecharFormulario}
                  className="px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-600 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={salvarDoenca}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer"
                >
                  {editandoDoenca ? "Salvar Alterações" : "Salvar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DoencaPage;
