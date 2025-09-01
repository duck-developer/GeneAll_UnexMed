import { Context } from "@/context/Context";
import { useContext } from "react";

const DoencaPage = () => {
  const { doencas } = useContext(Context);
  return (
    <>
      <div className="bg-[#070d1c] h-[100%]  min-w-[94.11%] absolute px-4 py-4 text-white">
        <div className="flex justify-end pr-10">
          <button className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer">
            Nova Doença
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          {doencas.map((item, index) => (
            <div
              key={item.id}
              className={`
                        bg-[#0F172A]
                       px-6 py-4 rounded-md cursor-pointer`}
            >
              <h1>{item.nome}</h1>
            </div>
          ))}
        </div>
      </div>
      {/* 
      <div className="fixed inset-0 flex pt-20  backdrop-blur-sm   w-full justify-center  text-white">
        <div className="">
          <div className="bg-[rgba(15,23,42,1)]  p-6 rounded-lg w-[900px] border">
            <h2 className="text-lg font-semibold mb-4 ">Novo Sintoma</h2>
            <input
              type="text"
              // value={novoSintomaNome}
              // onChange={(e) => setNovoSintomaNome(e.target.value)}
              placeholder="Nome do sintoma"
              className="w-full px-3 py-2 mb-4 rounded-md text-white placeholder:text-amber-50 border outline-0"
            />
            <div className="flex justify-end gap-2">
              <button
                // onClick={() => setShowNovoSintoma(false)}
                className=" cursor-pointer px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                // onClick={salvarNovoSintoma}
                className=" cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="fixed inset-0 flex py-10 backdrop-blur-sm w-full justify-center text-white">
        <div>
          <div className="bg-[rgba(15,23,42,1)] p-6 rounded-lg w-[900px] border max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Nova Doença</h2>

            {/* Nome */}
      {/* <input
              type="text"
              placeholder="Nome da doença"
              className="w-full px-3 py-2 mb-4 rounded-md text-white placeholder:text-gray-300 border outline-0"
            /> */}

      {/* CID */}
      {/* <input
              type="text"
              placeholder="CID-10"
              className="w-full px-3 py-2 mb-4 rounded-md text-white placeholder:text-gray-300 border outline-0"
            /> */}

      {/* Descrição */}
      {/* <textarea
              placeholder="Descrição da doença"
              className="w-full px-3 py-2 mb-4 rounded-md text-white placeholder:text-gray-300 border outline-0 h-24"
            /> */}

      {/* Diagnóstico */}
      {/* <textarea
              placeholder="Critérios de diagnóstico (um por linha)"
              className="w-full px-3 py-2 mb-4 rounded-md text-white placeholder:text-gray-300 border outline-0 h-24"
            /> */}

      {/* Tratamento */}
      {/* <textarea
              placeholder="Opções de tratamento (um por linha)"
              className="w-full px-3 py-2 mb-4 rounded-md text-white placeholder:text-gray-300 border outline-0 h-24"
            /> */}

      {/* Exames */}
      {/* <textarea
              placeholder="Exames utilizados (um por linha)"
              className="w-full px-3 py-2 mb-4 rounded-md text-white placeholder:text-gray-300 border outline-0 h-24"
            /> */}

      {/* Seleção de sintomas (simples exemplo de checkbox) */}
      {/* <div className="mb-4">
              <h3 className="font-semibold mb-2">Sintomas associados</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600" /> Tosse
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600" /> Falta de
                  ar
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600" /> Chiado
                  no peito
                </label>
                {/* ... pode mapear os sintomas do context */}
      {/* </div>
            </div> */}

      {/* Botões */}
      {/* <div className="flex justify-end gap-2">
              <button className="cursor-pointer px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-600">
                Cancelar
              </button>
              <button className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                Salvar
              </button>
            </div>
          </div> */}
      {/* </div>
      </div> */}
    </>
  );
};

export default DoencaPage;
